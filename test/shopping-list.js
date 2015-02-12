/**
 * Created by alex on 12/21/14.
 */

describe('helperFactory tes', function() {
   var helpFactory = null,
       items = [
           {id : 1, item : 'Apples', qty : 1, type : 2, done : 1},
           {id : 2, item : 'Bread', qty : 1, type : 1, done : 1},
           {id : 3, item : 'Bananas', qty : 2, type : 2, done : 0},
           {id : 4, item : 'Pears', qty : 1, type : 2, done : 0}
       ],
       thisItems = [];


    beforeEach(function() {
        module('myApp');

        inject(function(_helperFactory_){

            helpFactory = _helperFactory_;

        });

    });

    it('should filter array and return records that are completed (done)', function(){
        thisItems = helpFactory.filterFieldArrayByDone(items, 'id', 1);

        expect(thisItems.length).toEqual(2);
    });



});

describe('SoppingListController help methods test', function(){
   var $scope,
       helperFactory,
       ShoppingListController;

    beforeEach(function(){
        module('myApp');

        inject(function($rootScope, _helperFactory_, $controller){
           $scope = $rootScope.$new();

            helperFactory = _helperFactory_;

            ShoppingListController = $controller('ShoppingListController', {
               $scope :$scope,
                helperFactory : helperFactory

            });
        });
    });

    it('should return 0 for 2 characters', function(){
        $scope.item = '12';

        expect($scope.howManyMoreCharactersNeeded()).toEqual(0);
    });

    it('should return 40 for 10 characters', function() {
        $scope.item = '1234567890';

        expect($scope.howManyCharactersRemaining()).toEqual(40);
    });

});

describe('ShoppingListController $http methods test', function(){
   var $scope,
       $http,
       $httpBackend,
       $log,
       helperFactory,
       ShoppingListController;

   beforeEach(function() {
       module('myApp');

       inject(function(_$httpBackend_, $rootScope, _$http_, _$log_, _helperFactory_, $controller ){

           $httpBackend = _$httpBackend_;
           $scope = $rootScope.$new();
           $http = _$http_;
           $log = _$log_;
           helperFactory = _helperFactory_;


           $httpBackend.whenGET('/mod/select.php').respond({
                items : [
                    { id : 1, item : 'Apples', qty : 1, type : 2, done : 0 },
                    { id : 2, item : 'Bread', qty : 1, type : 1, done : 0 }
                ],
               types : [
                   {id : 1, name : 'Qty'},
                   {id : 2, name : 'Kg'}
               ]
           });

           ShoppingListController = $controller('ShoppingListController', {
               $scope: $scope,
               $http : $http,
               $log : $log,
               helperFactory : helperFactory

           });


       });
    });

    afterEach(function(){
       $httpBackend.verifyNoOutstandingExpectation();
       $httpBackend.verifyNoOutstandingRequest();
   });

    it('should get all items', function(){

        $httpBackend.flush();

        expect($scope.items.length).toBe(2);
        expect($scope.types.length).toBe(2);

    });

    it('should add new item and clear the properties', function(){
        $httpBackend.flush();

        $scope.item = 'Bananas';
        $scope.qty = 2;
        $scope.type = 2;

        $httpBackend
            .expectPOST('/mod/insert.php')
            .respond(
            {
                error :false,
                item : {
                    id : 3,
                    item : 'Bananas',
                    qty : 2,
                    type : 2,
                    type_name : 'Kg',
                    done : 0,
                    date : '2014-10-01 18:18:13'
                }
            }
        );

        $scope.insert();

        $httpBackend.flush();

        expect($scope.items.length).toBe(3);

        expect($scope.items[2].id).toBe(3);

        expect($scope.items[2].item).toBe('Bananas');
        expect($scope.items[2].qty).toBe(2);
        expect($scope.items[2].type).toBe(2);


        expect($scope.item).toBe('');
        expect($scope.qty).toBe('');
        expect($scope.type).toBe(2);

    });

    it('should update record and return json {error : false}', function(){

        $httpBackend.flush();

        $httpBackend
            .expectPOST('/mod/update.php')
            .respond({ error: false});

        $scope.update({ id : 1, done : 1 });

        $httpBackend.flush();


        expect($log.info.logs).toContain([{ error : false}]);

    });

/*
    it('should remove record and filter items to only include {done : 0 }', function() {

        $httpBackend.flush();

        $httpBackend.expectPOST('/mod/remove.php').respond( { error : false } );


        $scope.remove();

        $httpBackend.flush();

        expect($scope.items.length).toBe(1);
        expect($scope.items[0].item).toContain('Apples');


    });
*/

});
