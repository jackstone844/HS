const { FBA } = require('../api/helpers/firebaseAuthConfig.js');
const { FB } = require('../api/helpers/firebaseConfig');
const adminRef = FBA.auth();
const databaseRef = FB.database();
/*

//WORKS
let addAdmin = function(a, b, c, d) {
    adminRef.createUser({
        uid: a,
        displayName: b,
        email: c,
        password: d,
    })
    .then(function(userRecord) {
        addAdminDB(userRecord.uid)
      // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
    })
    .catch(function(error) {
        console.log("Error creating new user:", error);
    });
};

let addAdminDB = function(a) {
    let userRef = databaseRef.ref('admins/' + a);
    userRef.set({
        venueCount : 0
    });
};

addAdmin('testingnew3', '2testing new2', '2testingnew2@outlook.co.uk', '3password12345');

//WORKS
let getAdmin = (uid) => {
    adminRef.getUser(uid)
    .then(function(userRecord) {
  // See the UserRecord reference doc for the contents of userRecord.
    let user = userRecord.toJSON();
    let t = user.email;    
    console.log("Successfully fetched user data:", user);
    })
    .catch(function(error) {
        console.log("Error fetching user data:", error);
    });
};*/


//getAdmin("jackstone844");
/*
// use on client side
let adminSign = (a, b) => {
    FB.auth().signInWithEmailAndPassword(a, b) 
    .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode + ' : ' + errorMessage);
    });
};*/

//adminSign("test@test.com", "testing");
/*
var user = FB.auth().currentUser;
  if (user) {
      console.log(user);
} else {
      console.log("error");
}

// event listener  
FB.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
    } else {
        console.log("error oh dear...");
    }
});*/

//getAdmin("jackstone844");





//DOESNT WORK//
/*
let auth = function() {
    let ref = FB.auth();
    ref.signInWithEmailAndPassword("jackstone844@outlook.com", "password123")
    .then(function(user){
        return user;
    })
    .catch(function(error){
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode + " " + errorMessage);
    });
};
*/

  
        
//addAdmin("jackstone844", "Jack", "jackstone844@outlook.com", "password123");
//getAdmin("jackstone844");
//"jackstone844@outlook.com"
//"password123"
/*
let authenticate = () => {
    auth(user => {
        console.log(user);
    });
};
*/

/*
app.post('/signin', function(req,res){ firebase.auth().signInWithEmailAndPassword(req.params.email, req.body.password) 
    .then(function(user) {
        console.log(user);
    }
    .catch(function(error) { 
    // Handle Errors here. 
    var errorCode = error.code; 
    var errorMessage = error.message; 
    console.log(errorCode);
    res.json("error");
}); 
    firebase.auth().onAuthStateChanged(function(user) { if (user) { res.json(user) } }); 
});


addAdmin("1234", "testing test", "test@test.com", "test123");*/


/*
let authSignIn = (token) => {
    FB.auth().signInWithCustomToken(token)
    .then(function(uid){
        console.log(uid);
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ' : ' + errorMessage);
    });
  };
    
  let authVerifyC = (token) => {
    // from client then grab and verify on server
    FB.auth().currentUser.getToken(true)
    .then(function(token){
        //send token to node
        console.log(token);
    })
    .catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + ' : ' + errorMessage);
    });
  };
  
  // grab token on server and send back with response 
  // use with every req and res ... using next();
  let authVerifyS = (token) => {
    FBA.auth().verifyIdToken(token)
    .then(function(decodedToken){
      let uid = decodedToken.uid;
      console.log(uid);
      // res send uid
    })
    .catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + ' : ' + errorMessage);
    });
  };
  
  authSignIn('L4susSjNFhUvQQASDNAipLQ1h0N2');
*/
/*
FB.auth().signInWithEmailAndPassword(email, password)
.then(function(idToken){
    
})
.catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });


adminRef.currentUser.getToken(true)
.then(function(idToken) {
    // Send token to your backend via HTTPS
    // ...
  }).catch(function(error) {
    // Handle error
  });


 adminRef.verifyIdToken(idToken)
  .then(function(decodedToken) {
    let uid = decodedToken.uid;
    console.log(decodedToken);
  }).catch(function(error) {
    // Handle error
  });*/




  /*$scope.login = function(){
                Auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password)
                .then(function(auth){
                    console.log('success');
                    $state.go('admin');
                }, function(err) {
                    console.log(err.message);
                    $scope.err = err;
                });
            };*/

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
                    venueName: venue.venueName
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
        
            let addVenueCount = (uid) => {
                let userRefCount = databaseRef.ref('admins/' + uid + '/' + 'venueCount');
                userRefCount.transaction(function(currentValue){
                    return (currentValue || 0 ) + 1;
                });
            };

            let addVenueName = (uid, venueName, venueId) => {
                let userRefVenue = databaseRef.ref('/admins/' + uid + '/' + 'venuesAdded');
                userRefVenue.child(venueId).set(venueName);
            };


            //addVenueName("testing new", 'new venue - does this work?! I dont think so hahahha', 'i am the id');

            addVenue('venue wow', 'venue wow testing id', 'req.body.description', 'req.body.addressLine1', 'req.body.addressLine2', 'req.body.postCode', 'req.body.rating', 'req.body.price', 'req.body.features', 'req.body.category', 'testing new');
                    //(venueId, venueName, description, addressLine1, addressLine2, postCode, rating, price, features, category, adminUid)