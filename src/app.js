
const express = require("express");
const app = express();
const connectToDb = require("./config/database");
const User = require("./models/user"); 
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieparser());

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({ email: req.body.email });
    if (users.length === 0) {
      return res.status(404).send("No user found with that email.");
    }
    res.json(users);
  } catch (err) {
    res.status(500).send("Something went wrong.");
  }
});

app.delete("/users/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    res.send("Deleted successfully.");
  } catch (err) {
    res.status(500).send("Something went wrong.");
  }
});

connectToDb()
  .then(() => {
    console.log("Connected successfully");
    app.listen(4000, () => {
      console.log("Server running on port 4000");
    });
  })
  .catch((err) => {
    console.log("Connection failed:", err); 
  });
