
const { Server } = require("socket.io");
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const Message = require('../models/message');

const onlineUsers = new Map();

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Your frontend URL
      credentials: true,
    },
  });

  io.use((socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || '');
      const token = cookies.token;

      if (!token) {
        return next(new Error("Authentication Error: No token."));
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          // console.error("Socket Auth Error:", err.message);
          return next(new Error("Authentication Error: Invalid token."));
        }
        socket.user = decoded;
        next();
      });
    } catch (error) {
      next(new Error("Authentication Error"));
    }
  });

  io.on("connection", (socket) => {
    // console.log(`✅ User Connected: ${socket.user._id}`);
    
    // Set user as online
    onlineUsers.set(socket.user._id, socket.id);

    // CORRECTED: Broadcast the new list of online users to everyone
    io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));

    socket.on("sendMessage", async ({ receiverId, message }) => {
      try {
        const senderId = socket.user._id;
        const newMessage = await Message.create({
          sender: senderId,
          receiver: receiverId,
          content: message,
        });

        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          // Send the message to the specific receiver
          io.to(receiverSocketId).emit("receiveMessage", newMessage);
        }
      } catch (error) {
        console.error("Error in sendMessage:", error);
      }
    });

    socket.on("disconnect", () => {
      // console.log(`❌ User Disconnected: ${socket.user._id}`);
      onlineUsers.delete(socket.user._id);
      
      io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
    });
  });

  return io;
};

module.exports = { initializeSocket };