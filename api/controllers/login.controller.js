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
                console.log(user);
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
                        authenticated: true,
                        admin: true,
                        user: uid,
                        token: token
                    });
          
                }
            })
            .catch(function(err){
                res.status(403).send({ 
                    authenticated: false,
                    user: uid, 
                    ecode: err.code,
                    emessage: err.message
                });
            });
    };

    getAdmin(req.body.uid);

    });
};