App.controller('AutomaticCoffeeController', function ($http, $scope, AuthService, CardService, $timeout, $state, $rootScope) {
    $scope.userName = null;
    $scope.userBalance = null;

    $scope.userName = CardService.data.customer.name;
    $scope.userBalance = CardService.data.customer.balance;
    $scope.selectedItem = CardService.data.selectedItems;
    $scope.totalPrice = CardService.data.totalPrice;

    var init = function () {
        $http.get(URL + '/item/coffeeMachineItems/')
            .then(
                function (response) {
                    if (response.data) {
                        console.log(response.data)
                        $scope.machineItems = response.data;
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

    /*
    $scope.Buy = function () {

        var data = {
            user: CardService.data.customer,
            items: CardService.data.selectedItems
        }

        $http.post(URL + '/purchase/',  data)
            .then(
                function (response) {
                    $state.go('purchase-created')
                },
                function (errResponse) {
                    console.log('purchase creation got error')
                    CardService.data.errorMessage = "Purchase creation got error";
                    $state.go('error')
                })

    }

    $scope.showPurchases = function(){
        $state.go('show-purchases')
    }*/

    $scope.startAccelerationListening = function () {

    }

    $scope.ManualBuyMode = function () {
        $state.go("show-items")
    }

    $scope.Cancel = function () {
        $state.go('home')
    }

    init();
});
