const express = require("express");
const userAuth = require("../middlewares/Auth");
const { validateProfileEditData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

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

profileRouter.patch("/profile/password/edit", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Incorrect current password");
    }
    if (oldPassword === newPassword) {
      throw new Error("New password must be different from old password");
    }
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("New password is not strong enough");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });

    res.send("Password updated successfully. Please login again.");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});
profileRouter.patch("/profile/password/forgot", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      throw new Error("Email and new password are required");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email format");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Please enter a strong password");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("User with this email does not exist");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.send("Password reset successfully");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = profileRouter;
