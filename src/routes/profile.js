const express = require("express");
const userAuth = require("../middlewares/Auth");
const { validateProfileEditData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateProfileEditData(req);

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your Profile updated successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = profileRouter;
