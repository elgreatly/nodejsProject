'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', []);
app.controller('AppCtrl', function ($scope, $http) {
    $http({
        method: 'GET',
        url: '/api/name'
    })
    .success(function (data, status, headers, config) {
        $scope.name = data.name;
    })
    .error(function (data, status, headers, config) {
        $scope.name = 'Error!';
    });
})
.controller('moviesCtrl', function ($scope, $http) {
    $http({
        method: 'GET',
        url: '/api/movies/getmovies',
    }).success(function (data, status, headers, config) {
        $scope.movies = data;
    });
})
.controller('movieData', function ($scope, $http, $routeParams) {
    $scope.movieName = $routeParams.movieName;
    $http({
        method: 'POST',
        url: '/api/movies/getmovieactor',
        data: {
            movieId: $routeParams.movieId
        }
    }).success(function (data, status, headers, config) {
        $scope.actors = data;
    });
    
    $http({
        method: 'POST',
        url: '/api/movies/getmoviedirector',
        data: {
            movieId: $routeParams.movieId
        }
    }).success(function (data, status, headers, config) {
        $scope.directors = data;
    });
    
    $scope.addNewDirector = function(){
       $http({
            method: 'POST',
            url: '/api/movies/addnewdirector',
            data: {
                directorName: $scope.newDirector,
                movieName: $scope.movieName,
                movieId: $routeParams.movieId
            }
        }).success(function (data, status, headers, config) {
            $scope.directors = data;
        }); 
    }
    
    $scope.deleteDirector = function(directorId){
        $http({
            method: 'POST',
            url: '/api/movies/removedirector',
            data: {
                directorId: directorId,
                movieId: $routeParams.movieId
            }
        }).success(function (data, status, headers, config) {
            $scope.directors = data;
        }); 
    }
    
})
.controller('personData', function ($scope, $http, $routeParams) {
    $scope.personName = $routeParams.personName;
    $http({
        method: 'POST',
        url: '/api/movies/getmovieswithpersonid',
        data: {
            personId: $routeParams.personId
        }
    }).success(function (data, status, headers, config) {
        $scope.movies = data;
    });
    
})
.controller('MyCtrl2', function ($scope) {
    // write Ctrl here
});
