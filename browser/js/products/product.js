
'use strict';
app.config(function($stateProvider) {
    $stateProvider.state('product', {
        url: '/products/:productId',
        templateUrl: 'js/products/product.html',
        controller: 'ProductCtrl',
        resolve: {
            productAndReviews: function(ProductsFactory, $stateParams) {
                return ProductsFactory.fetchOne($stateParams.productId);
            },
            currentUser: function(ReviewFactory) {
                return ReviewFactory.getUser();
            }
        }
    });
});

app.factory('ProductReviewFactory', function($http) {
    let ProductReviewFactory = {};

    ProductReviewFactory.removeReview = function(id) {
        return $http.delete('/api/reviews/' + id)
            .then(function(response) {
            return response;
        });
    };

    return ProductReviewFactory;
});

app.factory('ProductEditFactory', function($http) {
    let ProductEditFactory = {};

    ProductEditFactory.editProduct = function(product) {
        return $http.put('/api/products/' + product._id)
            .then(function(response) {
            return response.data;
        });
    };

    return ProductEditFactory;
});


app.controller('ProductCtrl', function($scope, productAndReviews, ProductsFactory, currentUser, ProductReviewFactory) {
    $scope.product = productAndReviews.product;
    $scope.reviews = productAndReviews.reviews;
    $scope.user = currentUser;
    $scope.isUser = currentUser.type !== null;
    $scope.isAdmin = currentUser.type == 'Admin';
    $scope.quantity = 1;

    $scope.deleteReview = function(id) {
        ProductReviewFactory.removeReview(id)
        .then(function() {
            for (var i = 0; i < $scope.reviews.length; i++) {
                if (id == $scope.reviews[i]._id) {
                    $scope.reviews.splice(i, 1);
                    break;
                }

            }
            $scope.$evalAsync();
        });
    };

    // $scope.review.rating = 5;
    $scope.reviews.getNumber = function(num) {
        return new Array(num);   
    };

    let isPresent = function(arr, id) {
        let contains = arr.filter(function(elem) {
            return elem.product._id === id;
        });
        return contains.length > 0 ? true : false;

    };

    let addLanguage = " item(s) added to cart";

    $scope.addToCart = function() {
        let item = {
            product: $scope.product, // object with all product properties
            quantity: $scope.quantity
        };
        let cart = [];

        if (!localStorage.getItem('cart')) {
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            $scope.added = item.quantity + addLanguage;
        } else {

            cart = JSON.parse(localStorage.getItem('cart'));
            $scope.added = item.quantity + addLanguage;
            if (isPresent(cart, item.product._id) === true) {
                cart.forEach(function(elem) {
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


// filter to use number in an ng-repeat
app.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++) {
      input.push(i);
    }
    return input;
  };
});
