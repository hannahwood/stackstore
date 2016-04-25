'use strict';

app.factory('ProductsFactory', function($http, AuthService) {
    let ProductsFactory = {};
    let allCategories = [];

    ProductsFactory.fetchAll = function() {
        return $http.get('/api/products')
            .then(response => response.data)
            .then(data => { // Data has a 'categories' key and a 'products' key
                allCategories = data.categories;
                allCategories.unshift('All');
                return data.products;
            });
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

    ProductsFactory.getAllCategories = () => allCategories.map(category => ({name: category}));

    ProductsFactory.addToAllCategories = function(array) {
        let newCategories = array.filter(category => allCategories.indexOf(category) === -1);
        allCategories = allCategories.concat(newCategories);
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
            $scope.items = ProductsFactory.getAllCategories();
            $scope.isAdmin = currentUser.type === 'Admin';
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
