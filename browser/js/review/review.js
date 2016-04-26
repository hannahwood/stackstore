'use strict';

app.factory('ReviewFactory', function($http, AuthService) {
    let ReviewFactory = {};

    ReviewFactory.createReview = function(data) {
        return $http.post('/api/reviews', data)
            .then(response => response.data);
    };

    ReviewFactory.getUser = function() {
        return AuthService.getLoggedInUser()
            .then(function(user) {
                return user || { type: null };
            });
    };
    return ReviewFactory;
});


app.config(function($stateProvider) {
    $stateProvider.state('review', {
        url: '/products/:productId/addReview',
        templateUrl: 'js/review/review.html',
        controller: 'ReviewCtrl',
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

app.controller('ReviewCtrl', function($state, $scope, productAndReviews, currentUser, ReviewFactory, $log) {

    $scope.user = currentUser;

    $scope.isAdmin = currentUser.type === 'Admin';

    $scope.submitReview = function() {
        ReviewFactory.createReview({
            product: $scope.product._id,
            user: $scope.user._id,
            title: $scope.review.title,
            description: $scope.review.description,
            rating: $scope.review.rating
        })
        .then(function(review) {
            console.log("review", review);
            $state.go('product', {productId: $scope.product._id, newReview: review});
        })
        .catch($log.error);
    };

    $scope.product = productAndReviews.product;
});
