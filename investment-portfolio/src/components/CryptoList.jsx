import React, { useState, useEffect } from 'react';
import { fetchTopCrypto } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

const Crypto = () => {
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadCrypto = async () => {
      const cryptoData = await fetchTopCrypto();
      setCrypto(cryptoData);
      setLoading(false);
    };

    loadCrypto();
  }, []);

  const addToPortfolio = async (crypto) => {
    if (!currentUser) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      const cryptoRef = ref(db, `users/${currentUser.uid}/assets/${Date.now()}`);
      await set(cryptoRef, {
        name: crypto.name,
        symbol: crypto.symbol,
        quantity: 1,
        price: crypto.price,
        type: 'crypto'
      });
      alert(`${crypto.name} added to your portfolio!`);
    } catch (error) {
      console.error("Error adding to portfolio:", error);
      alert("Error adding to portfolio. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 flex justify-center items-center">
        <div className="text-white">Loading cryptocurrencies...</div>
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
        <h1 className="text-3xl font-bold text-white mb-6">Top Cryptocurrencies</h1>
        <div className="bg-gray-800 p-6 rounded-lg mt-20">
          {crypto.map(crypto => (
            <div key={crypto.symbol} className="flex justify-between items-center py-3 border-b border-gray-700">
              <div>
                <h3 className="text-white font-medium">{crypto.symbol}</h3>
                <p className="text-gray-400 text-sm">{crypto.name}</p>
              </div>
              <div className="text-right">
                <p className="text-white">${crypto.price.toFixed(2)}</p>
                <p className={`text-xs ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {crypto.change >= 0 ? '↑' : '↓'} {Math.abs(crypto.change.toFixed(2))}%
                </p>
                <button 
                  onClick={() => addToPortfolio(crypto)}
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

export default Crypto;