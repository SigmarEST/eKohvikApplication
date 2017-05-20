
App.controller('CreateUserController', function ($http, $scope, AuthService, CardService, $timeout, $state, $rootScope) {
    //$scope.user_name;
    //$scope.user_email;
    //$scope.user_card_name;

    $scope.createUser = function () {
        var data = {
            name: $scope.user_name,
            email: $scope.user_email,
            balance: 0.00
        }
        $http.post(URL + '/user/add/', data)
            .then(
            function (response) {
                if (response.data) {

                        CardService.data.customer = response.data;
                        //CardService.data.user_email = $scope.user_email;
                    
                    $scope.message = '';

                    var data = {

                        email: $scope.user_email,
                        name: $scope.user_card_name,
                        uid: CardService.data.card.uid

                    }

                    $http.post(URL + '/card/email/' + $scope.user_email, data)
                        .then(
                        function (response) {
                            $state.go('email-sent')
                            $scope.user_email = '';
                            $scope.card_name = '';
                            $scope.user_name = '';
                        },
                        function (errResponse) {
                            console.log('card adding got error')
                           
                            CardService.data.errorMessage = "Card creation got error"
                            
                            $state.go('error')
                        })

                } else {
                    console.log('returned null')
                    $scope.message = "Email address is already attached to user account"
                    //$state.go('error')
                }

            },
            function (errResponse) {
                console.log('user creation got error')
                
                CardService.data.errorMessage = "User account creation got error"
                //CardService.errorMessage = "User account creation got error"
                $state.go('error')
            });
    }

    $scope.cancel = function () {
        $state.go('home')
    }
});

