const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("email or password is incorrect");
    }

    const decodedObj = jwt.verify(token, "JWTSECRET");
    const { id } = decodedObj;

    const user = await User.findById(id);

    if (!user) {
      throw new Error("email or password is incorrect");
    }

    next();
  } catch (error) {
    res.status(400).send("email or password is incorrect");
  }
}; // ✅ You missed this bracket

module.exports = userAuth;
