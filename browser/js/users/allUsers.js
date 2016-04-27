'use strict';

app.config(function($stateProvider) {
  $stateProvider.state('allUsers', {
    url: '/allUsers',
    templateUrl: 'js/users/allUsers.html',
    controller: 'allUsersCtrl',
    resolve: {
      allUsers: function(allUsersFactory) {
        return allUsersFactory.getAllUsers();
      }
    }
  });
});


app.controller('allUsersCtrl', function($scope, allUsers, allUsersFactory, $log) {
  $scope.allUsers = allUsers;
});

app.factory('allUsersFactory', function($http) {
  let returnObj = {};
  returnObj.getAllUsers = function() {
    return $http.get('/api/users')
    .then(function(users) {
      return users.data;
    });
  }
  return returnObj;
});
