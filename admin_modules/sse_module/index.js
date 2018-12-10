const express = require('express');
const router = express.Router();

// response header for sever-sent events
const SSE_RESPONSE_HEADER = {
  'Connection': 'keep-alive',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no'
};

// connected user
const userAlives = {};

// for debug:
router.get('/transaction/:userId', (req,res) => {
  
  let userId = getUserId(req);

  // data for sending:
  let data;

  // store connection
  userAlives[userId] = req;

  // Writes response header.
  res.writeHead(200, SSE_RESPONSE_HEADER);

  // Interval loop
  let intervalId = setInterval(function() {
    console.log(`*** Interval loop. userId: "${userId}"`);
    // create sending data:
    data = {
      userId,
      userAlives: Object.keys(userAlives).length,
      time: new Date().getTime()
    };
     // Note: 
    // For avoidance of client's request timeout, 
    // you should send a heartbeat data like ':\n\n' (means "comment") at least every 55 sec (30 sec for first time request)
    // even if you have no sending data:
    if (!data) res.write(`:\n\n`);
    else res.write(`data: ${JSON.stringify(data)}\n\n`);
  },3000);

  // Note: Heatbeat for avoidance of client's request timeout of first time (30 sec) 
  res.write(`:\n\n`);

  req.on("close", function() {
    let userId = getUserId(req);
    console.log(`*** Close. userId: "${userId}"`);
    // Breaks the interval loop on client disconnected
    clearInterval(intervalId);
    // Remove from connections
    delete userAlives[userId];
  });

  req.on("end", function() {
    let userId = getUserId(req);
    console.log(`*** End. userId: "${userId}"`);
  });

});

function getUserId(req) {
  // Note: 
  // In reality, you should use userId stored in req.session, 
  // but not URI parameter. 
  return req.params.userId;
}

module.exports = router;