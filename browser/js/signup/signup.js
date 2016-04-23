app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignUpCtrl'
    });

});

app.controller('SignUpCtrl', function ($scope, AuthService, $state) {
    $scope.error = null;

    $scope.signup = function (signUpInfo) {

        $scope.error = null;

        AuthService.signup(signUpInfo).then(function () {
            $state.go('login');
        }).catch(function () {
            $scope.error = 'sign up error.';
        });

    };

});
