App.controller('ShowItemsController', function ($http, $scope, AuthService, $state) {

    $scope.userName;
    $scope.userBalance;
    $scope.items;
    $scope.choosenItem;

    $scope.showItems = function () {

        $http.get(URL + '/item/items/')
            .then(
            function (response) {
                if (response.data) {
                    $scope.message = '';
                    $scope.items = JSON.parse(response.data)

                } else {
                    console.log('no items')
                    $scope.message = 'There is no available item !';
                }

            },
            function (errResponse) {
                console.log('item retrieving got error')
                $state.go('error')
            });

    }

    $scope.buy = function () {

    }

});
