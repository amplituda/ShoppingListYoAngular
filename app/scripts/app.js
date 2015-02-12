(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name shoppingListApp
     * @description
     * # shoppingListApp
     *
     * Main module of the application.
     */
    angular.module('shoppingListApp', ['ngRoute'])
        .factory('helperFactory', function () {
            return {
                filterFieldArrayByDone: function (thisArray, thisField, thisValue) {
                    var arrayToReturn = [];

                    for (var i = 0; i < thisArray.length; i++) {

                        if (thisArray[i].done == thisValue) {
                            arrayToReturn.push(thisArray[i][thisField]);
                        }

                    }
                    return arrayToReturn;
                }
            };
        })
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'ShoppingListController'
                })
        })
        .constant('MAX_LENGTH', 50)
        .constant('MIN_LENGTH', 2)
        .factory('Contact', function ($resource) {
            return $resource('/api/shoppinglist/:name', { name: '@name.clean' });
        });

}());