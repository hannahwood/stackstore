'use strict';

app.factory('ProductsFactory', function($http){
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

// ***** PRODUCTS (plural) *****
app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        resolve: {
        	allProducts: function(ProductsFactory){
        		return ProductsFactory.fetchAll();
        	}
        },
        controller: function($scope, ProductsFactory, allProducts) {
        	$scope.products = allProducts;
        }
    });
});

// ***** PRODUCT (single) *****
app.config(function ($stateProvider) {
    $stateProvider.state('product', {
        url: '/products/:productId',
        templateUrl: 'js/products/product.html',
        controller: 'ProductCtrl',
        resolve: {
            oneProduct: function(ProductsFactory, $stateParams){
                return ProductsFactory.fetchOne($stateParams.productId);
            }
        } 
    });
});

app.controller('ProductCtrl', function($scope, oneProduct) {

    $scope.product = oneProduct;
    $scope.quantity = 1;

    let isPresent = function(arr, id){
        let contains = arr.filter(function(elem){
            return elem.product._id === id;
        });
        return contains.length > 0 ? true : false;

    };

    let addLanguage = " item(s) added to cart";

    $scope.addToCart = function(qty) {
        let item = {
            product: $scope.product, // object with all product properties
            quantity: $scope.quantity
        };
        let cart = [];
        
        if(!localStorage.getItem('cart')) {
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            $scope.added = item.quantity + addLanguage;
        } else {
            
            cart = JSON.parse(localStorage.getItem('cart'));
            $scope.added = item.quantity + addLanguage;
            if (isPresent(cart, item.product._id) === true) {
                cart.forEach(function(elem){
                    if (elem.product._id === item.product._id) {
                        elem.quantity += $scope.quantity;
                    }

                });
                localStorage.setItem('cart', JSON.stringify(cart));

            } else {
                cart.push(item);
                localStorage.setItem('cart', JSON.stringify(cart));
                $scope.added = item.quantity + addLanguage;
            }
        }

    };
    

});