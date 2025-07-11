const express=require("express")
const User = require("./models/user");
const {validateSignupData} =require("../utils/validation")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");

const authRouter=express.Router()


authRouter.post("/signup", async (req, res) => {
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


authRouter.post("/login",async(req,res)=>{
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




module.exports=authRouter