'use strict';
/*global app */

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
        resolve: {
            oneProduct: function(ProductsFactory, $stateParams){
                return ProductsFactory.fetchOne($stateParams.productId);
            }
        },
        controller: function($scope, ProductsFactory, oneProduct) {
            $scope.product = oneProduct;
        }
    });
});
