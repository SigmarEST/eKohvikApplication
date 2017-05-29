App.controller('ErrorController', function ($http, $scope, AuthService, CardService, $rootScope) {
    $scope.message = CardService.data.errorMessage;
})