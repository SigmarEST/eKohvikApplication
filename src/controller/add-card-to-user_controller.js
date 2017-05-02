App.controller('AddCardToUserController', function ($http, $scope, AuthService, $state) {
    //$scope.user_email;
    //$scope.card_name;

    $scope.addCardToUser = function () {
      
        $http({
            url: 'http://localhost:8081/api/station/user/email',
            method: "GET",
            params: {
                email: $scope.user_email,
            }
        }).success(function (res) {
            if (res.body != '') {
                $scope.message = '';

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

                $scope.message = 'User not found with procided email !';
            }
        }).error(function (error) {
            $scope.message = 'Authetication Failed !';
        });
    };

    $scope.cancel = function(){
        $state.go('home')
    }

});

