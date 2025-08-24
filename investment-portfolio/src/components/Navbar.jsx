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

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm py-4 px-6 flex items-center justify-between">
      <div>
        <img className="w-32" src={EvolveLogo} alt="Logo" />
      </div>

      <div className="hidden md:flex items-center justify-center gap-6">
        <Link to="/" className="text-gray-300 hover:text-white transition duration-300">Home</Link>
        <Link to="/stocks" className="text-gray-300 hover:text-white transition duration-300">Stocks</Link>
        <Link to="/crypto" className="text-gray-300 hover:text-white transition duration-300">Crypto</Link>
        <Link to="/dashboard" className="text-gray-300 hover:text-white transition duration-300">Dashboard</Link>
        <Link to="/about" className="text-gray-300 hover:text-white transition duration-300">About</Link>
      </div>

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
            className="bg-green-500 px-6 py-2 rounded-full text-white hover:bg-green-600 transition duration-300"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;