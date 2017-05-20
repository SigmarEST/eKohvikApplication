App.controller('PurchaseCreatedController', function($http, $scope, AuthService, CardService,  $state, $rootScope) {
    //I should get email address and assign to h1
    $scope.message = "Your purchase created successfully";
    $scope.close = function(){
        $state.go('home')
    }
});
