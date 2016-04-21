'use strict'

app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl',
    });
});

app.controller('CartCtrl', function($scope){
	
	console.log(JSON.parse(localStorage.getItem('cart')));

    $scope.items = JSON.parse(localStorage.getItem('cart')) || [];

    $scope.removeItem = function(id) {
    	// do stuff
    };

});