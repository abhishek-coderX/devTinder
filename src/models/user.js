const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Fisrt Name is required"],
    trim: true,
    minLength: [3, "First name should be atleast 3 characters long"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minLength: [3, "First name should be atleast 3 characters long"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: "Gender must be male, female, or others",
    },
  },
  photoUrl: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  about: {
    type: String,
    default: "This is the default about of the user",
  },
  skills: {
    type: [String],
    required: true,
    minlength: [1, "Please provide at least one skill"],
  },

  
},{
    timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);
