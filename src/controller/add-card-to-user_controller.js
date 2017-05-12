App.controller('AddCardToUserController', function ($http, $scope, AuthService, $timeout, CardService, $state, $rootScope) {

    $scope.addCardToUser = function () {

        $http.get(URL + '/user/station/email/' + $scope.user_email_to_search)
            .then(
            function (response) {
                if (response.data) {
                        CardService.data.customer = response.data;
                        CardService.data.user_email = $scope.user_email_to_search;

                    $scope.message = '';

                    var data = {

                        email: $scope.user_email_to_search,
                        name: $scope.card_name,
                        uid: CardService.data.card.uid

                    }

                    $http.post(URL + '/card/email/' + $scope.user_email_to_search, data)
                        .then(
                        function (response) {
                            $state.go('email-sent')
                            $scope.user_email_to_search = ''
                            $scope.card_name = ''
                        },
                        function (errResponse) {
                            console.log('card adding got error')
                            CardService.data.errorMessage = "Card creation got error";
                            $state.go('error')
                        })
                } else {
                    console.log('user not found')
                    $scope.message = 'User account not found with this email address'
                }

            },
            function (errResponse) {
                console.log('user retrieving got error')
                
                CardService.data.errorMessage = "Fetching user got error"
                           
                $state.go('error')
            });

    };

    $scope.cancel = function () {
        $state.go('home')
    }

});

