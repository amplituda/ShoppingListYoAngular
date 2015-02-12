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
        })
        .controller('ShoppingListController', function ($scope, $http, $log, helperFactory, MAX_LENGTH, MIN_LENGTH) {

            //var urlSelect = '../mod/select.php';

            var urlInsert = '/shoppinglist/insert';
            var urlSelect = '/shoppinglist/select';
            var urlUpdate = '/shoppinglist/update';
            var urlRemove = '/shoppinglist/remove';

            $scope.types = [];
            $scope.items = [];

            $scope.item = '';
            $scope.qty = '';
            $scope.types = '';

            $scope.howManyMoreCharactersNeeded = function () {
                var characters = (MIN_LENGTH - $scope.item.length);

                return (characters > 0) ? characters : 0;
            };

            $scope.howManyCharactersRemaining = function () {
                var characters = (MAX_LENGTH - $scope.item.length);

                return (characters > 0) ? characters : 0;
            };

            $scope.howManyCharactersOver = function () {
                var characters = (MAX_LENGTH - $scope.item.length);

                return (characters < 0) ? Math.abs(characters) : 0;
            };

            $scope.minimumCharactersMet = function () {
                return ($scope.howManyMoreCharactersNeeded() == 0);
            };

            $scope.anyCharactersOver = function () {
                return ($scope.howManyCharactersOver() > 0);
            };

            $scope.isNumberOfCharactersWithinRange = function () {
                return (
                    $scope.minimumCharactersMet() && !$scope.anyCharactersOver()
                    );
            };

            $scope.goodToGo = function () {
                return (
                    $scope.isNumberOfCharactersWithinRange() &&
                    $scope.qty > 0 &&
                    $scope.type > 0
                    );
            };

            $scope.clear = function () {
                $scope.item = '';
                $scope.qty = '';
            };

            function _recordAddedSuccessfully(data) {
                return ( data && !data.error && data.item );
            };

            $scope.insert = function () {

                if ($scope.goodToGo()) {

                    $http({
                        method: 'POST',
                        url: urlInsert,
                        data: "item=" + $scope.item + "&qty=" + $scope.qty + "&type=" + $scope.type,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    })
                        .success(function (data) {

                            console.log(data);

                            if (_recordAddedSuccessfully(data)) {
                                $scope.items.push({
                                    id: data.item.id,
                                    item: data.item.item,
                                    qty: data.item.qty,
                                    type: data.item.type,
                                    type_name: data.item.type_name,
                                    done: data.item.doen

                                });

                                $scope.clear();
                            }
                        })
                        .error(function (data, status, headers, config) {
                            throw new Error('Something went wrong with inserting record')
                        });
                }
            };

            $scope.select = function () {
                $http.get(urlSelect)
                    .success(function (data) {

                        //console.log(data.items);

                        if (data.items) {
                            $scope.items = data.items;
                        }

                        if (data.types) {
                            $scope.types = data.types;
                            $scope.type = $scope.types[0].id;
                        }
                    })
                    .error(function (data, status, headers, config) {
                        throw new Error('Something went wrong with selecting record')
                    });
            };

            $scope.select();

            $scope.update = function (item) {

                var thisData = "id=" + item.id;
                thisData += "&done=" + item.done;

                $http({
                    method: 'POST',
                    url: urlUpdate,
                    data: thisData,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}

                })
                    .success(function (data) {

                        $log.info(data);

                    })
                    .error(function (data, status, headers, config) {
                        throw new Error('Something went wrong with updating record');
                    });
            };

            function _recordRemovedSuccessfully(data) {
                return ( data && !data.error);
            };

            $scope.remove = function () {
                var removeIds = helperFactory.filterFieldArrayByDone($scope.items, 'id', 1);

                if (removeIds.length > 0) {
                    $http({
                        method: 'POST',
                        url: urlRemove,
                        data: "ids=" + removeIds.join('|'),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    })
                        .success(function (data) {
                            if (_recordRemovedSuccessfully(data)) {

                                $scope.items = $scope.items.filter(function (item) {

                                    return item.done == 0;

                                });
                            }
                        })
                        .error(function (data, status, headers, config) {
                            throw new Error('Something went wrong with removing record');
                        });
                }
            };

            $scope.print = function () {
                window.print();
            }

        });

}());