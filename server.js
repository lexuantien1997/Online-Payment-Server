const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

// LOCAL IMPORT
const routes = require("./routes"); // handle all routes
const sseConfig = require("./configs/sse.config"); // for sse
const mongooseConfig = require("./configs/mongoose.config"); // for mongo
const firebaseConfig = require("./configs/firebase.config");
// Init express
// Express is a minimal and flexible Node.js web application framework 
// Provides a robust set of features for web and mobile applications.
const app = express();

// It's header
// we should remove it because it will tell the client know what's the framework you are using
app.disable('x-powered-by');

// Use gzip compression
// Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app
// Use the compression middleware for gzip compression in your express app
app.use(compression());

// cors
app.use(cors());

// This is middleware to handle HTTP post request, json, text and encode url
// Way to format data JSON - XML - URL - FORM DATA
// Body parser return a function activate like middleware . Listen data form client and get from request.body
// To get data from Form we need bodyParser
// @param extended : false => value can be string or array
// @param extended : true => value can be any type
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ===============================================
dotenv.config(); // dotenv to connect environment
//sseConfig(); 
mongooseConfig();
firebaseConfig.initFirebase();
// ===============================================

app.get('/add-firebase', (req, res) => {
  console.log("add - firebase");
  let userRef = firebaseConfig.getDatabase().ref().child("user");
  userRef.push({
    name: "Lê Xuân Tiến",
    phone: "+84932311434",
    password: "$2y$10$Jvwka22iZlKfeAroQaimO.qZNhWyrfQmcTf2vJHDvuFCQYN.bmQqG"
  });

  // let verify = firebaseConfig.getDatabase().ref().child("verify");
  // let timestamp = Date.now();
  // verify.push({
  //   phone: 0932696969,
  //   country:"VN",
  //   request_id: "KSDFSDF696969",
  //   expired: timestamp
  // });
});

app.get("/register-firebase", (req,res) => {
  firebaseConfig.getAuth().createUser({
    emailVerified: false,
    phoneNumber: "+840932311434",
    password: "secretPassword",
    displayName: "John Doe",
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false,
    money:"123456789"
  }).then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });
});

app.get('/update-firebase', (req, res) => {
  console.log("update - firebase");
  firebaseConfig.getDatabase().ref()
    .child("users/-LSw7H_QbSyRm6gCivXt")
    .update({name: "shinigami190"}, err => {
        if(err != null) res.status(200).json({type: "success"});
        else res.status(200).json(err);
    })
    // .on("child_changed", snapshot => {
    //   if(snapshot) res.status(200).json({type: "success"});
    // });
  });

app.get('/query-firebase', (req, res) => {
  console.log("query - firebase");
  let userRef = firebaseConfig.getDatabase().ref().child("users");
  userRef.orderByChild("name").equalTo("lalala").once("value", (snapshot) => {
   // let items = [];
   // snapshot.forEach(item => { items.push(item) });
    console.log(Object.keys(snapshot.val())[0]);
  });
})


// route splitting
routes(app);

app.listen( process.env.PORT, () => console.log('Server running on port: ' + process.env.PORT));
