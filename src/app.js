const express = require("express");
const app = express();
const connectToDb = require("./config/database");
const User = require("./models/user"); 
const cookieparser = require("cookie-parser");


app.use(express.json());
app.use(cookieparser());

//import karo routers
const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const requestRouter=require('./routes/requests');
const userRouter=require("./routes/user")

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use('/',userRouter)


connectToDb()
  .then(() => {
    console.log("Connected successfully");
    app.listen(4000, () => {
      console.log("Server running on port 4000");
    });
  })
  .catch((err) => {
    console.log("Connection failed:", err); 
  });
