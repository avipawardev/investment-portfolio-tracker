import React from "react";
import { motion } from "framer-motion";
import StocksList from "./StocksList";
import CryptoList from "./CryptoList";
import { useAuth } from "../context/AuthContext";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import About from "./About";

const Home = () => {
  const { currentUser } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = React.useState(false);

  const addToPortfolio = async (asset) => {
    if (!currentUser) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      const assetRef = ref(db, `users/${currentUser.uid}/assets/${Date.now()}`);
      await set(assetRef, {
        name: asset.name,
        symbol: asset.symbol,
        quantity: 1,
        price: asset.price,
        type: asset.type || 'stock'
      });
      alert(`${asset.name} added to your portfolio!`);
    } catch (error) {
      console.error("Error adding to portfolio:", error);
      alert("Error adding to portfolio. Please try again.");
    }
  };

  // Use your specific phone image URL
  const mobileAppImage = "https://cdn.prod.website-files.com/649412cd35852fa073a7748d/67d7fa085b49f5dd759f134e_hero.png";
  const dashboardImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {showLoginPrompt && (
        <div className="fixed top-20 right-6 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50">
          Please log in to add assets to your portfolio.
          <button 
            className="ml-4 text-white font-bold"
            onClick={() => setShowLoginPrompt(false)}
          >
            ×
          </button>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight font-[Gilroy-Heavy]">
                YOUR<br />FINANCIAL<br />
                SUPERPOWER
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                All your investments in one app. Make smarter decisions like the world's
                top investors, and track your journey to success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
                  Download for free
                </button>
                <button className="border border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-full transition duration-300">
                  Learn More
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-6 max-w-md">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">100k+</h3>
                  <p className="text-gray-400 text-sm">assets supported</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">$20BN</h3>
                  <p className="text-gray-400 text-sm">assets tracked</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">5M+</h3>
                  <p className="text-gray-400 text-sm">users</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <img 
                src={mobileAppImage} 
                alt="Mobile app" 
                className="w-80 h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-16 px-6 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-gray-900 p-8 rounded-2xl shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-gray-400 text-sm">Main portfolio</h2>
                <h3 className="text-3xl font-bold text-white">$19,606.51</h3>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                +2.36%
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-2">Portfolio</h4>
                <div className="space-y-1">
                  <p className="text-white">BTC</p>
                  <p className="text-white">TSLA</p>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-2">SPY</h4>
                <p className="text-white">108.20</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-2">BTC</h4>
                <p className="text-red-400">-2.56%</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-2">DIRECT</h4>
                <p className="text-white">Earnings Q3</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-2">Financial</h4>
                <p className="text-white">Statement</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-white text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Less math, more magic
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Link what you love</h3>
                  <p className="text-gray-300">
                    Connect your favorite wallets, exchanges, and accounts in seconds. Our platform supports nearly every platform, so you can track all your investments in one place—no hassle, just clarity.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Stay ahead</h3>
                  <p className="text-gray-300">
                    From custom notifications to in-depth insights, stay informed about market shifts and portfolio changes in real time. Never miss an opportunity or a critical upside, no matter where you are.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Master your portfolio</h3>
                  <p className="text-gray-300">
                    Take control with powerful tools to monitor performance, identify trends, and see the bigger picture. From a single app, gain the confidence to make smarter, data-driven decisions.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Uncover new horizons</h3>
                  <p className="text-gray-300">
                    Explore what's moving, dive into market trends, and uncover hidden opportunities. Our platform helps you spot the next big move and make informed decisions for a brighter financial future.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-10">
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 text-sm">
                  Connect Accounts
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 text-sm">
                  Stay Informed
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 text-sm">
                  Track Smarter
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <img 
                src={dashboardImage} 
                alt="Dashboard preview" 
                className="rounded-xl shadow-2xl max-w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-20 px-6 bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Download for free
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join millions of users who trust our platform to manage their investments
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center gap-6 mb-16"
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
              Download for free
            </button>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center p-6 bg-gray-900 rounded-lg">
              <h3 className="text-2xl font-bold text-white">100k+</h3>
              <p className="text-gray-400">assets supported</p>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded-lg">
              <h3 className="text-2xl font-bold text-white">$20BN</h3>
              <p className="text-gray-400">assets tracked</p>
            </div>
            <div className="text-center p-6 bg-gray-900 rounded-lg">
              <h3 className="text-2xl font-bold text-white">5M+</h3>
              <p className="text-gray-400">users</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Data Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Explore Market Data
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Stocks</h3>
              <StocksList onAddToPortfolio={addToPortfolio} />
            </motion.div>
            
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">Cryptocurrencies</h3>
              <CryptoList onAddToPortfolio={addToPortfolio} />
            </motion.div>
          </div>
        </div>
      </section>
      <About />
    </div>
  );
};

export default Home;