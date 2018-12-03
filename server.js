// Express is a minimal and flexible Node.js web application framework 
// Provides a robust set of features for web and mobile applications.
const express = require('express');
// dotenv to connect environment
const dotenv = require("dotenv");
// mongoDB for node js
const mongoose = require('mongoose');
// This is middleware to handle HTTP post request, json, text and encode url
const bodyParser = require('body-parser');

const cors = require('cors');
const compression = require('compression');
let _ = require('lodash');

// LOCAL IMPORT
const routes = require("./routes");

const app = express();


dotenv.config();


// Database config
mongoose
    .connect(/*process.env.MONGO_OFFLINE ||*/ process.env.MONGO_ONLINE, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log(err));


// Init express


// It's header
// we should remove it because it will tell the client know what's the framework you are using
app.disable('x-powered-by');

// Use gzip compression
// Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app
// Use the compression middleware for gzip compression in your express app
// app.use(compression());

// // // cors
// app.use(cors());


// Way to format data JSON - XML - URL - FORM DATA
// Body parser return a function activate like middleware . Listen data form client and get from request.body
// To get data from Form we need bodyParser
// @param extended : false => value can be string or array
// @param extended : true => value can be any type
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let sseExpress = require('sse-express');
let globalId = 1;
//let connections = [];
//const global_connection = require("./admin_modules/transaction_module/src/sse/variable");
global_connection = [];

app.use((req, res, next) => {
    // setup cors headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

  app.post('/sendMessage', (req, res) => {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*'
    });

    let {type,name}=req.body;
    if(type==1){
      global_connection.forEach(function(connection) {
        connection.sse({
          event: 'message',
          data: {
            name: req.body.name,
            money: req.body.money
          },
          id: Date.now() + req.body.userId
        });
      });
    }
    
    res.end();
  });

  app.get('/updates', sseExpress(), function(req, res) {
    global_connection.push(res);

    res.sse([{
      data: 'hello'
    }, {
      // send id to user
      event: 'connected',
      data: {
        id: globalId
      }
    }]);
    globalId++;

    req.on("close", function() {
      _.remove(app.locals.global_connection, res);
      console.log('clients: ' + global_connection.length);
    });

    console.log(`Hello, ${globalId}!`);
  });
// route splitting
routes(app);

app.listen(8080, () => console.log('Server running on port: ' + 8080));
