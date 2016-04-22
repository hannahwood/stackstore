'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl',
    });
});

app.controller('CartCtrl', function($scope){

    $scope.items = JSON.parse(localStorage.getItem('cart')) || [];

    $scope.quantityTotal = function() {
        var total = 0;
        for (var i = 0; i < $scope.items.length; i++) {
            total += $scope.items[i].quantity;
        }
        return total;
    };
    $scope.priceTotal = function() {
        var total = 0;
        for (var i = 0; i < $scope.items.length; i++) {
            total += $scope.items[i].product.price;
        }
        return total;
    };
    $scope.item = function() {
        if ($scope.quantityTotal() === 1) return 'item';
        else return 'items';
    };

    $scope.removeItem = function(id) {
        $scope.items = $scope.items.filter(function(elem) {
            return elem.product._id !== id;
        });

    localStorage.setItem('cart', JSON.stringify($scope.items));

    };

    $scope.removeAll = function() {
        var items = [];
        localStorage.setItem('cart', JSON.stringify(items));
        $scope.items = JSON.parse(localStorage.getItem('cart')) || [];
    };
});
