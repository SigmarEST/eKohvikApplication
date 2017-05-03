App.controller("CardErrorController", function ($http, $scope, AuthService, $state, $globalScope) {
    $scope.cancel = function(){
        $state.go('home')
    }
})