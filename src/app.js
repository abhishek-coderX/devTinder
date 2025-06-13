const express = require("express");
const app = express();
const connectToDb = require("./config/database");
const User = require("./models/user");
const { model } = require("mongoose");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("success");
  } catch (error) {
    res.status(400).send("error saving the data" + error.message);
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
    if(!user)
{
    return res.status(404).send("user not find")
}

res.send("deleted successfully")

  } catch (err) {
    res.status(401).send("something went wrong" + err.message);
  }
});

app.patch('/users/:userId', async (req, res) => {
  const userId = req.params?.userId;
  const updateData = req.body;
  
  
  try {
    const ALLOWED_UPDATES=[
    "userId",
    "photoUrl",
    "about",
    "gender",
    "age",
    "skills",

  ]

  const isUpdateAllowed=Object.keys(updateData).every((k)=>ALLOWED_UPDATES.includes(k))

  if(!isUpdateAllowed)
  {
    throw new Error("Update is not allowed")
  }

  if(updateData?.skills.length>10)
  {
    throw new Error("Skills cannot be more than  10")
  }
    const user = await User.findOneAndUpdate(
      { _id: userId},   
      updateData,        
      { new: true, runValidators: true }  
    );



    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User data updated successfully");
  } catch (error) {
    res.status(401).send("something went wrong: " + error.message);
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
