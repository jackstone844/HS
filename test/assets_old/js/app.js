(function() {
    angular
        .module('app', [
            'ui.router',
            'firebase'
        ])
        .config(function(){
            var config = {
                appName: 'Hackney Social',
                authDomain: 'hackneysocial-71b7f.firebaseapp.com',
                databaseURL: 'https://hackneysocial-71b7f.firebaseio.com',
                storageBucket: 'hackneysocial-71b7f.appspot.com',
                apiKey: 'AIzaSyDTzHwzw-achZtFPdRLmZjnFnKrwf0_Exw'
            };
            firebase.initializeApp(config);
        });
})();
