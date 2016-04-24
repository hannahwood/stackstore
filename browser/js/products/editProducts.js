'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('editProduct', {
        url: '/products/:productId/edit',
        templateUrl: 'js/products/editProduct.html',
        controller: 'ProductEditCtrl',
        resolve: {
            productInfo: function($stateParams, editProductFactory) {
                return editProductFactory.fetchProduct($stateParams.productId);
            }
        }
    });

});

app.factory('editProductFactory', function($http) {
    return {
        fetchProduct: function(productId) {
            return $http.get('/api/products/' + productId)
            .then(response => response.data);
        },
        submitChange: function(currentProduct) {
            if (typeof currentProduct.category === 'string') currentProduct.category = currentProduct.category.split(',');
            return $http.put('/api/products/' + currentProduct._id, currentProduct)
            .then(response => response.data);
        }
    };
});

app.controller('ProductEditCtrl', function ($scope, $state, productInfo, editProductFactory,$log) {
    $scope.currentProduct = productInfo.product;
    $scope.categories = productInfo.categories; // This in an array of all possible categories, not just those currently assigned to this product.
    $scope.submitChange = function() {
        editProductFactory.submitChange($scope.currentProduct)
        .then(product => $state.go('product', {productId: product._id}))
        .catch($log.error);
    };
});
