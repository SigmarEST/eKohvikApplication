App.controller('ShowItemsController', function ($http, $scope, AuthService, CardService, $timeout, $state, $rootScope) {
    $scope.userName = null;
    $scope.userBalance = null;

    $scope.userName = CardService.data.customer.name;
    $scope.userBalance = CardService.data.customer.balance;
    $scope.selectedItem = CardService.data.selectedItems;
    $scope.totalPrice = CardService.data.totalPrice;

    console.log($scope.userName)
    console.log($scope.selectedItem)

    var init = function () {

        $http.get(URL + '/item/items/')
            .then(
            function (response) {
                if (response.data) {
                    //$scope.message = '';
                    //console.log(response.data)
                    // setTimeout(function(){

                    //$scope.$apply(function($scope){
                    $scope.items = response.data;
                    //  console.info(`items`,$scope.items)
                    // })
                    // },100)



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

    $scope.addItem = function (item) {


        CardService.data.selectedItems.push(item);

        CardService.data.totalPrice = 0.00;

        CardService.data.selectedItems.forEach(function (element) {
            CardService.data.totalPrice += element.price;
        }, this);

        $state.reload();

    }

    $scope.deleteItem = function (index) {

        CardService.data.totalPrice = 0.00;
        CardService.data.selectedItems.splice(index, 1);
        CardService.data.selectedItems.forEach(function (element) {
            CardService.data.totalPrice += element.price;
        }, this);

        $state.reload();

    }


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
    }

    $scope.Cancel = function () {
        $state.go('home')
    }

    init();

});
