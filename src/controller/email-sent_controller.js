App.controller('EmailSentController', function($http, $scope, AuthService, $state) {
    //I should get email address and assign to h1
    $scope.close = function(){
        $state.go('show-items')
    }
});
