
const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const userAuth = require("../middlewares/Auth.js"); 

router.get("/messages/:receiverId", userAuth, async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ createdAt: 1 }); 

    res.status(200).json(messages);

  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error while fetching messages" });
  }
});

module.exports = router;
