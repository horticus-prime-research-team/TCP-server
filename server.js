'use strict';

// DEPLOY STUFF:
var app = require('express')();
var server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(process.env.PORT);

io.on('connection', function(socket) {
  console.log(`Connection from: ${socket.id}`);

  // emit data
  socket.on('moisture-data', payload => {
    let newPayload = JSON.parse(payload);

    io.emit('moisture-data', newPayload);
  });

  // database data
  // Get average and send
  // let job = cron.schedule('0 */2 * * * *', function() {
  //   let newArr = arr;
  //   let length = newArr.length;
  //   arr = [];

  //   let total = newArr.reduce((acc, cur) => {
  //     acc += cur.moistureNumber;

  //     return acc;
  //   }, 0);

  //   total = total / length;

  //   let obj = {moistureNumber: total, timestamp: new Date()};
    
  //   io.emit('database-data', obj);
  // }, {
  //   scheduled: true,
  // });

  // setInterval(function(){ 
  //   let newArr = arr;
  //   let length = newArr.length;
  //   arr = [];

  //   let total = newArr.reduce((acc, cur) => {
  //     acc += cur.moistureNumber;

  //     return acc;
  //   }, 0);

  //   total = total / length;

  //   let obj = {moistureNumber: total, timestamp: new Date()};
    
  //   io.emit('database-data', obj);
  // });

  socket.on('req-data', payload => {
    io.emit('req-data', payload);
  });

  socket.on('save-status', payload => {
    io.emit('save-status', payload);
  });
});
