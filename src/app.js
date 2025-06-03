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

app.patch('/users',async (req,res)=>{
    const email=req.body.email
    const updateData=req.body

    try {
        const user=await User.findOneAndUpdate(email,updateData)
        res.send("user data updated successfully")

    } catch (error) {
            res.status(401).send("something went wrong" + err.message);

    }
})

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
