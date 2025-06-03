const express = require("express");
const app = express();
const connectToDb = require("./config/database");
const User = require("./models/user");

app.use(express.json())
app.post("/signup", async (req, res) => {
  const user=new User(req.body)
  try {
    await user.save();
    res.send("success");
  } catch (error) {
    res.status(400).send("error saving the data" + error.message)
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
