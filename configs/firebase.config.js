const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const dotenv = require("dotenv");
dotenv.config();

const getDatabase = () => admin.database();

const getAuth = () => admin.auth();

const initFirebase = () => admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://" + process.env.databaseURL + ".firebaseio.com"
});

module.exports = {
  getDatabase, 
  getAuth,
  initFirebase
}


