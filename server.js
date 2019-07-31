'use strict';

let cron = require('node-cron');

// DEPLOY STUFF:
// var app = require('express')();
// var server = require('http').Server(app);
// const io = require('socket.io')(server);
// server.listen(process.env.PORT);

const io = require('socket.io')(3016);

let arr = [];

io.on('connection', function(socket) {
  console.log(`Connection from: ${socket.id}`);

  // emit data
  socket.on('moisture-data', payload => {
    console.log(payload);
    let newPayload = payload;
    arr.push(newPayload);

    io.emit('moisture-data', payload);
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
  // }, 30000);

  socket.on('req-data', payload => {
    io.emit('req-data', payload);
  });

  socket.on('save-status', payload => {
    io.emit('save-status', payload);
  });
});
