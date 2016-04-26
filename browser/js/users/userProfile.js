'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('userProfile', {
        url: '/users/:userId',
        templateUrl: '/js/users/userProfile.html',
        controller: 'UserProfileCtrl',
        resolve: {
            user: function($stateParams, UserFactory) {
                return UserFactory.fetchOneUser($stateParams.userId);
            },
            orders: function($stateParams, CartOrderFactory) {
                return CartOrderFactory.fetchUserOrders($stateParams.userId)
                .then(orders => orders.map(order => {
                    order.date = order.date.split('T')[0];
                    return order;
                }));
            }
        }
    });
});

app.factory('UserFactory', function($http) {
    return {
        editUser: function(user) {
            return $http.put('/api/users/' + user._id, user)
            .then(response => response.data);
        },
        fetchOneUser: function(userId) {
            return $http.get('/api/users/' + userId)
            .then(response => response.data);
        }
    };
});

app.controller('UserProfileCtrl', function($log, $scope, UserFactory, user, orders) {
    $scope.user = user;
    $scope.orders = orders;
    console.log(orders[0].date);
    $scope.editTheUser = function() {
        UserFactory.editUser($scope.user)
        .then(() => alert('Thank you. Your changes have been saved.'))
        .catch($log.error);
    };
});
