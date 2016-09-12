'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', 'dataService', 'trackService', 'seriesService', 'carService', function
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

        /**
         * Function for adding cars to an array for the SQL query
         * @param car
         */
        $scope.addCar = function (car) {
            var item = angular.copy(parseInt(car));
            $scope.carList.push(item);

            //Search the cars array for the car name
            var foundCar = _.find($scope.cars, {id: item});
            $scope.carListNames.push(foundCar);
        };

        /**
         * Function for adding tracks to an array for the SQL query
         * @param track
         */
        $scope.addTrack = function (track) {
            var item = angular.copy(parseInt(track));
            $scope.trackList.push(item);

            //Search the tracks array for the track name
            var foundTrack = _.find($scope.tracks, {id: item});
            $scope.trackListNames.push(foundTrack);
        };

        /**
         * Function for adding series to an array for the SQL query
         * @param series
         */
        $scope.addSeries = function (series) {
            var item = angular.copy(parseInt(series));
            $scope.seriesList.push(item);

            var foundSeries = _.find($scope.series, {id: item});
            $scope.seriesListNames.push(foundSeries);
        };

        $scope.addClass = function (data) {
            var item = angular.copy(data);
            $scope.classList.push(item);
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


            if(foundCars.length > 0) {
                var list = [];
                // For every selected car
                foundCars.forEach(function (item) {
                    // If more than 1 lists are selected
                    if (foundTracks.length > 0) {
                        foundTracks.forEach(function(track){
                            var X = _.filter(foundCars, {track: track.track});
                            list.push(X);
                            $scope.result = [].concat.apply([], list);
                        })
                    }
                    // If series are also selected
                    if (foundSeries.length > 0) {
                        foundSeries.forEach(function (series){
                            var X = _.filter(foundCars, {series: series.series});
                            list.push(X);
                            $scope.result = [].concat.apply([], list);
                        })
                    }
                    // If class is also selected
                    if ($scope.classList.length > 0) {
                        $scope.classList.forEach(function (selected){
                            $scope.result = _.filter($scope.result, {class: selected});
                        })
                    } else {
                        return $scope.result;
                    }
                });
            }
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
        }
    }]);