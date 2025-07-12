const mongoose=require('mongoose')

const connectRequestSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
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
