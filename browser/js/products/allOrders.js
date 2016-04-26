'use strict';


app.config(function($stateProvider) {
  $stateProvider.state('allOrders', {
    url: '/allOrders',
    templateUrl: 'js/products/allOrders.html',
    controller: 'allOrdersCtrl',
    resolve: {
      allOrders: function(allOrdersFactory) {
        return allOrdersFactory.getAllOrders();
      }
    }
  });
});


app.controller('allOrdersCtrl', function($scope, allOrders) {
  $scope.allOrders = allOrders;

});

app.factory('allOrdersFactory', function($http) {
  let returnObj = {};
  returnObj.getAllOrders = function() {
    return $http.get('/api/orders')
    .then(function(orders) {
      console.log(orders.data);
      return orders.data;
    });
  }
  return returnObj;
});
