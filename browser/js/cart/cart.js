'use strict'

app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl',
    });
});

app.controller('CartCtrl', function($scope){
	
    $scope.items = JSON.parse(localStorage.getItem('cart')) || [];

    $scope.removeItem = function(id, items) {
        items = items.filter(function(elem) {
            return elem.product._id !== id;
        });

    $scope.items = JSON.parse(localStorage.getItem('cart')) || [];
    };

});