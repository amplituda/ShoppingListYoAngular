'use strict';

/**
 * @ngdoc function
 * @name shoppingListApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the shoppingListApp
 */
angular.module('shoppingListApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
