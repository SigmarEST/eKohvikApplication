App.controller('EmailSentController', function($http, $scope, AuthService, $state, $rootScope) {
    //I should get email address and assign to h1
    $scope.message = "Email sent to "+$rootScope.user_email;
    $scope.close = function(){
        $state.go('show-items')
    }
});
