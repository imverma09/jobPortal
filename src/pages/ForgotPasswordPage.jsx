import React, { useState } from "react";
import { Mail, ArrowLeft, Send, CheckCircle, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { BACKEND_API, showError, showSuccess } from "../backendApi";
export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: Success, 3: Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      return showError("Please enter your email address !");
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        `${BACKEND_API}/api/user/forgot-password/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (data.success) {
        showSuccess(data.message || "OTP sent to your email!");
        setStep(2);
      } else {
        showError(data.message || "Failed to send OTP!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      showError("Passwords do not match!");
      return;
    }
    try {
      setIsLoading(true)
      const res = await fetch(
        `${BACKEND_API}/api/user/forgot-password/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, newPassword }),
        }
      );
      const data = await res.json();
      if (data.success) {
        showSuccess(data.message || "Password has been reset successfully! 🎉");
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        showError(data.message || "Invalid OTP !");
      }
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE6E3] via-[#DADAD9] to-[#EDE6E3] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#36382E] mb-2">
            {step === 1 && "Forgot Password?"}
            {step === 2 && "Check Your Email"}
            {step === 3 && "Reset Password"}
          </h1>
          <p className="text-[#36382E]/70">
            {step === 1 && "No worries, we'll send you reset instructions"}
            {step === 2 && "We sent a password reset link to your email"}
            {step === 3 && "Enter your new password below"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#DADAD9]">
          {/* Step 1: Enter Email */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-[#5BC3EB]/10 rounded-full flex items-center justify-center border-2 border-[#5BC3EB]">
                  <Mail className="h-10 w-10 text-[#5BC3EB]" />
                </div>
              </div>

              <div>
                <form onSubmit={handleSendEmail} className="">
                  <label className="block text-[#36382E] font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative mb-3">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#36382E]/50" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#5BC3EB] text-[#36382E] py-3 rounded-lg font-bold transition-all hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2"
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
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Otp</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-[#36382E]/70 hover:text-[#5BC3EB] font-medium inline-flex items-center space-x-2 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </div>
          )}

          {/* Step 2: Email Sent Success */}
          {step === 2 && (
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-[#5BC3EB]/10 rounded-full flex items-center justify-center border-2 border-[#5BC3EB] animate-pulse">
                  <CheckCircle className="h-10 w-10 text-[#5BC3EB]" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[#36382E]">
                  We've sent a password reset link to
                </p>
                <p className="text-[#5BC3EB] font-bold text-lg">{email}</p>
                <p className="text-[#36382E]/70 text-sm">
                  Click the link in the email to reset your password. If you
                  don't see it, check your spam folder.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full bg-[#5BC3EB] text-[#36382E] py-3 rounded-lg font-bold transition-all hover:shadow-lg transform hover:scale-105"
                >
                  I Have the Code
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-sm text-[#36382E]/70">
                <span>Didn't receive the email?</span>
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="text-[#5BC3EB] hover:underline font-medium flex gap-2 justify-center items-center"
                >
                  {isLoading ? <span>Sending...</span> : "Resend OTP"}
                </button>
              </div>

              <div className="pt-4 border-t border-[#DADAD9]">
                <Link
                  to="/login"
                  className="text-[#36382E]/70 hover:text-[#5BC3EB] font-medium inline-flex items-center space-x-2 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </div>
          )}

          {/* Step 3: Reset Password */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-[#F06449]/10 rounded-full flex items-center justify-center border-2 border-[#F06449]">
                  <Lock className="h-10 w-10 text-[#F06449]" />
                </div>
              </div>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors text-center text-xl tracking-widest font-bold"
                  maxLength="6"
                />
              </div>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#36382E]/50" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#36382E] font-medium mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#36382E]/50" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#EDE6E3] text-[#36382E] outline-none border-2 border-[#DADAD9] focus:border-[#5BC3EB] transition-colors"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetPassword}
                className="w-full flex justify-center items-center gap-1 cursor-pointer bg-[#F06449] text-white py-3 rounded-lg font-bold transition-all hover:shadow-lg transform hover:scale-105"
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
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    {/* <Send className="h-5 w-5" /> */}
                    <span>Reset Password </span>
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-[#36382E]/70 hover:text-[#5BC3EB] font-medium inline-flex items-center space-x-2 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
