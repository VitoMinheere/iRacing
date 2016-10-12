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

        // Array for the ListNames
        $scope.lists = {};

        $scope.carListNames = [];
        $scope.trackListNames = [];
        $scope.seriesListNames = [];

        $scope.carListNames.push({value: "car"});
        $scope.trackListNames.push({value: "track"});
        $scope.seriesListNames.push({value: "series"});


        $scope.races = dataService.getData();
        $scope.cars = carService.getData();
        $scope.tracks = trackService.getData();
        $scope.series = seriesService.getData();

        //Set type filter checkboxes to true
        //TODO use xpeppermint ui switch
        $scope.formData = {type:{road: true, oval:true}};

        // Sorting the results
        $scope.sortType     = 'start_date'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.filter = {};
        $scope.filter.searchValue = "";


        /**
         * Function for adding cars to an array for the SQL query
         * @param car
         */
        $scope.addCar = function (car) {
            if ($scope.carListNames.indexOf(car) == -1) {
                $scope.carListNames.push(car);
            }
            $scope.formData.car = {};
        };

        /**
         * Function for adding tracks to an array for the SQL query
         * @param track
         */
        $scope.addTrack = function (track) {
            if ($scope.trackListNames.indexOf(track) == -1) {
                $scope.trackListNames.push(track);
            }
            $scope.formData.track = {};
        };

        /**
         * Function for adding series to an array for the SQL query
         * @param series
         */
        $scope.addSeries = function (series) {
            if ($scope.seriesListNames.indexOf(series) == -1){
                $scope.seriesListNames.push(series);
            }
            $scope.formData.series = {};
        };

        $scope.addClass = function (data) {
            var item = angular.copy(data);
            if ($scope.lists.classList.indexOf(item) == -1) {
                $scope.lists.classList.push(item);
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
                    item.name == "Dallara Indycar (circa 2011)" ||
                    item.name == "JR Motorsports Street Stock" ||
                    item.name == "Legends Ford 1934 Coupe" ||
                    item.name == "Pontiac Solstice ClubSport" ||
                    item.name == "SCCA Spec Racer Ford"
            });
            freeCars.forEach(function (car){
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
                $scope.trackListNames.push(track);
            })
        };

        /**
         * Take the selected cars, tracks , series and class and create the query
         */
        $scope.getSeries = function () {
            var foundItems = [];
            var resultItems = [];
            var filteredItems = [];

            $scope.lists.cars = angular.copy($scope.carListNames);
            $scope.lists.tracks = angular.copy($scope.trackListNames);
            $scope.lists.series = angular.copy($scope.seriesListNames);

            _.each($scope.lists, function(array){
                array.forEach(function(selected){
                    if (selected.name) {
                        console.log(selected);
                        var item = _.filter($scope.races, function (list) {
                            if (array[0].value !== undefined) {
                                return list[array[0].value] == selected.name;
                            }
                        });
                        foundItems.push(item);
                    }
                });

            });
            foundItems = _.uniq([].concat.apply([],foundItems));
            console.log(foundItems);

            $scope.result = foundItems;

            /**
            _.each($scope.lists, function(array){
                array.forEach(function(selected){
                    var item = _.filter($scope.result, function(list){
                        if(array[0].value !== undefined && selected.name) {
                            console.log(selected.name);
                            return list[array[0].value] == selected.name;
                        }
                    });
                    resultItems.push(item);
                    //console.log(resultItems);
                });
                filteredItems = _.uniq([].concat.apply([], resultItems));

            });
            console.log(filteredItems);
            $scope.result = _.uniq([].concat.apply([], filteredItems));

             **/
            /**

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
            if ($scope.lists.classList.length > 0) {
                list = [];
                $scope.lists.classList.forEach(function (item) {
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
             */
        };



        /**
         * Remove the selected item from the list
         * @param item
         * @param array
         */
        $scope.removeItem = function (item, array) {
            if (array == 'cars') {
                $scope.carListNames = _.without($scope.carListNames, item);
                $scope.lists.carList = _.without($scope.lists.carList, item.id);
            }
            if (array == 'tracks') {
                $scope.trackListNames = _.without($scope.trackListNames, item);
                $scope.lists.trackList = _.without($scope.lists.trackList, item.id);
            }
            if (array == 'series') {
                $scope.seriesListNames = _.without($scope.seriesListNames, item);
                $scope.lists.seriesList = _.without($scope.lists.seriesList, item.id);
            }
            if (array == 'class') {
                $scope.lists.classList = _.without($scope.lists.classList, item);
            }
        };


        /**
         * Clear all lists
         */
        $scope.clearAll = function () {
            $scope.lists.carList = [];
            $scope.lists.trackList = [];
            $scope.lists.seriesList = [];
            $scope.lists.classList = [];

            $scope.carListNames = [];
            $scope.trackListNames = [];
            $scope.seriesListNames = [];

            //Clear the select fields
            $scope.formData = {};
            //Reset the checkboxes
            $scope.formData = {type:{road: true, oval:true}};
        }
    }]);