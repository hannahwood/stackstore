'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('order', {
        url: '/orders/:orderId',
        templateUrl: 'js/orders/order.html',
        controller: 'OrderCtrl',
        resolve: {
            order: function($stateParams, CartOrderFactory) {
                return CartOrderFactory.fetchOneOrder($stateParams.orderId);
            }
        }
    });
});

app.factory('CartOrderFactory', function($http) {
    return {
        fetchOneOrder: function(orderId) {
            return $http.get('/api/orders/' + orderId)
            .then(response => response.data);
        },
        fetchUserOrders: function(userId) {
            return $http.get('/api/orders/?userId=' + userId)
            .then(response => response.data);
        },
        quantityTotal: function(cartItems) {
            return cartItems.reduce(function(numItems, nextItem) {
                return numItems + nextItem.quantity;
            }, 0);
        },
        item: function(quantityTotal) {
            if (quantityTotal > 1) return "items";
            return "item";
        },
        priceTotal: function(cartItems) {
            return cartItems.reduce(function(total, nextItem) {
                return total += (nextItem.product.price * nextItem.quantity);
            }, 0);
        },
    };
});

app.controller('OrderCtrl', function($scope, CartOrderFactory, order) {
    $scope.quantityTotal = CartOrderFactory.quantityTotal(order.cartItems);
    $scope.item = CartOrderFactory.item($scope.quantityTotal);
    $scope.priceTotal = CartOrderFactory.priceTotal(order.cartItems);
    $scope.date = order.date;
    $scope.items = order.cartItems;
});
