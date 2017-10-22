express = require('express');
app = express();
router = express.Router();
tokenConfig = require('./api/helpers/authenticate');

require('./api/controllers/venue.unauth.controller.js')(router);
require('./api/controllers/login.controller.js')(router);
require('./api/controllers/venue.auth.controller.js')(router);

app.use('/blog', express.static('assets'));
//app.use(express.static('assets'));
app.use(router);
app.set('superSecret', tokenConfig.secret);
app.use(function(err, req, res, next) {
    if (err) {
        res.status(500).send(err.message);
    }
});

app.listen(process.env.PORT || 8080, (a) => {
    console.log('listening on port 8080');
});