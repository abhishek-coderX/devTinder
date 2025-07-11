const express=require('express')
const jwt=require('jsonwebtoken')
const userAuth = require("./middlewares/Auth");

const profileRouter=express.Router()

profileRouter.get("/profile", userAuth ,async (req,res)=>{
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


module.exports=profileRouter