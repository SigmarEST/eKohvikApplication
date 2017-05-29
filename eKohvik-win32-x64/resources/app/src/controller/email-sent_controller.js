App.controller('EmailSentController', function($http, $scope, AuthService, CardService,  $state, $rootScope) {
    //I should get email address and assign to h1
    $scope.message = "Email sent to "+ CardService.data.customer.email;
    $scope.close = function(){
        $state.go('show-items')
    }
});
