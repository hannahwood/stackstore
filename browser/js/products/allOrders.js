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


app.controller('allOrdersCtrl', function($scope, allOrders, allOrdersFactory, $log) {
  $scope.allOrders = allOrders;
  $scope.options = ['shipped', 'cancelled', 'created', 'processing', 'completed'];
  $scope.selectedStatus = '';

  $scope.filter = function(filterVal) {
    $scope.allOrders = (filterVal == 'all') ? allOrders : allOrders.filter(function(elem) {
      return elem.status == filterVal;
    });
    $scope.$evalAsync();
  }

  $scope.updateOneOrder = function(id, status) {
    allOrdersFactory.updateOneOrder(id, status)
    .then(function(order) {
      $scope.$evalAsync();
      console.log(order);
      alert('order status was changed to: ' + status);
    })
    .catch($log.error);
  }
});

app.factory('allOrdersFactory', function($http) {
  let returnObj = {};
  returnObj.getAllOrders = function() {
    return $http.get('/api/orders')
    .then(function(orders) {
      return orders.data;
    });
  }
  returnObj.updateOneOrder = function(id, status) {
    console.log('STATUS: ', status);
    return $http.put('/api/orders/' + id, {_id: id, status: status})
    .then(function(order) {
      console.log(order.data,'ORDER');
      return order.data;
    });
  }
  return returnObj;
});
