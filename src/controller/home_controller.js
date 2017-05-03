App.controller("HomeController", function ($http, $scope, AuthService, $state) {
    $scope.user = AuthService.user;

    var NFCP = require('nfc-pcsc');
    const nfc = new NFCP.default();

    nfc.on('reader', reader => {

        console.log(`${reader.reader.name}  device attached`);

        reader.aid = 'F222222222';

        //NFCHandler.Reader.read(reader)

        reader.on('card', card => {

            console.log(`${reader.reader.name} xxx card detected`, card);
            //RESTAdapter.GetCardByUID(card);

            $http({
                url: 'http://localhost:8081/api/card/station/',
                method: "GET",
                params: {
                    uid:card
                }
            }).success(function (res) {
                if (res.body != '') {
                    $scope.message = '';
                    //I should put here $globalScope.user = res.body;
<<<<<<< HEAD
                    //$globalScope.card = card;
=======
                   // $globalScope.card = card;
>>>>>>> fd564bbbbf1a26ae16dd0c90c8a1068a5405904a
                    $http({
                        url: 'http://localhost:8081/api/card/user/',
                        method: "GET",
                        params: {
                            uid: card //this one I should change
                        }
                    }).success(function (res) {
<<<<<<< HEAD
                        //$globalScope.user = res.body;
=======
                     //   $globalScope.user = res.body;
>>>>>>> fd564bbbbf1a26ae16dd0c90c8a1068a5405904a
                        $state.go('show-items')
                    }).error(
                        $state.go('error')
                        )

                } else {
                    $state.go('register')
                }
            }).error(function (error) {
                $state.go('card-error');
            });

        });

        reader.on('error', err => {
            console.log(`${reader.reader.name}  an error occurred`, err);
            //NFCHandler.Card.error(err);
        });

        reader.on('end', () => {
            console.log(`${reader.reader.name}  device removed`);
        });

    });

    nfc.on('error', err => {
        console.log('an error occurred', err);
    });

});