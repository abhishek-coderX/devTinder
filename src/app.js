const express=require('express')
const app=express()


app.get('/users', (req,res)=>{
    res.send({firstname:'Abhishek', lastname:"Pal"})
})

app.post('/users',(req,res)=>{
    console.log("Heloo post man post kar do");
    res.send('postman ji post')
})
app.patch('/users',(req,res)=>{
    console.log("Heloo post man post kar do");
    res.send('patcht')
})

app.use('/test',(req,res)=>{
    res.send("hello ji server se")
})

app.use('/hello/2',(req,res)=>{
    res.send("ABRACADABRA")
})
app.use('/hello',(req,res)=>{
    res.send("hello")
})



app.listen(4000,()=>{
    console.log("server running");
})
