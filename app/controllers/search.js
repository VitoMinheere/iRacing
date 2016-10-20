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

        var selectedItems = [];
        // List all the filter values
        var filterList = [];
        // Array for the ListNames
        $scope.lists = {};

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
            }
            $scope.formData.class = {};
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
         * Throw together all selected item names
         */
        $scope.getSelected = function (){
            selectedItems = [];
            // List all the filter values
            filterList = [];

            if ($scope.carListNames.length >= 1){
                $scope.carListNames.forEach(function (item){
                    if(selectedItems.indexOf(item) === -1){
                        selectedItems.push(item.name);
                        if (filterList.indexOf("car") === -1){
                            filterList.push("car");
                        }
                    }
                })
            }
            if ($scope.trackListNames.length >= 1){
                $scope.trackListNames.forEach(function (item){
                    if(selectedItems.indexOf(item) === -1){
                        selectedItems.push(item.name);
                       if (filterList.indexOf("track") === -1) {
                           filterList.push("track");
                       }
                    }
                })
            }
            if ($scope.seriesListNames.length >= 1){
                $scope.seriesListNames.forEach(function (item){
                    if(selectedItems.indexOf(item) === -1){
                        selectedItems.push(item.name);
                        if (filterList.indexOf("series") === -1){
                            filterList.push("series");
                        }
                    }
                })
            }
            console.log(filterList);
            $scope.getSeries(selectedItems);
        };

        /**
         * Take the selected cars, tracks , series and class and create the query
         */
        $scope.getSeries = function (selected) {
            // Gets all the races with the selectedItems
            $scope.result = _.filter($scope.races, function (item){
                return  selected.indexOf(item.car) >= 0 ||
                        selected.indexOf(item.track) >= 0 ||
                        selected.indexOf(item.series) >= 0;
            });

            if (filterList.length === 1){
                $scope.result = _.filter($scope.result, function (item){
                    // Filter list by the first item in filterList(car, track or series)
                    return  selectedItems.indexOf(item[filterList[0]]) >= 0;
                })
            }

            if (filterList.length === 2){
                $scope.result = _.filter($scope.result, function (item){
                    // Filter list by the first item in filterList(car, track or series)
                    return  selectedItems.indexOf(item[filterList[0]]) >= 0 &&
                            selectedItems.indexOf(item[filterList[1]]) >= 0
                })
            }

            if (filterList.length === 3){
                $scope.result = _.filter($scope.result, function (item){
                    // Filter list by the first item in filterList(car, track or series)
                    return  selectedItems.indexOf(item[filterList[0]]) >= 0 &&
                            selectedItems.indexOf(item[filterList[1]]) >= 0 &&
                            selectedItems.indexOf(item[filterList[2]]) >= 0
                })
            }
            console.log($scope.result);


          /**
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