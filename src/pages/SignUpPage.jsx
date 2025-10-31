import React, { useState } from "react";
import axios from "axios";
import { BACKEND_API , showError , showSuccess } from "../backendApi";
import {
  Briefcase,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Building2,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState("jobseeker");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [otpSend, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerify , setOtpVerify] = useState(false)

  const verifyOtp = async () => {
    const res = await fetch(`${BACKEND_API}/api/user/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email, otp }),
    });

    const data = await res.json();
    if (data.success) {
      showSuccess("OTP Match successful!");
      setOtpSent(false);
      setOtpVerify(true)
    } else {
      showError("Invalid OTP !")
      // alert("!");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerify) {
      return showError("plz verify your Email ID !")
    }
    try {
      const res = await axios.post(`${BACKEND_API}/api/users/register`, {...formData , userType});
      showSuccess(res.data.message);
      setFormData({fullName: "",email: "",password: "",confirmPassword: "",company: "",})
    } catch (error) {
      console.log(error)
      showError(error.response?.data?.message || "Error submitting form");
    }
  };

  const sendOtp = async () => {
    if (formData.email.trim() === "") {
      return showError("Enter Email !");
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_API}/api/user/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (data.success) {
        showSuccess("OTP sent to your email!");
        setOtpSent(true);
      } else {
        showError("Failed to send OTP!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (otpSend) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-sm text-center transform transition-all hover:scale-[1.02] duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            🔐 Verify OTP
          </h2>
          <p className="text-gray-600 mb-6">
            A verification code was sent to <br />
            <span className="font-medium text-gray-800">{formData.email}</span>
          </p>

          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-lg p-3 mb-5 text-center tracking-widest text-lg"
          />

          <button
            onClick={verifyOtp}
            className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200"
          >
            Verify OTP
          </button>

          <p className="text-sm text-gray-500 mt-5">
            Didn’t receive the code?{" "}
            <button
              onClick={sendOtp}
              className="text-blue-600 hover:underline font-medium"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                    ></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                "Resend OTP"
              )}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE6E3] via-[#DADAD9] to-[#EDE6E3] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#36382E] mb-2">
            Create Account
          </h1>
          <p className="text-[#36382E]/70">
            Join us and start your career journey
          </p>
        </div>

      <form onSubmit={handleSubmit}>

        {/* Sign Up Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#DADAD9]">
          {/* User Type Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setUserType("jobseeker")}
              className={`p-4 rounded-lg border-2 transition-all ${
                userType === "jobseeker"
                  ? "border-[#5BC3EB] bg-[#5BC3EB]/10 text-[#36382E]"
                  : "border-[#DADAD9] bg-[#EDE6E3] text-[#36382E]/60"
              }`}
            >
              <User className="h-6 w-6 mx-auto mb-2" />
              <div className="font-bold text-sm">Job Seeker</div>
            </button>
            <button
              type="button"
              onClick={() => setUserType("employer")}
              className={`p-4 rounded-lg border-2 transition-all ${
                userType === "employer"
                  ? "border-[#F06449] bg-[#F06449]/10 text-[#36382E]"
                  : "border-[#DADAD9] bg-[#EDE6E3] text-[#36382E]/60"
              }`}
            >
              <Building2 className="h-6 w-6 mx-auto mb-2" />
              <div className="font-bold text-sm">Employer</div>
            </button>
          </div>

          {/* Google Sign In Button */}
          {/* <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center space-x-3 px-6 py-3 rounded-lg border-2 border-[#DADAD9] bg-white hover:bg-[#EDE6E3] transition-all mb-6"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-[#36382E] font-medium">Sign up with Google</span>
          </button> */}

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DADAD9]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#36382E]/60">
                Or sign up with email
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-[#36382E] font-medium mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#36382E]/50" />
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                />
              </div>
            </div>

            <label className="block text-[#36382E] font-medium mb-2">
              Email Address *
            </label>
            <div className="flex gap-1">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#36382E]/50" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                />
              </div>
              <button
                onClick={sendOtp}
                disabled={isLoading}
                className={`flex items-center justify-center gap-2 cursor-pointer active:scale-95 px-3 py-3 rounded-lg font-bold text-white transition-all hover:shadow-lg transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed ${
                  userType === "employer"
                    ? "bg-[#F06449] hover:bg-[#F06449]/90"
                    : "bg-[#5BC3EB] hover:bg-[#5BC3EB]/90"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                      ></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
{/* 
            <div>
              <label className="block text-[#36382E] font-medium mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#36382E]/50" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                />
              </div>
            </div> */}

            {userType === "employer" && (
              <div>
                <label className="block text-[#36382E] font-medium mb-2">
                  Company Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#36382E]/50" />
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company Inc."
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[#36382E] font-medium mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#36382E]/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#36382E]/50 hover:text-[#36382E]"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[#36382E] font-medium mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#36382E]/50" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  minLength={6}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#36382E]/50 hover:text-[#36382E]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {/* Terms & Conditions */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 h-4 w-4 rounded border-[#DADAD9] text-[#5BC3EB] focus:ring-[#5BC3EB]"
              />
              <label htmlFor="terms" className="text-sm text-[#36382E]/70">
                I agree to the{" "}
                <a href="#" className="text-[#5BC3EB] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#5BC3EB] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              // onClick={handleSubmit}
              className={`w-full py-3 rounded-lg font-bold text-white transition-all hover:shadow-lg transform hover:scale-105 ${
                userType === "employer"
                  ? "bg-[#F06449] hover:bg-[#F06449]/90"
                  : "bg-[#5BC3EB] hover:bg-[#5BC3EB]/90"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-[#36382E]/70">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-[#5BC3EB] hover:underline font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
</form>

      </div>
    </div>
  );
}
