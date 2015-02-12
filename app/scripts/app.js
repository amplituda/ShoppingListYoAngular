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
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/list.html',
                    controller: 'ShoppingListController'
                })
        }])
        .constant('MAX_LENGTH', 50)
        .constant('MIN_LENGTH', 2);

}());