'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/movies.html',
            controller: 'moviesCtrl'
        })
        .when('/movie/:movieId/:movieName', {
            templateUrl: 'partials/movieData.html',
            controller: 'movieData'
        })
        .when('/person/:personId/:personName', {
            templateUrl: 'partials/person.html',
            controller: 'personData'
        })
        .otherwise({
            redirectTo: '/'
        });

  $locationProvider.html5Mode(true);
});
