const express = require("express");
const userAuth = require("../middlewares/Auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const connectionRequest = require("../models/connectionRequest");
const user_safe_data = "firstName age gender photoUrl about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", user_safe_data);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", user_safe_data)
      .populate("toUserId",user_safe_data)

    const data= connectionRequest.map((row)=>{
        if(row.fromUserId._id.toString() === loggedInUser._id.toString())
            {
                return row.toUserId
            }
            else{
                return row.fromUserId
            }
        
    })

    res.json({ data });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = userRouter;
