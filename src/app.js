const express=require('express')
const app=express()

const {AdminAuth,UserAuth}=require('./middlewares/Auth')

app.use('/admin',AdminAuth)

app.get('/admin/alldata',(req,res)=>{
    res.send("admin accessed")
})

app.get('/admin/delete',(req,res)=>{
    res.send("admin delete accessed")
})

app.get('/user', UserAuth,(req,res)=>{
    res.send("user accessed")
})

app.get('/user/login',(req,res)=>{
    res.send("user logged in")
})


app.listen(4000,()=>{
    console.log("server running");
})


