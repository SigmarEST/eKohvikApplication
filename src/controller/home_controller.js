var sha512 =  require('js-sha512').sha512;

App.controller("HomeController", function ($http, $scope, AuthService, $timeout, CardService, $state, $rootScope) {
    var NFCP = require('nfc-pcsc');
    const nfc = new NFCP.NFC

    console.log(nfc)
    nfc.on('reader', reader => {

        console.log(`${reader.reader.name}  device attached`);

        reader.aid = 'F222222222';

        reader.on('card', card => {

            console.log(`${reader.reader.name} xxx card detected`, card);
            
            CardService.data.card = card;
            CardService.data.card.uid = sha512(card.uid);
            //console.log( CardService.data.card.uid)
            //console.log(CardService.data.card)
            CardService.data.selectedItems=[];
            CardService.data.errorMessage = '';
            CardService.data.totalPrice = 0.00;

            $http.get(URL + '/card/station/' + CardService.data.card.uid)
                .then(
                function (response) {
                    if (response.data) {
                        // $rootScope.card = response.data;
                        $scope.message = '';
                        $http.get(URL + '/card/user/' + CardService.data.card.uid)
                            .then(
                            function (response) {
                                if (response.data) {
                                    CardService.data.customer = response.data;
                                   
                                    if($state.current.name == 'automatic-coffee'){
                                         $state.reload();
                                    }
                                    else{
                                         $state.go('automatic-coffee')
                                    }
                                }
                            },
                            function (errResponse) {
                                //nfc.pcsc.close();
                                console.log('user retrieving got error')
                                CardService.data.errorMessage = "User account fetching got error";
                                $state.go('error')
                            })
                    } else {
                        //$rootScope.card = card.uid;
                       //nfc.pcsc.removeAllListeners()
                        console.log('register')
                        $state.go('register')
                    }

                },
                function (errResponse) {
                   //nfc.pcsc.removeAllListeners()
                    console.error('Error while fetching card');

                    CardService.data.errorMessage = "Card fetching got error";
                    
                    $state.go('error')

                });

        });

        reader.on('error', err => {
            if (!reader.reader.name.startsWith('Windows')) {
                console.log(`${reader.reader.name}  an error occurred`, err);
                $state.go('card-error')
            }
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
