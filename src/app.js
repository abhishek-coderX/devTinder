const express = require("express");
const app = express();
const connectToDb = require("./config/database");
const User = require("./models/user");
const { model } = require("mongoose");
const validator = require("validator");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    photoUrl,
    about,
    skills,
  } = req.body;

  try {
    //required Fields
    if (!firstName || !email || !password || !skills) {
      return res.status(400).send("Missing required fields");
    }

    //name check
    if (firstName.trim().length < 3) {
      return res
        .status(400)
        .send("First name must be at least 3 characters long");
    }

    //email check
    if (!validator.isEmail(email)) {
      return res.status(400).send("Invalid email format");
    }

    //password check
    if (password.length < 6) {
      return res.status(400).send("Password must be at least 6 characters");
    }

    //skills check
    if (!Array.isArray(skills) || skills.length < 1) {
      return res.status(400).send("At least one skill is required");
    }
    if (skills.length > 10) {
      return res.status(400).send("Maximum 10 skills allowed");
    }

    //existing user check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send("Email already exists");
    }

     const user = new User({
      firstName,
      lastName,
      email,
      password, 
      age,
      gender,
      photoUrl,
      about,
      skills,
    });

    await user.save();
    res.status(201).send("Signup successful");
  } catch (error) {
    res.status(500).send("error saving the data" + error.message);
  }
});

app.get("/users", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.send("error hai bhai galat input ");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(401).send("something went wrong" + err.message);
  }
});

app.delete("/users", async (req, res) => {
  const userId = req.body.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send("user not find");
    }

    res.send("deleted successfully");
  } catch (err) {
    res.status(401).send("something went wrong" + err.message);
  }
});

app.patch("/users/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const updateData = req.body;

  const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
  const isUpdateAllowed = Object.keys(updateData).every((k) =>
    ALLOWED_UPDATES.includes(k)
  );

  if (!isUpdateAllowed) {
    return res.status(400).send("Update contains disallowed fields.");
  }

  if (updateData?.skills && updateData.skills.length > 10) {
    return res.status(400).send("Skills cannot be more than 10.");
  }

  try {
    const user = await User.findOneAndUpdate({ _id: userId }, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User data updated successfully");
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message);
  }
});

connectToDb()
  .then(() => {
    console.log("connected successfully");

    app.listen(4000, () => {
      console.log("server running");
    });
  })
  .catch((err) => {
    console.log(unsuccessful);
  });
