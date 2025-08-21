import React from "react";
import CryptoList from "./CryptoList";
import StocksList from "./StocksList";


const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-white mb-8">YOUR FINANCIAL SUPERPOWER</h1>
        <p className="text-xl text-gray-300 text-center mb-12">
          All your investments in one app. Make smarter decisions like the world's
          top investors, and track your journey to success with Delta!
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Stocks</h2>
            <StocksList />
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-4">Cryptocurrencies</h2>
            <CryptoList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;