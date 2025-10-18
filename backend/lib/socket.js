import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

//userId:socketid .so on providing with the receiver id we will get their socket id
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users - stores all the users that comes
const userSocketMap = {}; // {userId: socketId}
const groupMap = {};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  //this is getting from the client:specificallly from the client with the give {socketid} 
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  //Group creation 
  socket.on('join room', (room) => {
    socket.join(room);
  });
  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };