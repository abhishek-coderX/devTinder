const express=require('express')
const app=express()

app.get('/users/:name/:pass/:age',(req,res)=>{
    console.log(req.query)
    console.log(req.params)
    res.send("Hii i am funny routes ")
})



app.listen(4000,()=>{
    console.log("server running");
})
