'use strict';

app.factory('ProductsFactory', function($http, AuthService) {
    let ProductsFactory = {};

    ProductsFactory.fetchAll = function() {
        return $http.get('/api/products')
            .then(response => response.data);
    };

    ProductsFactory.fetchOne = function(productId) {
        return $http.get('/api/products/' + productId)
            .then(response => response.data);
    };

    ProductsFactory.getUser = function() {
        return AuthService.getLoggedInUser()
            .then(function(user) {
                return user || { type: null };
            });
    };
    return ProductsFactory;
});

app.config(function($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        resolve: {
            allProducts: function(ProductsFactory) {
                return ProductsFactory.fetchAll();
            },
            currentUser: function(ReviewFactory) {
                return ReviewFactory.getUser();
            }
        },
        controller: function($scope, ProductsFactory, allProducts, currentUser) {
            $scope.products = allProducts;
            $scope.user = currentUser;

            $scope.isAdmin = currentUser.type == 'Admin';

            $scope.items = [
                { name: 'All', state: 'products', label: '' },
                { name: 'Books', state: 'products', label: 'books' },
                { name: 'Clothing', state: 'products', label: 'clothing' },
                { name: 'Bric-a-brac', state: 'products', label: 'bric-a-brac' },
                { name: 'Crap', state: 'products', label: 'crap' }
            ];
            $scope.currentCategory = 'All';

            $scope.setCategory = function(name) {
                $scope.currentCategory = name;
                $scope.activeMenu = name;
            };
            $scope.checkCategory = function(categories) {
                for (var i = 0; i < categories.length; i++) {
                    if ($scope.currentCategory === categories[i] || $scope.currentCategory === 'All') {
                        return true;
                    }
                }
                return false;
            };
            $scope.isActive = function(route) {
                return $scope.currentCategory === route;
            };
        }
    });
});