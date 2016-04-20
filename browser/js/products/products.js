// ***** PRODUCTS *****
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