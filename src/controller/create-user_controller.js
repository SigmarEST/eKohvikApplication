
App.controller('CreateUserController', function ($http, $scope, AuthService, $state) {
    $scope.user_name;
    $scope.user_email;
    $scope.user_card_name;

    $scope.createUser = function () {
        $http({
            url: 'http://localhost:8081/api/user/add/',
            method: "POST",
            params: {
                name: $scope.user_name,
                email: $scope.user_email,
                balance: 0.00
            }
        }).success(function (res) {
            if (res.body != '') {
                $scope.message = '';
                //I should put here $globalScope.user = res.body;

                $http({
                    url: 'http://localhost:8081/api/card/email',
                    method: "POST",
                    params: {
                        email: $scope.user_email,
                        name: $scope.card_name,
                        uid: store.card.uid  //this one I should change
                    }
                }).success(function (res) {
                    $state.go('email-sent')
                }).error(
                    $state.go('error')
                    )

            } else {
                $scope.message = 'User is not created';
            }
        }).error(function (error) {
            $scope.message = 'Authetication Failed !';
        });
    }

    $scope.cancel = function () {
        $state.go('home')
    }
});

