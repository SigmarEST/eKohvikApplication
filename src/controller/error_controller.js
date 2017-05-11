App.controller('ErrorController', function ($http, $scope, AuthService, $rootScope) {
    $scope.message = $rootScope.errorMessage;
})