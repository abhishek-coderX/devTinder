const validator = require("validator");


const validateSignupData = (req) => {
  const { firstName, lastName, email, password, about, skills } = req.body;

  if (!firstName || !email || !password || !skills) {
    throw new Error("Missing required fields");
  }

  if (firstName.trim().length < 3) {
    throw new Error("First name must be at least 3 characters long");
  }

  if (lastName && lastName.trim().length < 3) {
    throw new Error("Last name must be at least 3 characters long");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  if (about && about.length > 250) {
    throw new Error("About should not exceed 250 characters");
  }

  if (!Array.isArray(skills) || skills.length < 1) {
    throw new Error("At least one skill is required");
  }

  if (skills.length > 10) {
    throw new Error("Maximum 10 skills allowed");
  }
};


const validateProfileEditData = (req) => {
  const {
    firstName,
    lastName,
    about,
    skills,
    age,
    gender,
    email,
    photoUrl,
  } = req.body;

  const allowedFieldsData = [
    "firstName",
    "lastName",
    "about",
    "skills",
    "age",
    "gender",
    "email",
    "photoUrl",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedFieldsData.includes(field)
  );
  if (!isEditAllowed) {
    throw new Error("Invalid fields in profile update");
  }

  if (about && about.length > 250) {
    throw new Error("About should not exceed 250 characters");
  }

  if (skills) {
    if (!Array.isArray(skills) || skills.length < 1) {
      throw new Error("At least one skill is required");
    }
    if (skills.length > 10) {
      throw new Error("Maximum 10 skills allowed");
    }
  }

  if (firstName && firstName.trim().length < 3) {
    throw new Error("First name must be at least 3 characters long");
  }

  if (lastName && lastName.trim().length < 3) {
    throw new Error("Last name must be at least 3 characters long");
  }

  if (email && !validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }

  if (photoUrl && !validator.isURL(photoUrl)) {
    throw new Error("Invalid photo URL");
  }
};

module.exports = { validateSignupData, validateProfileEditData };
