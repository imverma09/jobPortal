const User = require("../model/userModel");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const Employer =   require("../model/employer");
dotenv.config();
const { authenticate } = require('../middleware/authMiddleware');
const employer = require("../model/employer");

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, company, userType } =
      req.body;

    if (!fullName || !email || !password || !confirmPassword)
      return res.status(400).json({ message: "All fields are required" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existingUser = await User.findOne({ email });
    if (existingUser)return res.status(400).json({ message: "Email already registered" });
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: newPassword,
      company,
      userType,
    });
    await newUser.save();
    // console.log(newUser)
    await Employer.create({
      userId : newUser._id,
      companyName : company || "",
    });
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if fields are filled
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email }, // payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: "2h" } // token expires in 2 hours
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        company: user.company,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.get("/userInfo", authenticate, async (req, res) => {
  try {
    const employerData = await Employer.findOne({ userId : req.userId });
    if(employerData){ 
      let data = await Employer.findOne({ userId : req.userId }).populate("userId" , "fullName email userType phone");
      return res.status(200).json({
        id: data.userId._id,
        fullName: data.userId.fullName,
        email: data.userId.email,
        userType: data.userId.userType,
        phone: data.userId.phone , 
        company : data.companyName,
        website : data.companyWebsite,
        about : data.about
      });

    }

    let data = await User.findOne({ _id: req.userId });
    
    if (!data) {
      return res.status(400).json({ error: "user not Found !" });
    }
    res.status(200).json({
      id: data._id,
      fullName: data.fullName,
      email: data.email,
      company: data.company,
      userType: data.userType,
      phone: data.phone
    });
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      return res.status(401).json({ error: "Token expired" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/logout", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (token) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
    }
    res.status(200).json({ message: "logout " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/updateProfile", authenticate, async (req, res) => {
  try {
    
    const { fullName, email, company, userType, phone , website , about } = req.body;
    const isEmployer = await Employer.findOne({ userId : req.userId });
    if(isEmployer){
      await User.findByIdAndUpdate(req.userId, {
        fullName,
        email,
        phone,
      });
      await Employer.findOneAndUpdate({ userId : req.userId }, { companyName : company , companyWebsite : website , about });
      return res.status(200).json({ message: "Profile updated successfully!" });
    }
    const user = await User.findByIdAndUpdate(req.userId, {
      fullName,
      email,
      company,
      userType,
      phone,
    });
    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
module.exports = router;
