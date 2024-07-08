import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  };

// ! login user

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Does not Exist" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ success: true, message: "Invalid password" });
    }
    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ! register user

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //? Check if user already registered
    const exists = await userModel.findOne({ email: email });
    if (exists) {
      return res.json({ success: false, message: "User already registered" });
    }

    //? validate email and password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 8 characters long",
        });
    }

    
    //? hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({ success: true, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { login, register };
