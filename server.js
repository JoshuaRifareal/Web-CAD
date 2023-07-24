const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

// Socket.IO connections
io.on('connection', (socket) => {
  console.log('Socket.IO connected.');

  // Handle incoming drawing data
  socket.on('draw', (data) => {
    // Broadcast the drawing data to all connected clients
    socket.broadcast.emit('draw', data);
  });

  socket.on('disconnect', () => {
    console.log('Socket.IO disconnected.');
  });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);   
});
