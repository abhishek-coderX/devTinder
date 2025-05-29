const express=require('express')
const app=express()

app.use('/user',(req,res,next)=>{
    console.log("1st next ");
    
    next()
    console.log("1st ka next ke baad");
    // res.send("response1")

},(req,res,next)=>{
    console.log("2nd next hai ye");
    next()
    console.log("ye 2nd wala next ke baad");
    // res.send("2nd response")
    
},(req,res,next)=>{
console.log("3rd next hai tye");
// next()
console.log("aab baat last next hai ye ");
})



app.listen(4000,()=>{
    console.log("server running");
})


