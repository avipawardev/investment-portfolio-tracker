import React, { useState, useEffect } from 'react';
import { fetchTopStocks } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadStocks = async () => {
      const stockData = await fetchTopStocks();
      setStocks(stockData);
      setLoading(false);
    };

    loadStocks();
  }, []);

  const addToPortfolio = async (stock) => {
    if (!currentUser) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      const stockRef = ref(db, `users/${currentUser.uid}/assets/${Date.now()}`);
      await set(stockRef, {
        name: stock.name,
        symbol: stock.symbol,
        quantity: 1,
        price: stock.price,
        type: 'stock'
      });
      alert(`${stock.name} added to your portfolio!`);
    } catch (error) {
      console.error("Error adding to portfolio:", error);
      alert("Error adding to portfolio. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 flex justify-center items-center">
        <div className="text-white">Loading stocks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-6">
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
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Top Stocks</h1>
        <div className="bg-gray-800 p-6 rounded-lg mt-20">
          {stocks.map(stock => (
            <div key={stock.symbol} className="flex justify-between items-center py-3 border-b border-gray-700">
              <div>
                <h3 className="text-white font-medium">{stock.symbol}</h3>
                <p className="text-gray-400 text-sm">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="text-white">${stock.price.toFixed(2)}</p>
                <p className={`text-xs ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.change >= 0 ? '↑' : '↓'} {Math.abs(stock.change)}%
                </p>
                <button 
                  onClick={() => addToPortfolio(stock)}
                  className="mt-1 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  Add to Portfolio
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stocks;