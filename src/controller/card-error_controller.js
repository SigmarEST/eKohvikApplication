App.controller("CardErrorController", function ($http, $scope, AuthService, $state, $rootScope) {

    setTimeout(function () {

        $state.go('home')

    }, 1500)


})