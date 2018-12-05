// let sseExpress = require('sse-express');
// let _ = require('lodash');
// let globalId = 1;
// //let connections = [];
// //const global_connection = require("./admin_modules/transaction_module/src/sse/variable");
// global_connection = [];

// app.use((req, res, next) => {
//     // setup cors headers
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
//   });

//   app.post('/sendMessage', (req, res) => {
//     res.writeHead(200, {
//       'Access-Control-Allow-Origin': '*'
//     });

//     let {type,name}=req.body;
//     if(type==1){
//       global_connection.forEach(function(connection) {
//         connection.sse({
//           event: 'message',
//           data: {
//             name: req.body.name,
//             money: req.body.money
//           },
//           id: Date.now() + req.body.userId
//         });
//       });
//     }
    
//     res.end();
//   });

//   app.get('/updates', sseExpress(), function(req, res) {
//     global_connection.push(res);

//     res.sse([{
//       data: 'hello'
//     }, {
//       // send id to user
//       event: 'connected',
//       data: {
//         id: globalId
//       }
//     }]);
//     globalId++;

//     req.on("close", function() {
//       _.remove(app.locals.global_connection, res);
//       console.log('clients: ' + global_connection.length);
//     });

//     console.log(`Hello, ${globalId}!`);
//   });
module.exports = {

}