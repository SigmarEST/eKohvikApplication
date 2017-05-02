var NFCP = require('nfc-pcsc');
const nfc = new NFCP.default(); // optionally you can pass logger 

nfc.on('reader', reader => {

    console.log(`${reader.reader.name}  device attached`);


    // needed for reading tags emulated with Android HCE 
    // custom AID, change according to your Android for tag emulation 
    // see https://developer.android.com/guide/topics/connectivity/nfc/hce.html 
    reader.aid = 'F222222222';

    NFCHandler.Reader.read(reader)
    reader.on('card', card => {

        // card is object containig folowing data 
        // [always] String type: TAG_ISO_14443_3 (standard nfc tags like Mifare) or TAG_ISO_14443_4 (Android HCE and others) 
        // [only TAG_ISO_14443_3] String uid: tag uid 
        // [only TAG_ISO_14443_4] Buffer data: raw data from select APDU response 
        
        console.log(`${reader.reader.name} xxx card detected`, card);
        RESTAdapter.GetCardByUID(card);
    });

    reader.on('error', err => {
        console.log(`${reader.reader.name}  an error occurred`, err);
        NFCHandler.Card.error(err);
    });

    reader.on('end', () => {
        console.log(`${reader.reader.name}  device removed`);
    });

});

nfc.on('error', err => {
    console.log('an error occurred', err);
});