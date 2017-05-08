App.controller("CardErrorController", function ($http, $scope, AuthService, $state, $rootScope) {
    $scope.cancel = function(){
        $state.go('home')
    }
})