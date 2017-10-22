const { FB } = require('../helpers/firebaseConfig');
const { FBA } = require('../helpers/firebaseAuthConfig.js');
const adminRef = FBA.auth();
const databaseRef = FB.database();
const auth = require('../middleware/venue.auth.middleware');

module.exports = router => {
  
    router.use(auth);

    router.get('/api/hello', (req, res, next) => {
        res.send("hello world, you are authenticated!");
    });

    router.post('/api/add/venue', (req, res, next) => {

        function addVenue (venueId, venueName, description, addressLine1, addressLine2, postCode, rating, price, features, category, adminUid) {    
            let itemRef = databaseRef.ref('item/' + venueId);
            let venudid = venueId;
            let venuename = venueName;
            let adminuid = adminUid;
            itemRef.set({
                venueId : venueId,
                venueName: venueName,
                description: description,
                addressLine1 : addressLine1,
                addressLine2 : addressLine2,
                postCode: postCode,
                rating: rating,
                price: price,
                features: features,
                category: category,
                publishTime: (new Date()).getTime(),
                starCount: 0,
                adminUid: adminUid
            })
            .then(function(){
                addVenueCount(adminuid);
                addVenueName(adminuid, venueId, venuename);
                res.json({
                    added: true, 
                    venueName: venuename
                });
            })
            .catch(function(error) {
                console.log("Error creating new venue:", error);
                res.send({
                    added: false, 
                    error: error.message
                });
            });
        }
        
        // Increment the count of venues added by the admin by one
        let addVenueCount = (uid) => {
            let userRefCount = databaseRef.ref('admins/' + uid + '/' + 'venueCount');
            userRefCount.transaction(function(currentValue){
                return (currentValue || 0 ) + 1;
            });
        };

        // Add the name of the venue added to the admin
        let addVenueName = (uid, venueName, venueId) => {
            let userRefVenue = databaseRef.ref('/admins/' + uid + '/' + 'venuesAdded');
            userRefVenue.child(venueId).set(venueName);
        };

        addVenue(req.body.venueId, req.body.venueName, req.body.description, req.body.addressLine1, req.body.addressLine2, req.body.postCode, req.body.rating, req.body.price, req.body.features, req.body.category, req.body.adminUid);
        
    });

    router.post('/api/add/admin', (req, res, next) => {
    
        let addAdmin = (a, b, c, d) => {
            adminRef.createUser({
                uid: a,
                displayName: b,
                email: c,
                password: d,
            })
        .then(function(userRecord) {
            addAdminDB(userRecord.uid);
            console.log(userRecord.uid);
            res.json({
                added: true,
                adminUid: userRecord.uid
            });

        })
        .catch(function(error) {
            console.log("Error creating new user:", error);
            res.json({
                added: false,
                error: error.message
            });
        });

        };
        
        // When a new admin is added to FB Authentication
        // also add the uid to the database 
        // primary key is always uid to link JSON objects
        let addAdminDB = (a) => {
            let userRef = databaseRef.ref('admins/' + a);
            userRef.set({
                venueCount : 0,
                venuesAdded : [""]
            });
        };
        
        addAdmin(req.body.uid, req.body.displayName, req.body.email, req.body.password);
        
    });


};