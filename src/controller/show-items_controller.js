App.controller('ShowItemsController', function($http, $scope, AuthService, $state) {

    $scope.userName;
    $scope.userBalance;
    $scope.items;
    $scope.choosenItem;

    $scope.showItems = function(){
         $http({
            url: 'http://localhost:8081/api/item/items/',
            method: "GET",
            params: {
            }
        }).success(function (res) {
            if (res.body != '') {
                $scope.message = '';
                $scope.items = JSON.parse(res.body)
            } else {
                $scope.message = 'There is no available item !';
            }
        }).error(function (error) {
            $scope.message = 'Authetication Failed !';
        });
    }

    $scope.buy = function(){
        
    }

});
