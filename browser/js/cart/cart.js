'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl',
        resolve: {
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            }
        }
    });
});

app.controller('CartCtrl', function($log, $scope, currentUser, $http, $state, ProductsFactory){

    $scope.currentUser = currentUser;
    $scope.items = JSON.parse(localStorage.getItem('cart')) || [];
    $scope.startCheckout = false;

    $scope.toggleCheckout = function() {
        ProductsFactory.isValid($scope.items)
        .then((arrayOfAlerts) => {
            arrayOfAlerts.forEach(alert);
            $scope.startCheckout = !$scope.startCheckout;
            $scope.$evalAsync();
        })
        .catch($log.error);
    };

    let handler = StripeCheckout.configure({
        key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
        image: 'http://i.imgur.com/jA22n4z.png',
        locale: 'auto',
        token: function(token) {

            var bodyObj = {
                cart: $scope.items,
                cost: $scope.priceTotal() * 100,
                user: $scope.currentUser ,
                token: token.id
            };

            $http.post('/api/orders', bodyObj)
            .then($scope.removeAll)
            .then(() => $state.go('home'))
            .catch($log.error);
        }
    });

    angular.element(document.querySelector('#customButton')).on('click', function(e) {
    // Open Checkout with further options:
        handler.open({
            name: 'Upcycle.com',
            description: $scope.quantityTotal() + ' items',
            amount: $scope.priceTotal() * 100
        });
        e.preventDefault();
    });

    // Close Checkout on page navigation:
    angular.element(window).on('popstate', function() {
        handler.close();
    });

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
            total += ($scope.items[i].product.price * $scope.items[i].quantity);
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
