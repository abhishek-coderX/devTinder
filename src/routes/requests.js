const express = require("express");
const userAuth = require("../middlewares/Auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    // Validate status
    const isAllowedStatus = ["ignored", "interested"];
    if (!isAllowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status field: " + status });
    }


    // Check if toUser exists
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if connection request already exists in any direction
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).json({ message: "Connection Request already exists!" });
    }

    // Create new request
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    // Send dynamic response
    let message;
if (status === "interested") {
  message = `${req.user.firstName} is interested in ${toUser.firstName}`;
} else if (status === "ignored") {
  message = `${req.user.firstName} ignored ${toUser.firstName}`;
}
    res.status(201).json({
      message,
      data,
    });

  } catch (error) {
    res.status(400).json({ message: "Error: " + error.message });
  }
});



module.exports = requestRouter;
