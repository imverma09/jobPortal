const User = require('../model/userModel');
const express = require('express');
const router =  express.Router()
const bcrypt = require('bcrypt');
const dotenv = require("dotenv")
const jwt =  require("jsonwebtoken")
dotenv.config()

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, company , userType } = req.body;

    if (!fullName || !email || !password || !confirmPassword)
      return res.status(400).json({ message: "All fields are required" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });
    const salt =  await bcrypt.genSalt(10)
    const newPassword  = await bcrypt.hash(password , salt)
   
    const newUser = new User({ fullName, email, password : newPassword, company ,  userType });
    await newUser.save();

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
      return res.status(400).json({ message: "Email and password are required" });

    // Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email }, // payload
      process.env.JWT_SECRET,             // secret key
      { expiresIn: "2h" }                 // token expires in 2 hours
    );


 res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        company: user.company,
      },
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



module.exports = router