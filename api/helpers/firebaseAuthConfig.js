const admin = require("firebase-admin");
const serviceAccount = require("./HackneySocial-87239a3db8f6.json");

let FBA = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hackneysocial-71b7f.firebaseio.com"
  });

module.exports.FBA = FBA;

