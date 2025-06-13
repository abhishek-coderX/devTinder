const validator = require("validator");

const validateSignupData = (req, res) => {
  const { firstName, lastName, email, password, about, skills } = req.body;

  if (!firstName || !email || !password || !skills) {
    return res.status(400).send("Missing required fields");
  }

  if (firstName.trim().length < 3) {
    return res.status(400).send("First name must be at least 3 characters long");
  }

  if (lastName && lastName.trim().length < 3) {
    return res.status(400).send("Last name must be at least 3 characters long");
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send("Invalid email format");
  }

  if (password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters");
  }

  if (about && about.length > 250) {
    return res.status(400).send("About should not exceed 250 characters");
  }

  if (!Array.isArray(skills) || skills.length < 1) {
    return res.status(400).send("At least one skill is required");
  }

  if (skills.length > 10) {
    return res.status(400).send("Maximum 10 skills allowed");
  }

  return null; // Everything is valid
};

module.exports = { validateSignupData }