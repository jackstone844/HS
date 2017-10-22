const { FB } = require('../helpers/firebaseConfig');
const databaseRef = FB.database();

module.exports = router => {

    router.get('/api/get/venue/all', (req, res, next) => {
        let itemRef = databaseRef.ref('item/');
        itemRef.once("value")
        .then(function(snapshot){
            res.send(snapshot.val());
        });
    });

    router.get('/api/get/venue/:uid', (req, res, next) => {
        let itemRef = databaseRef.ref('item/' + req.params.uid + '/');
        itemRef.on("value", function(snapshot){
            res.send(snapshot.val());
        });
    });
    
    
};
