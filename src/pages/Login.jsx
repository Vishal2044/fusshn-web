import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/login.png";
import logoImage from "../assets/fusshn-logo.png";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Login() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error messages
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to home page on successful login
    } catch {
      setError("Invalid email or password!"); // Display error message on login failure
    }
  };

  return (
    <div className="flex bg-gray-800 text-white items-center justify-center px-4 md:px-0 h-screen">
      <div className="bg-black h-auto md:h-[607px] rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl md:my-0 my-auto">
        {/* Left section with image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={loginImage}
            alt="Event"
            className="h-48 md:h-full w-full object-cover"
          />
        </div>
        {/* Right section with form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="text-center mb-6">
            <img src={logoImage} alt="FUSSHN Logo" className="mx-auto h-12" />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <form
            onSubmit={handleLogin}
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
            {/* Password input with toggle visibility */}
            <div className="relative">
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-[280px] lg:w-[350px] h-[45px] p-[12px_16px] rounded-[12px] border-[0.5px] bg-white border-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-5 top-9 text-black cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </div>
              <p className="absolute right-0 bottom-[-25px] text-green-600 text-sm cursor-pointer hover:underline">
                Forgot Password?
              </p>
            </div>
            {/* Submit button */}
            <button
              type="submit"
              className="w-full md:w-[380px] h-[45px] cursor-pointer mt-8 bg-green-500 text-white font-bold p-3 rounded-lg hover:bg-green-600 transition"
            >
              Submit
            </button>
          </form>
          {/* Link to sign-up page */}
          <p className="text-center mt-4 text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
