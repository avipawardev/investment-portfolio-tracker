import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import EvolveLogo from "../assets/EvolveLogo.png";

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/stocks", label: "Stocks" },
    { path: "/crypto", label: "Crypto" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/about", label: "About" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm py-4 px-6 flex items-center justify-between">
      <div>
        <img className="w-32" src={EvolveLogo} alt="Logo" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 border-2 p-4 rounded-full bg-[#1a0532]">
        {navLinks.map(link => (
          <Link key={link.path} to={link.path} className="text-gray-300 hover:text-white transition">
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 p-4">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="block py-2 text-gray-300 hover:text-white transition"
              onClick={() => setShowMobileMenu(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* User Auth Section */}
      <div className="flex items-center gap-4">
        {currentUser ? (
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 text-white"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                {currentUser.email ? currentUser.email[0].toUpperCase() : 'U'}
              </div>
              <span className="hidden md:inline">{currentUser.email}</span>
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link 
            to="/login" 
            className="bg-[#3ffe8c] px-6 py-2 rounded-full text-white hover:bg-green-600 transition"
          >
            Sign In
          </Link>
        )}
        {/* Mobile Hamburger */}
      <button 
        className="md:hidden text-white"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      </div>
    </nav>
  );
};

export default Navbar;