const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("email or password is incorrect");
    }

    const decodedObj = jwt.verify(token, "JWTSECRET");
    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("email or password is incorrect");
    }
    
    req.user = user; 
    next();
  } catch (error) {
    res.status(400).send("email or password is incorrect");
  }
}; 

module.exports = userAuth;
