App.controller("HomeController", function ($http, $scope, AuthService, $state, $rootScope) {
    $scope.user = AuthService.user;

    var NFCP = require('nfc-pcsc');
    const nfc = new NFCP.default();

    nfc.on('reader', reader => {

        console.log(`${reader.reader.name}  device attached`);

        reader.aid = 'F222222222';

        reader.on('card', card => {
            $rootScope.customer = null;
            $rootScope.card = null;
            $rootScope.user_email = null;
            $rootScope.errorMessage = null;

            console.log(`${reader.reader.name} xxx card detected`, card);
             $rootScope.card = card;

            $http.get(URL + '/card/station/' + card.uid)
                .then(
                function (response) {
                    if (response.data) {
                       // $rootScope.card = response.data;
                        $scope.message = '';
                        $http.get(URL + '/card/user/' + card.uid)
                            .then(
                            function (response) {
                                if (response.data) {
                                    $rootScope.customer = response.data;
                                    $state.go('show-items')
                                }
                            },
                            function (errResponse) {
                                console.log('user retrieving got error')
                                $rootScope.errorMessage = "User account fetching got error"
                                $state.go('error')
                            })
                    } else {
                        //$rootScope.card = card.uid;
                        console.log('register')
                        $state.go('register')
                    }

                },
                function (errResponse) {
                    console.error('Error while fetching card');
                    $rootScope.errorMessage = "Card fetching got error"
                    $state.go('error')

                });

        });

        reader.on('error', err => {
            console.log(`${reader.reader.name}  an error occurred`, err);
            $state.go('card-error')
        });

        reader.on('end', () => {
            console.log(`${reader.reader.name}  device removed`);
        });

    });

    nfc.on('error', err => {
        console.log('an error occurred', err);
        console.log('nfc reader not found')
        // $state.go('nfc-reder-not-found')
    });

});