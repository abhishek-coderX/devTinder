const mongoose=require('mongoose')

const connectRequestSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"  
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
         ref:"User"  
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:['ignored','interested','accepted','rejected'],
            message:`{VALUE} is incorrect status type`
        }
    }
},
{
    timestamps:true
}
)

connectRequestSchema.index({fromUserId:1,toUserId:1})

connectRequestSchema.pre("save", function (next) {
  if (this.fromUserId.toString() === this.toUserId.toString()) {
    throw new Error("Cannot send connection request to yourself");
  }
  next();
});


module.exports = new mongoose.model("ConnectionRequest",connectRequestSchema)
