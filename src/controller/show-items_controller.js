App.controller('ShowItemsController', function ($http, $scope, AuthService, CardService, $timeout, $state, $rootScope) {
    $scope.userName = null;
    $scope.userBalance = null;

    $scope.userName = CardService.data.customer.name;
    $scope.userBalance = CardService.data.customer.balance;
    $scope.choosenItem;

    var init = function () {

        $http.get(URL + '/item/items/')
            .then(
            function (response) {
                if (response.data) {
                    $scope.message = '';
                    console.log(response.data)
                    $scope.items = response.data;


                } else {
                    console.log('no items')
                    $scope.message = 'There is no available item !';
                }

            },
            function (errResponse) {
                console.log('item retrieving got error')
                
                CardService.data.errorMessage = "Item retrieving got error"
                
                $state.go('error')
            });

    }


    $scope.buy = function () {

    }
    init();

});
