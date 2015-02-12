'use strict';

/**
 * @ngdoc function
 * @name shoppingListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shoppingListApp
 */
angular.module('shoppingListApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
