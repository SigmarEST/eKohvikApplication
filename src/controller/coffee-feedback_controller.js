App.controller('CoffeeFeedbackController', function ($http, $scope, AuthService, CardService,
                                                     $timeout, $state, $rootScope) {
    $scope.userName = null;
    $scope.userBalance = null;

    $scope.userName = CardService.data.customer.name;
    $scope.userBalance = CardService.data.customer.balance;
    $scope.selectedItem = CardService.data.selectedItems;

    var init = function () {
        $http.get(URL + '/item/coffeeMachineItems/')
            .then(
                function (response) {
                    if (response.data) {
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

    $scope.sendFeedback = function (itemId) {
        var path = require("path");
        var fs = require('fs');
        var absolutePath = path.resolve("././sample.txt");

        const sample = fs.readFileSync(absolutePath, {encoding: 'base64'});
        postFeedback(sample, itemId);
    }

    function postFeedback(sample, itemId) {
        let data = {
            itemId: itemId,
            stationUsername: AuthService.user.username,
            sample: sample
        }

        console.log(AuthService.user)
        $http.post(URL + '/station/feedback', data)
            .then(
                function (response) {
                    $state.go('home')
                },
                function (errResponse) {
                    CardService.data.errorMessage = "Error sending feedback: " + errResponse;
                    $state.go('error')
                })
    }

    $scope.ManualBuyMode = function () {
        $state.go("show-items")
    }

    $scope.Cancel = function () {
        $state.go('home')
    }

    init();
});
