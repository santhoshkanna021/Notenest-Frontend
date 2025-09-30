import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RightImg from "../assets/container.svg";
import Logo from "../assets/icon.svg";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(""); 
  const [otpSent, setOtpSent] = useState(false); 

  const generateOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    console.log("Generated OTP:", code);
    alert("OTP sent to " + email + ": " + code);
    setOtpSent(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpSent) {
      if (isSignup && (!name || !dob || !email)) {
        alert("Please fill all required fields before requesting OTP.");
        return;
      }
      if (!isSignup && !email) {
        alert("Please enter your email to receive OTP.");
        return;
      }
      generateOtp();
      return;
    }

    if (otp === generatedOtp) {
      if (isSignup) {
        console.log("Signup Data:", { name, dob, email, otp });
        alert("Signed up successfully! Redirecting...");
      } else {
        console.log("Signin Data:", { email, otp });
        alert("Signed in successfully! Redirecting...");
      }
      navigate("/homepage");

      // Reset form
      setName("");
      setDob("");
      setEmail("");
      setOtp("");
      setOtpSent(false);
      setGeneratedOtp("");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center  px-8 md:px-30 bg-white relative">
        {/* Logo */}
        <div className=" text-center md:text-start flex space-x-3 absolute top-3 left-5">
          <img src={Logo} alt="logo" className="h-6" />
          <h1 className="text-xl font-semibold">HD</h1>
        </div>

        <h2 className="text-3xl font-bold mt-30 text-center md:text-start md:mt-5">
          {isSignup ? "Sign Up" : "Sign In"}
        </h2>
        <p className="text-gray-500 mb-6 text-center md:text-start py-2">
          {isSignup
            ? "Sign up to enjoy the features of HD"
            : "Please login to continue to your account."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          {isSignup && (
            <>
              <div>
                <label className="block text-gray-600 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={otpSent}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  disabled={otpSent}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSent}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {otpSent && (
            <div>
              <label className="block text-gray-600 mb-1">OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={!email && !otpSent}
          >
            {otpSent ? (isSignup ? "Sign Up" : "Sign In") : "Send OTP"}
          </button>
        </form>

        <p className="text-sm mt-6 text-gray-600">
          {isSignup ? "Already have an account?" : "Need an account?"}{" "}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setOtpSent(false);
              setOtp("");
              setGeneratedOtp("");
              setName("");
              setDob("");
              setEmail("");
            }}
            className="text-blue-600 hover:underline"
          >
            {isSignup ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex w-1/2 bg-gray-900 items-center justify-center border rounded-l-2xl">
        <img
          src={RightImg}
          alt="background"
          className="w-full h-[560px] object-cover"
        />
      </div>
    </div>
  );
};

export default Auth;
