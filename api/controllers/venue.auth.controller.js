const { FB } = require('../helpers/firebaseConfig');
const { FBA } = require('../helpers/firebaseAuthConfig.js');
const adminRef = FBA.auth();
const adminDatabaseRef = FBA.database();
const databaseRef = FB.database();
const auth = require('../middleware/venue.auth.middleware');

module.exports = router => {
  
    router.use(auth);

    // Gets the signed in admin's count of venues added
    router.get('/api/current-admin/venue-count', (req, res, next) => {
        function adminVenueCounter (adminUid) {
            let counterRef = databaseRef.ref('admins/' + adminUid + '/venueCount');
            counterRef.once("value")
            .then(function(snapshot){
                res.json({
                    venueCount : snapshot.val()
                });
            })
            .catch(function(error){
                console.log("Error creating new venue:", error);
                res.json({
                    error: error.message
                });
            });
        }
        
        adminVenueCounter(req.query.uid);
        
    });
    
    // Adds a news venue to the DB
    // Increments the current admins count of venues added by one in the DB
    // Adds the name of the venue added to the Admins profile in the DB
    router.post('/api/add/venue', (req, res, next) => {

        function addVenue (venueId, venueName, description, addressLine1, postCode, rating, price, features, category, facebook, instagram, website, contactNumber, closestStation, pictureUrl, adminUid) {    
            let itemRef = adminDatabaseRef.ref('item/' + venueId);
            let venueid = venueId;
            let venuename = venueName;
            let adminuid = adminUid;
            itemRef.set({
                venueId : venueId,
                venueName: venueName,
                description: description,
                addressLine1 : addressLine1,
                postCode: postCode,
                rating: rating,
                price: price,
                features: features,
                category: category,
                facebook : facebook,
                instagram : instagram,
                website : website,
                contactNumber : contactNumber,
                closestStation : closestStation,
                pictureUrl : pictureUrl,
                publishTime: (new Date()).getTime(),
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
                res.json({
                    added: false, 
                    error: error.message
                });
            });
        }
        
        // Increment the count of venues added by the admin by one
        let addVenueCount = (uid) => {
            let userRefCount = adminDatabaseRef.ref('admins/' + uid + '/' + 'venueCount');
            userRefCount.transaction(function(currentValue){
                return (currentValue || 0 ) + 1;
            });
        };

        // Add the name of the venue added to the admin's profile in the DB
        let addVenueName = (uid, venueName, venueId) => {
            let userRefVenue = adminDatabaseRef.ref('/admins/' + uid + '/' + 'venuesAdded');
            userRefVenue.child(venueId).set(venueName);
        };

        addVenue(req.body.venueId, req.body.venueName, req.body.description, req.body.addressLine1, req.body.postCode, req.body.rating, req.body.price, req.body.features, req.body.category, req.body.facebook, req.body.instagram, req.body.website, req.body.contactNumber, req.body.closestStation, req.body.pictureUrl, req.body.adminUid);
        
    });

    // Adds an admin to the Authentication system
    // Creates a new admin profile in the DB with a count of venues added as 0 & an empty array of venue names added
    router.post('/api/add/admin', (req, res, next) => {
    
        let addAdmin = (a, b, c, d) => {
            adminRef.createUser({
                uid: a,
                displayName: b,
                email: c,
                password: d
        })
        .then(function(userRecord) {
            addAdminDB(userRecord.uid);
            return userRecord.uid;
        })
        .then(function(newUserUid){
            res.json({
                added: true,
                adminUid: newUserUid
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
        // also add the uid to the database to create the admin's profile
        // primary key is always uid to link JSON objects
        let addAdminDB = (a) => {
            let userRef = adminDatabaseRef.ref('admins/' + a);
            userRef.set({
                venueCount : 0,
                venuesAdded : [""]
            });
        };
        
        addAdmin(req.body.uid, req.body.displayName, req.body.email, req.body.password);
        
    });


};