App.controller("HomeController", function ($http, $scope, AuthService, $timeout, CardService, $state, $rootScope) {
    //const pcsclite = require('pcsclite')
    var NFCP = require('nfc-pcsc');
    const nfc = new NFCP.default();
    //nfc.pcsc.on();

    console.log(nfc)        
    //console.log(pcsclite)
    nfc.on('reader', reader => {

        console.log(`${reader.reader.name}  device attached`);

        reader.aid = 'F222222222';

        reader.on('card', card => {

            console.log(`${reader.reader.name} xxx card detected`, card);
            
            CardService.data.card = card;
            CardService.data.selectedItems=[];
            CardService.data.errorMessage = null;
            CardService.data.totalPrice = 0.00;

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
                                    //$scope.$apply();
                                    CardService.data.customer = response.data;
                                    //$scope.$apply();
                                   // console.log(reader)
                                    //reader._events.end();
                                    console.log("I am here")
                                    console.log()
                                    if($state.current.name == 'show-items' ){
                                         $state.reload();
                                    }
                                    else{
                                         $state.go('show-items')
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
            console.log(`${reader.reader.name}  an error occurred`, err);
            //nfc.pcsc.removeAllListeners()
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