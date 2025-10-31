const Otp = require("../model/Otp");
const express = require("express");
const router = express.Router();
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const User = require("../model/userModel");
const bcrypt = require('bcrypt');
dotenv.config();

// ✅ Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  // Delete old OTPs for same email
  await Otp.deleteMany({ email });

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

  const newOtp = new Otp({ email, otp, expiresAt });
  await newOtp.save();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code (Valid for 10 Minutes)",
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (err) {
    console.error("Mail error:", err);
    res.json({ success: false, message: "Failed to send OTP!" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const record = await Otp.findOne({ email });

  if (!record) {
    return res.json({
      success: false,
      message: "No OTP found. Please request again.",
    });
  }

  if (new Date() > record.expiresAt) {
    await Otp.deleteOne({ _id: record._id });
    return res.json({
      success: false,
      message: "OTP expired. Please request again.",
    });
  }

  if (record.otp === otp) {
    await Otp.deleteOne({ _id: record._id });
    return res.json({ success: true, message: "OTP verified successfully!" });
  } else {
    return res.json({ success: false, message: "Invalid OTP!" });
  }
});

router.post("/forgot-password/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({success : false ,   message: "User not found" });
    }

    if (!user.password) {
      return res.status(400).json({success : false ,  message: "Please complete signup first" });
    }
    // Delete old OTPs for same email
    await Otp.deleteMany({ email });

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

    const newOtp = new Otp({ email, otp, expiresAt });
    await newOtp.save();

    await transporter.sendMail({
      from : process.env.EMAIL_USER, 
      to: email,
      subject: "Reset Password OTP",
      text: `Your OTP to reset your password is ${otp}. Valid for 10 minutes.`,
    });

    res.json({ success : true ,   message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error sending forgot password OTP:", error);
    res.status(500).json({ success : false ,  message: "Error sending OTP" });
  }
});

// Verify OTP and reset password
router.post('/forgot-password/verify-otp', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await Otp.findOne({ email });

    if (!user) {
      return res.status(404).json({success : false ,   message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({success : false ,   message: 'Invalid OTP' });
    }

    if (Date.now() > user.expiresAt) {
       await Otp.deleteOne({ _id: user._id });
       return res.status(400).json({ success : false ,  message: 'OTP expired' });
      }
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await   User.findOneAndUpdate({email} , {password : hashedPassword})
      await Otp.deleteOne({ _id: user._id });
    res.json({ success : true ,  message: 'Password has been reset successfully! 🎉' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ success : false ,  message: 'Error resetting password' });
  }
});

module.exports = router;
