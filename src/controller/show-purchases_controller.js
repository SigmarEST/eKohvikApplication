App.controller('ShowPurchasesController', function($http, $scope, AuthService, CardService, $state) {

    $scope.userName = CardService.data.customer.name;
    $scope.userBalance = CardService.data.customer.balance;

 var init = function () {

        $scope.purchases = []

        console.log(CardService.data.customer.userId)

        $http.get(URL + '/purchase/purchases/'+ CardService.data.customer.userId)
            .then(
            function (response) {
                if (response.data) {
                  
                    $scope.purchases = response.data;
                    console.log($scope.purchases)
         
                } else {
                    console.log('no items')
                    $scope.message = 'There is no available purchase !';
                }

            },
            function (errResponse) {
                console.log('purchases retrieving got error')

                CardService.data.errorMessage = "Purchases retrieving got error"

                $state.go('error')
            });

    }

     $scope.Cancel = function () {
        $state.go('home')
    }

    init()


});

