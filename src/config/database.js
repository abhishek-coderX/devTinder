const mongoose=require('mongoose')

const connectToDb=async ()=>{
    await mongoose.connect("mongodb://localhost:27017/DevTinder")
}


module.exports=connectToDb