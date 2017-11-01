const { FB } = require('../helpers/firebaseConfig');
const { FBA } = require('../helpers/firebaseAuthConfig.js');
const adminRef = FBA.auth();
const databaseRef = FB.database();
const bodyParser  = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = router => {

    router.post('/api/authenticate', (req, res, next) => {
        
        let getAdmin = (uid) => {
            adminRef.getUser(uid)
            .then(function(userRecord) {
                let user = userRecord.toJSON();
                let e = user.email;
                return e;
            })
            .then(function(userEmail) {
                if (userEmail) {

                    const payload = {
                        admin: userEmail
                    };

                    var token = jwt.sign(payload, app.get('superSecret'), {
                        expiresIn : 60 * 60 * 24
                    });

                    res.json({
                        success: true,
                        admin: true,
                        user: uid,
                        token: token
                    });
          
                }
            })
            .catch(function(err){
                res.status(403).send({ 
                    success: false, 
                    ecode: err.code,
                    emessage: err.message
                });
            });
    };

    getAdmin(req.body.uid);

    });
};

// Move into a service & call from here every 5 mins and from venue
            // Adds a new venue to Hackney Social
            /*var getAdminCount = function() {
                var path = $location.path();
                if (path == "/admin/profile/home") {

                return $http({
                    url: '/api/current-admin/venue-count',
                    method: 'GET',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: $httpParamSerializer,
                    params: {
                        "uid": $scope.userDetails.uid,
                        "token" : $scope.userDetails.HStoken
                    }
                })
                .then(function(res){
                    // log the response & assign it to userVenueCount $scope
                    console.log(res);
                    $scope.userDetails.venueCount = res;
                }, function(err){
                    // log the error & assign it to newAdminUserRes $scope
                    console.log(err);
                    $scope.error.message = err;
                });
            }};

            (function getAdminCountTick() {
                    $interval(getAdminCount, 30000);
            })();*/
