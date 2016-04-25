'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('createProduct', {
        url: '/products/create',
        templateUrl: 'js/products/createProduct.html',
        controller: 'ProductCreateCtrl'
    });

});

app.factory('createProductFactory', function($http, ProductsFactory) {
    return {
        submitNewProduct: function(newProduct) {
            newProduct.category = newProduct.category.split(",");
            return $http.post('/api/products/', newProduct)
            .then(response => response.data)
            .then(product => {
                ProductsFactory.addToAllCategories(product.category); // Keeps track of any new categories created by the admin on the front-end
                return product;
            });
        },
        getAllCategories: function() {
        ProductsFactory.getAllCategories()
            .filter(category => category.name !== 'All') // Makes sure the admin can't assign a new product to the 'All' category
            .map(category => category.name); // Only exposes the category name strings to the html instead of an object.
        }
    };
});

app.controller('ProductCreateCtrl', function ($scope, $state, createProductFactory, $log) {
    $scope.categories = createProductFactory.getAllCategories(); // This in an array of all possible categories, not just those currently assigned to this product.
    $scope.submitNewProduct = function() {
        createProductFactory.submitNewProduct($scope.newProduct)
        .then(product => $state.go('product', {productId: product._id}))
        .catch($log.error);
    };
});
