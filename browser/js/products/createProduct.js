'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('createProduct', {
        url: '/products/create',
        templateUrl: 'js/products/createProduct.html',
        controller: 'ProductCreateCtrl',
        resolve: {
            productInfo: function($stateParams, editProductFactory) {
                return editProductFactory.fetchProduct($stateParams.productId);
            }
        }
    });

});

app.factory('createProductFactory', function($http) {
    return {
        fetchProduct: function(productId) {
            return $http.get('/api/products/' + productId)
            .then(response => response.data);
        },
        submitNewProduct: function(newProduct) {
            newProduct.category = newProduct.category.split(",");
            return $http.post('/api/products/', newProduct)
            .then(response => response.data);
        }
    };
});

app.controller('ProductCreateCtrl', function ($scope, $state, productInfo, createProductFactory, $log) {
    $scope.categories = productInfo.categories; // This in an array of all possible categories, not just those currently assigned to this product.
    $scope.submitChange = function() {
        editProductFactory.submitChange($scope.currentProduct)
        .then(product => $state.go('product', {productId: product._id}))
        .catch($log.error);
    };
});
