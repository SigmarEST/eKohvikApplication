App.controller('RegisterController', function($http, $scope, AuthService, $state) {
    $scope.createUser = function(){
        $state.go('create-user')
    }
    $scope.addCardToUser = function(){
        $state.go('add-card-to-user')
    }
    $scope.cancel = function(){
        $state.go('home')
    }
});
