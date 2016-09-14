'use strict';

angular.module('myApp.search', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'views/search.html',
            controller: 'searchCtrl'
        });
    }])

    .controller('searchCtrl', ['$scope', '$http', 'dataService', 'trackService', 'seriesService', 'carService', function
        ($scope, $http, dataService, trackService, seriesService, carService) {

        $scope.carList = [];
        $scope.trackList = [];
        $scope.seriesList = [];
        $scope.classList = [];

        $scope.carListNames = [];
        $scope.trackListNames = [];
        $scope.seriesListNames = [];

        $scope.races = dataService.getData();
        $scope.cars = carService.getData();
        $scope.tracks = trackService.getData();
        $scope.series = seriesService.getData();

        //Set type filter checkboxes to true
        //TODO use xpeppermint ui switch
        $scope.formData = {type:{road: true, oval:true}};


        /**
         * Function for adding cars to an array for the SQL query
         * @param car
         */
        $scope.addCar = function (car) {
            var item = angular.copy(parseInt(car));

            if ($scope.carList.indexOf(item) == -1) {
                $scope.carList.push(item);

                //Search the cars array for the car name
                var foundCar = _.find($scope.cars, {id: item});
                $scope.carListNames.push(foundCar);
                // Empty form data after adding the car so that the select is empty again
                $scope.formData.car = {};
            }
        };

        /**
         * Function for adding tracks to an array for the SQL query
         * @param track
         */
        $scope.addTrack = function (track) {
            var item = angular.copy(parseInt(track));
            if ($scope.trackList.indexOf(item) == -1) {
                $scope.trackList.push(item);

                //Search the tracks array for the track name
                var foundTrack = _.find($scope.tracks, {id: item});
                $scope.trackListNames.push(foundTrack);
                $scope.formData.track = {};
            }
        };

        /**
         * Function for adding series to an array for the SQL query
         * @param series
         */
        $scope.addSeries = function (series) {
            var item = angular.copy(parseInt(series));
            if ($scope.seriesList.indexOf(item) == -1) {
                $scope.seriesList.push(item);

                var foundSeries = _.find($scope.series, {id: item});
                $scope.seriesListNames.push(foundSeries);
                $scope.formData.series = {};
            }
        };

        $scope.addClass = function (data) {
            var item = angular.copy(data);
            if ($scope.classList.indexOf(item) == -1) {
                $scope.classList.push(item);
                $scope.formData.class = {};
            }
        };

        /**
         * Add all the free cars
         */
        $scope.addFreeCars = function (){
            // Get the free cars
            var freeCars = _.filter($scope.cars, function(item){
                return item.name == "Cadillac CTS-V" ||
                    item.name == "Mazda MX-5 Cup" ||
                    item.name == "Dallara DW12 Indycar" ||
                    item.name == "JR Motorsports Street Stock" ||
                    item.name == "Legends Ford 1934 Coupe" ||
                    item.name == "Pontiac Solstice ClubSport" ||
                    item.name == "SCCA Spec Racer Ford"
            });
            freeCars.forEach(function (car){
                $scope.carList.push(car.id);
                $scope.carListNames.push(car);
            })
            };


        /**
         * Add all the free tracks
         */
        $scope.addFreeTracks = function () {
            // Get the free cars
            var freeTracks = _.filter($scope.tracks, function(item){
                return item.name == "Charlotte Motor Speedway" ||
                    item.name == "Mazda Raceway Laguna Seca" ||
                    item.name == "Summit Point Motorsports Park" ||
                    item.name == "Okayama International Circuit	" ||
                    item.name == "Concord Speedway" ||
                    item.name == "Daytona circa 2007" ||
                    item.name == "Lanier International Speedway" ||
                    item.name == "Oxford Plains Speedway" ||
                    item.name == "Phoenix International Raceway circa 2008" ||
                    item.name == "South Boston Speedway" ||
                    item.name == "Thompson International Speedway" ||
                    item.name == "USA International Speedway" ||
                    item.name == "Lime Rock Park"
            });
            freeTracks.forEach(function (track){
                $scope.trackList.push(track.id);
                $scope.trackListNames.push(track);
            })
        };

        /**
         * Take the selected cars, tracks , series and class and create the query
         */
        $scope.getSeries = function () {
            var foundCars = [];
            var foundTracks = [];
            var foundSeries = [];
            if ($scope.carListNames.length > 0) {
                $scope.carListNames.forEach(function (item) {
                    // Search for all the races with the same car
                    var car = _.filter($scope.races, function (list) {
                        return list.car == item.name
                    });
                    // Push the races into an array
                    foundCars.push(car);
                    //Concat the multidimensional array of foundCars
                    foundCars = [].concat.apply([], foundCars);
                });
            }
            if ($scope.trackListNames.length > 0) {
                $scope.trackListNames.forEach(function (item) {
                    var track = _.filter($scope.races, function (list) {
                        return list.track == item.name
                    });
                    foundTracks.push(track);
                    foundTracks = [].concat.apply([], foundTracks);
                })
            }
            if ($scope.seriesListNames.length > 0) {
                $scope.seriesListNames.forEach(function (item) {
                    var series = _.filter($scope.races, function (list) {
                        return list.series == item.name
                    });
                    foundSeries.push(series);
                    foundSeries = [].concat.apply([], foundSeries);
                })
            }
            $scope.result = [].concat(foundCars, foundTracks, foundSeries);


            var list = [];
            // If any of the found arrays are filled
            if (foundCars.length > 0) {
                // Only iterate the amount of selected cars
                $scope.carListNames.forEach(function (item) {
                    var car = _.filter($scope.result, function (list) {
                        return list.car == item.name
                    });
                    list.push(car);
                });
                // Concatenate the multi dimensional arrays and remove duplicate entries
                $scope.result = _.uniq([].concat.apply([], list));
            }
            if (foundTracks.length > 0) {
                list = [];
                $scope.trackListNames.forEach(function (item) {
                    var track = _.filter($scope.result, function (list) {
                        return list.track == item.name
                    });
                    list.push(track);
                });
                $scope.result = _.uniq([].concat.apply([], list));
            }
            // If series are also selected
            if (foundSeries.length > 0) {
                list = [];
                $scope.seriesListNames.forEach(function (item) {
                    var series = _.filter($scope.result, function (list) {
                        return list.series == item.name
                    });
                    list.push(series);
                });
                $scope.result = _.uniq([].concat.apply([], list));
            }
            // If class is also selected
            if ($scope.classList.length > 0) {
                list = [];
                $scope.classList.forEach(function (item) {
                    var classes = _.filter($scope.result, function (list) {
                        return list.class == item
                    });
                    list.push(classes);
                });
                $scope.result = _.uniq([].concat.apply([], list));
            }
            // if a week is selected
            if ($scope.formData.week) {
                var weeks = _.values($scope.formData.week);
                list = [];
                weeks.forEach(function (item) {
                    var races = _.filter($scope.result, function (list) {
                        return list.start_date == item
                    });
                    list.push(races);
                });
                $scope.result = _.uniq([].concat.apply([], list));
            }
            // Filter the results on type
            if($scope.formData.type.oval == true || $scope.formData.type.road == true)
                list = [];
            if ($scope.formData.type.oval == true) {

                var oval = _.filter($scope.result, {type: 'Oval'});
                list.push(oval);
            }
            if ($scope.formData.type.road == true) {
                var road = _.filter($scope.result, {type: 'Road'});
                list.push(road);
            }
            $scope.result = _.uniq([].concat.apply([], list));
        };


        /**
         * Remove the selected item from the list
         * @param item
         * @param array
         */
        $scope.removeItem = function (item, array) {
            if (array == 'cars') {
                $scope.carListNames = _.without($scope.carListNames, item);
                $scope.carList = _.without($scope.carList, item.id);
            }
            if (array == 'tracks') {
                $scope.trackListNames = _.without($scope.trackListNames, item);
                $scope.trackList = _.without($scope.trackList, item.id);
            }
            if (array == 'series') {
                $scope.seriesListNames = _.without($scope.seriesListNames, item);
                $scope.seriesList = _.without($scope.seriesList, item.id);
            }
            if (array == 'class') {
                $scope.classList = _.without($scope.classList, item);
            }
        };


        /**
         * Clear all lists
         */
        $scope.clearAll = function () {
            $scope.carList = [];
            $scope.trackList = [];
            $scope.seriesList = [];
            $scope.classList = [];

            $scope.carListNames = [];
            $scope.trackListNames = [];
            $scope.seriesListNames = [];

            //Clear the select fields
            $scope.formData = {};
            //Reset the checkboxes
            $scope.formData = {type:{road: true, oval:true}};
        }
    }]);