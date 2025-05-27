const express=require('express')
const app=express()

app.use('/test',(req,res)=>{
    res.send("hello ji server se")
})



app.listen(4000,()=>{
    console.log("server running");
})
