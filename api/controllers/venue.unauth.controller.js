const { FB } = require('../helpers/firebaseConfig');
const databaseRef = FB.database();

module.exports = router => {

    // Returns a data snapshot of all the venues from the DB  
    router.get('/api/get/venue/all', (req, res, next) => {
        let itemRef = databaseRef.ref('item/');
        itemRef.once("value")
        .then(function(snapshot){
            res.send(snapshot.val());
        });
    });

    // Returns a data snapshot of a single venue from the DB
    router.get('/api/get/venue/:uid', (req, res, next) => {
        let itemRef = databaseRef.ref('item/' + req.params.uid + '/');
        itemRef.on("value", function(snapshot){
            res.send(snapshot.val());
        });
    });
    
    
};
