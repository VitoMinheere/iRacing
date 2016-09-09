'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
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
    var foundCar = _.find($scope.cars,{id: item});
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

    var foundSeries = _.find($scope.series,{id: item});
    $scope.seriesListNames.push(foundSeries);
  };

  $scope.addClass = function (data) {
    var item = angular.copy(data);
    $scope.classList.push(item);
  };

  /**
   * Take the selected cars, tracks and class and create the query
   */
  $scope.getSeries = function () {
    var usedLists = [];
    var query = [{car: $scope.carList}, {track: $scope.trackList}, {class: $scope.classList}, {series: $scope.seriesList}];
    query.forEach(function (item){
      console.log(item);
      if (item.length > 0){
        usedLists.push(item);
        console.log(usedLists);
      }

    });

    /*
    if ($scope.carList.length > 0 ||
        $scope.trackList.length > 0 ||
        $scope.seriesList.length > 0 ||
        $scope.classList.length > 0
    ){

    }
    if ($scope.trackList.length > 0 ||
        $scope.seriesList.length > 0 ||
        $scope.classList.length > 0
    ){

    }
    if ($scope.carList.length > 0 ||
        $scope.seriesList.length > 0 ||
        $scope.classList.length > 0
    ){

    }
    if ($scope.carList.length > 0 ||
        $scope.trackList.length > 0 ||
        $scope.seriesList.length > 0 ||
        $scope.classList.length > 0
    ){

    }
    */


    /*
    $http.get('query.php',
        {
          params: {
            "cars": $scope.carList.toString(),
            //"tracks": $scope.trackList.toString()
            //"series": $scope.seriesList.toString(),
            //"class": $scope.classList.toString()
          }
        }
    ).then(function(response){
      $scope.data = response.data;
    });
    */
  };

  /**
   * Remove the selected item from the list
   * @param item
   * @param array
     */
  $scope.removeItem = function (item , array) {
    if(array == 'cars'){
     $scope.carListNames =  _.without($scope.carListNames, item);
     $scope.carList =  _.without($scope.carList, item.id);
    }
    if (array == 'tracks'){
     $scope.trackListNames = _.without($scope.trackListNames, item);
     $scope.trackList = _.without($scope.trackList, item.id);
    }
    if (array == 'series'){
      $scope.seriesListNames = _.without($scope.seriesListNames, item);
      $scope.seriesList = _.without($scope.seriesList, item.id);
    }
    if (array == 'class'){
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