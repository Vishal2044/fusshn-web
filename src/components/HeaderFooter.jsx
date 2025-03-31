import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import logoImage from "../assets/fusshn-logo.png";
import searchIcon from "../assets/search.png";
import playstore from "../assets/playstore.png";
import appstore from "../assets/appstore.png";
import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../helper/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const Header = ({ city, setCity }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // City dropdown state
  const [logoutDropdownOpen, setLogoutDropdownOpen] = useState(false); // Logout dropdown state
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state
  const [logoutClickCount, setLogoutClickCount] = useState(0); // Tracks logout clicks
  const dropdownRef = useRef(null); // Ref for city dropdown
  const menuRef = useRef(null); // Ref for mobile menu
  const navigate = useNavigate();
  const { user } = useAuth();
  const cities = ["All", "Delhi", "Gurugram", "Bangalore"]; // List of cities

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      setLogoutDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between p-4 bg-black">
      {/* Logo and mobile menu toggle */}
      <div className="flex justify-between items-center w-full md:w-auto">
        <img
          src={logoImage}
          alt="FUSSHN Text Logo"
          className="h-12 cursor-pointer"
          onClick={() => navigate("/home")} // Navigate to home on logo click
        />
        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)} // Toggle mobile menu
        >
          {menuOpen ? <IoClose size={24} /> : <TiThMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-[70px] right-0 bg-gray-800 rounded shadow-lg z-10 p-4 w-3/4"
        >
          <a
            href="#"
            className="block text-white mb-2"
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            List Your Event
          </a>
          <a
            href="#"
            className="block text-white mb-2"
            onClick={() => setMenuOpen(false)} // Close menu on click
          >
            Contact Us
          </a>
          {!user ? (
            <button
              className="block bg-green-600 px-4 py-2 rounded text-white w-full"
              onClick={() => {
                setMenuOpen(false);
                navigate("/login"); // Navigate to login
              }}
            >
              Sign In
            </button>
          ) : (
            <div className="text-white">
              <p>{user.email.split("@")[0]}</p>
              <button
                className="block bg-red-600 px-4 py-2 rounded text-white w-full mt-2"
                onClick={handleLogout} // Logout user
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Desktop menu and search */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
        {/* City dropdown */}
        <div className="relative w-full md:w-auto" ref={dropdownRef}>
          <span
            className="flex items-center justify-between cursor-pointer text-white bg-gray-800 px-4 py-2 rounded md:bg-transparent md:px-0 md:py-0"
            onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle city dropdown
          >
            {city} <IoIosArrowDown className="ml-3" />
          </span>
          {dropdownOpen && (
            <div className="absolute top-[50px] left-0 bg-gray-800 rounded shadow-lg z-10 w-full md:w-auto">
              {cities.map((cityOption) => (
                <div
                  key={cityOption}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setCity(cityOption); // Set selected city
                    setDropdownOpen(false); // Close dropdown
                  }}
                >
                  {cityOption}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search for Events, Workshop"
            className="p-2 pl-10 bg-gray-900 text-white bg-opacity-90 backdrop-blur-md w-full md:w-[300px] rounded-md"
          />
          <img
            src={searchIcon}
            alt="Search Icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          />
        </div>
      </div>

      {/* Desktop user menu */}
      <div className="hidden md:flex items-center space-x-4">
        <a href="#" className="text-white cursor-pointer">
          List Your Event
        </a>
        <a href="#" className="text-white cursor-pointer">
          Contact Us
        </a>
        {!user ? (
          <button
            className="bg-green-600 px-4 py-2 rounded cursor-pointer"
            onClick={() => navigate("/login")} // Navigate to login
          >
            Sign In
          </button>
        ) : (
          <div className="relative z-10">
            <button
              className="bg-gray-800 px-4 py-2 rounded cursor-pointer text-white flex items-center"
              onClick={() => setLogoutDropdownOpen(!logoutDropdownOpen)} // Toggle logout dropdown
            >
              {user.email.split("@")[0]} <IoIosArrowDown className="ml-2" />
            </button>
            {logoutDropdownOpen && (
              <div
                className="absolute right-0 mt-2 bg-gray-800 rounded shadow-lg"
                onMouseDown={(e) => e.stopPropagation()} // Prevent closing on click
              >
                <button
                  className="block px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
                  onClick={async () => {
                    setLogoutDropdownOpen(false);
                    setTimeout(async () => {
                      setLogoutClickCount(logoutClickCount + 1);
                      await handleLogout(); // Logout user
                      navigate("/login"); // Redirect to login
                    }, 100);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export const Footer = () => (
  <footer className="bg-black p-8 sm:p-20">
    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
      <div className="md:w-2/5">
        <h3 className="text-4xl font-bold uppercase">FUSSHN</h3>
        <p className="mt-4 text-sm">
          Buy, sell, and discover tickets effortlessly! From concerts to sports
          and theatre, Fusshn makes event ticketing seamless, secure, and fast.
          Browse, compare, and grab the best deals.
        </p>
        <div className="mt-6 space-x-3">
          <img
            src={playstore}
            alt="Google Play Store"
            className="inline-block"
          />
          <img src={appstore} alt="Apple App Store" className="inline-block" />
        </div>
      </div>

      {/* Footer links */}
      <div className="md:w-3/5 lg:mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-lg font-bold">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#">Event</a>
            </li>
            <li>
              <a href="#">List your Event</a>
            </li>
            <li>
              <a href="#">Our Team</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Resource</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Customer Support</a>
            </li>
            <li>
              <a href="#">Purchase & Refund</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Social Links</h3>
          <div className="mt-4 space-x-4">
            <a href="#">
              <img
                src={instagram}
                alt="Instagram"
                className="w-6 h-6 inline-block"
              />
            </a>
            <a href="#">
              <img
                src={facebook}
                alt="Facebook"
                className="w-6 h-6 inline-block"
              />
            </a>
            <a href="#">
              <img
                src={twitter}
                alt="Twitter"
                className="w-6 h-6 inline-block"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-8 text-center text-sm">
      <hr className="border-gray-700 mb-4" />
      <p>© 2024 Copyright by Agency Solutions. All rights reserved.</p>
    </div>
  </footer>
);
