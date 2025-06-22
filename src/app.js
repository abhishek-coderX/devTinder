const express = require("express");
const app = express();
const connectToDb = require("./config/database");
const User = require("./models/user");
const { model } = require("mongoose");
const validator = require("validator");
const {validateSignupData}=require("./utils/validation")
const bcrypt=require("bcrypt")
const cookieparser=require("cookie-parser")
const jwt=require('jsonwebtoken');
const userAuth = require("./middlewares/Auth");

app.use(express.json());
app.use(cookieparser())

app.post("/signup", async (req, res) => {
  try {
    await validateSignupData(req);

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

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
      gender,
      photoUrl,
      about,
      skills,
    });

    await user.save();
    res.status(201).send("Signup successful");
  } catch (error) {
    res.status(400).send("Error saving the data: " + error.message);
  }
});


app.post("/login",async(req,res)=>{
  try {
    //email and password nikalo
    const {email,password}=req.body
    
    const user=await User.findOne({email}).select("+password")
    if(!user)
    {
      throw new Error("Email or password is invalid")
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)

    if(isPasswordValid)
    {  
      const token= await jwt.sign({_id:user._id},"JWTSECRET")
      res.cookie("token",token)
      res.send("Login Successful")
    }
    else{
      throw new Error("Email or password is invalid")
    }

    
  } catch (error) {
    res.status(400).send("Error saving the data: " + error.message);
  }
})

app.get("/profile", userAuth async (req,res)=>{
    const cookies=req.cookies
    const {token}=cookies
    //validate the token
    
    const decodeMessage= await jwt.verify(token,"JWTSECRET")
    console.log(decodeMessage)
    const {_id}=decodeMessage
    console.log(cookies)
    console.log(_id.user)
    res.send("Reading the cookies");
})


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
