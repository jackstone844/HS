const firebase = require("firebase");
const config = {
    'appName': 'Hackney Social',
    'serviceAccount': './service-account.json',
    'authDomain': 'hackneysocial-71b7f.firebaseapp.com',
    'databaseURL': 'https://hackneysocial-71b7f.firebaseio.com',
    'storageBucket': 'hackneysocial-71b7f.appspot.com',
    'apiKey': 'AIzaSyDTzHwzw-achZtFPdRLmZjnFnKrwf0_Exw'
};

let FB = firebase.initializeApp(config);

module.exports.FB = FB;

