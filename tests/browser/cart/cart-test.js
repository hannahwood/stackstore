// 'use strict';

// const expect = chai.expect;

// describe('addToCart, function () {

//     beforeEach(module('fsaPreBuilt'));

//     var $httpBackend;
//     var $rootScope;
//     beforeEach('Get tools', inject(function (_$httpBackend_, _$rootScope_) {
//         $httpBackend = _$httpBackend_;
//         $rootScope = _$rootScope_;
//     }));

//     describe('controller `ProductCtrl`', function(){

//     var $scope;
//     var productAndReviews ;
//     beforeEach(inject(function ($rootScope, $controller, _ ) {
//       // a new scope object we can manipulate directly
//       $scope = $rootScope.$new();
//       // a fake resolved `todo` (doesn't rely on your state resolve)
//       todo = {};
//       // instantiate the controller and pass in our test objects
//       $controller('TodoDetailCtrl', {
//         $scope: $scope,
//         todo: todo
//       });
//     }));

//     /*------------------
//         TEST SPECS
//     /------------------*/

//   //   it('places an injected `todo` on the scope', function(){
//   //     expect($scope.todo).to.equal(todo);
//   //   });

//   // });

//     // describe('state `todos.detail`', function () {

//     // var Todo, $state, $rootScope;
//     // beforeEach(inject(function ($q, _$state_, _$rootScope_) {
//     //   $state = _$state_;
//     //   $rootScope = _$rootScope_;
//     //   // a fake Todo factory (doesn't rely on your Todo factory)
//     //   // `getOne` method returns a promise for object with an `_id`
//     //   Todo = {
//     //     getOne: chai.spy(function (id) {
//     //       return $q.when({ _id: id });
//     //     })
//     //   };
//     // }));


//     var Products;
//     beforeEach('Get factories', inject(function (_Products_) {
//         Products = _Products_;
//     }));

//     it('should be an object', function () {
//         expect(Products).to.be.an('object');
//     });

//     describe('adding cart items to localStorage', function () {

//         it('should create a new localStorage cart when the first item is added to the cart', function () {
//             // Session.create('testID', {email: 'cool@gmail.com'});
//             // expect(AuthService.isAuthenticated()).to.be.ok;
//         });

//         it('localStorage cart should be an array', function () {
//             // Session.create('testID', {email: 'cool@gmail.com'});
//             // expect(AuthService.isAuthenticated()).to.be.ok;
//         });

//         it('if localStorage cart exists, newly added items should be added to localStorage.cart', function () {
//             // Session.destroy();
//             // expect(AuthService.isAuthenticated()).to.not.be.ok;
//         });

//         it('if product already exists in cart, add to cart will update quantity and not add another item to cart', function () {
//             // Session.destroy();
//             // expect(AuthService.isAuthenticated()).to.not.be.ok;
//         });
//     });




// });