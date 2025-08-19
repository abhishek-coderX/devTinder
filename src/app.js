const http = require('http');
const { initializeSocket } = require('./socket/socket');
const express = require("express");
const connectToDb = require("./config/database");
const User = require("./models/user"); 
const cookieparser = require("cookie-parser");
const cors=require("cors")
const dotenv=require("dotenv")


const app = express();
const server = http.createServer(app);

dotenv.config()
const PORT=process.env.PORT || 4000

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: ["http://localhost:5173",
      "https://frontend-neon-iota.vercel.app"
    ],
    credentials: true,
  })
);




//import karo routers
const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const requestRouter=require('./routes/requests');
const userRouter=require("./routes/user")
const chatRouter = require("./routes/chat"); 

app.use('/', chatRouter);
app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use('/',userRouter)



initializeSocket(server);

connectToDb()
  .then(() => {
    console.log("Connected successfully");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Connection failed:", err); 
  });

