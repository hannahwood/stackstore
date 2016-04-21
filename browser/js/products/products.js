'use strict';
// <<<<<<< HEAD
// app.factory('ProductsFactory', function($http) {
//     let ProductsFactory = {};
// =======
/*global app */

app.factory('ProductsFactory', function($http){
	let ProductsFactory = {};
// >>>>>>> master

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

// <<<<<<< HEAD
// app.config(function($stateProvider) {
// =======
// ***** PRODUCTS (plural) *****
app.config(function ($stateProvider) {
// >>>>>>> master
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
// <<<<<<< HEAD
// =======

// ***** PRODUCT (single) *****
app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: '/products/:productId',
        templateUrl: 'js/products/product.html',
        controller: 'ProductCtrl',
        resolve: {
            productAndReviews: function(ProductsFactory, $stateParams){
                return ProductsFactory.fetchOne($stateParams.productId);
            }
        }
    });
});

app.controller('ProductCtrl', function($scope, productAndReviews) {
    $scope.product = productAndReviews.product;
    $scope.reviews = productAndReviews.reviews;
    $scope.quantity = 1;
    $scope.addToCart = function(qty) {
        let item = {
            product: $scope.product, // object with all product properties
            quantity: qty
        };
        let cart = [];

        if(!localStorage.getItem('cart')) {
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            cart = JSON.parse(localStorage.getItem('cart'));
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
        }

    };
});

// >>>>>>> master
