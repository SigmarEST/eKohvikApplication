
App.controller('CreateUserController', function ($http, $scope, AuthService, $state, $rootScope) {
    $scope.user_name;
    $scope.user_email;
    $scope.user_card_name;

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
                    $rootScope.customer = response.data;

                    $scope.message = '';

                    var data = {

                        email: $scope.user_email,
                        name: $scope.user_card_name,
                        uid: $rootScope.card.uid

                    }

                    $http.post(URL + '/card/email', data)
                        .then(
                        function (response) {
                            if (response.data) {
                                $rootScope.customer = response.data;
                                $state.go('email-sent')
                                $scope.user_email='';
                                $scope.card_name='';
                                $scope.user_name='';
                            }
                        },
                        function (errResponse) {
                            console.log('card adding got error')
                            $state.go('error')
                        })

                } else {
                    console.log('returned null')
                    state.go('error')
                }

            },
            function (errResponse) {
                 console.log('user creation got error')
                 $state.go('error')
            });
    }

    $scope.cancel = function () {
        $state.go('home')
    }
});

