// ***** PRODUCTS *****
'use strict';
app.factory('ProductsFactory', function($http) {
    let ProductsFactory = {};

    ProductsFactory.fetchAll = function() {
        return $http.get('/api/products')
            .then(response => response.data);
    };

    ProductsFactory.fetchOne = function(productId) {
        return $http.get('/api/products/' + productId)
            .then(response => response.data);
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
            }
        },
        controller: function($scope, ProductsFactory, allProducts) {
            $scope.products = allProducts;
            $scope.decimal = function(int) {
                return int.toFixed(2);
            };
            $scope.items = [
                { name: 'All', state: 'products', label: '' },
                { name: 'Books', state: 'products', label: 'books' },
                { name: 'Clothing', state: 'products', label: 'clothing' },
                { name: 'Bric-a-brac', state: 'products', label: 'bric-a-brac' },
                { name: 'Crap', state: 'products', label: 'crap' }
            ];
            $scope.currentCategory = 'All';

            $scope.setCategory = function(name) {
                console.log(name);
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
