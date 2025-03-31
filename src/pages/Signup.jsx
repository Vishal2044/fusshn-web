import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import signupImage from "../assets/login.png";
import logoImage from "../assets/fusshn-logo.png";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password visibility

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!"); // Error if passwords don't match
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Firebase signup
      navigate("/home"); // Redirect to home on success
    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use. Please use a different email."); // Specific error for duplicate email
      } else {
        setError(error.message || "Error creating account!"); // General error handling
      }
    }
  };

  return (
    <div className="flex bg-gray-800 text-white items-center justify-center px-4 md:px-0 h-screen">
      <div className="bg-black h-auto md:h-[607px] rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl md:my-0 my-auto">
        {/* Left section with image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={signupImage}
            alt="Signup"
            className="h-48 md:h-full w-full object-cover"
          />
        </div>
        {/* Right section with form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="text-center mb-6">
            <img src={logoImage} alt="FUSSHN Logo" className="mx-auto h-12" />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p> // Display error message
          )}
          <form
            onSubmit={handleSignup}
            className="space-y-4 relative justify-center items-center flex flex-col"
          >
            {/* Email input */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-[280px] lg:w-[350px] h-[45px] p-[12px_16px] rounded-[12px] border-[0.5px] bg-white border-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Password input with toggle */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-[280px] lg:w-[350px] h-[45px] p-[12px_16px] rounded-[12px] border-[0.5px] bg-white border-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute right-3 top-3 text-black cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </div>
              </div>
            </div>
            {/* Confirm password input with toggle */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-[280px] lg:w-[350px] h-[45px] p-[12px_16px] rounded-[12px] border-[0.5px] bg-white border-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute right-3 top-3 text-black cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </div>
              </div>
            </div>
            {/* Submit button */}
            <button
              type="submit"
              className="w-full md:w-[380px] cursor-pointer h-[45px] mt-8 bg-green-500 text-white font-bold p-3 rounded-lg hover:bg-green-600 transition"
            >
              Sign Up
            </button>
          </form>
          {/* Link to login page */}
          <p className="text-center mt-4 text-gray-400">
            Already have an account?{" "}
            <Link to="/" className="text-green-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
