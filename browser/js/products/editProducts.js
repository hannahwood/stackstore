'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('editProduct', {
        url: '/products/:productId/edit',
        templateUrl: 'js/products/editProduct.html',
        controller: 'ProductEditCtrl',
        resolve: {
            currentProduct: function($stateParams, editProductFactory) {
                return editProductFactory.fetchProduct($stateParams.productId);
            }
        }
    });

});

app.factory('editProductFactory', function($http) {
    return {
        fetchProduct: function(productId) {
            return $http.get('/api/products/' + productId)
            .then(response => response.data.product);
        },
        submitChange: function(currentProduct) {
            currentProduct.category = currentProduct.category.split(',');
            console.dir(currentProduct.category);
            return $http.put('/api/products/' + currentProduct._id, currentProduct)
            .then( response => response.data);
        }
    };
});

app.controller('ProductEditCtrl', function ($scope, $state, currentProduct, editProductFactory,$log) {
    $scope.currentProduct = currentProduct;
    console.log('currentProduct:', currentProduct);
    $scope.submitChange = function() {
        editProductFactory.submitChange($scope.currentProduct)
        .then(response => console.log('RESPONSE:', response))
        .catch($log.error);
    };
});

