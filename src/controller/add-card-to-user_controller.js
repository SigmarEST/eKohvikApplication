App.controller('AddCardToUserController', function ($http, $scope, AuthService, $state) {

    $scope.addCardToUser = function () {

        $http.get(URL + '/station/user/email' + $scope.user_email)
            .then(
            function (response) {
                if (response.data) {

                    $rootScope.customer = response.data;

                    $scope.message = '';

                    var data = $.param({

                        email: $scope.user_email,
                        name: $scope.card_name,
                        uid: $rootScope.card.uid

                    })

                    $http.post(URL + '/card/email', data)
                        .then(
                        function (response) {
                            if (response.data) {
                                $rootScope.customer = response.data;
                                $state.go('email-sent')
                                $scope.user_email=''
                                $scope.card_name=''
                            }
                        },
                        function (errResponse) {
                            console.log('card adding got error')
                            $state.go('error')
                        })
                } else {
                    console.log('user not found')
                    $scope.message = 'User account not found with this email address'
                }

            },
            function (errResponse) {
                 console.log('user retrieving got error')
                 $state.go('error')
            });

    };

    $scope.cancel = function () {
        $state.go('home')
    }

});

