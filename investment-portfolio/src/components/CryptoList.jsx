import React, { useState, useEffect } from 'react';
import { fetchTopCrypto } from '../utils/api';

const CryptoList = ({ onAddToPortfolio }) => {
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCrypto = async () => {
      const cryptoData = await fetchTopCrypto();
      setCrypto(cryptoData);
      setLoading(false);
    };

    loadCrypto();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-white">Loading cryptocurrencies...</div>
      </div>
    );
  }

  return (
    <div>
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
              onClick={() => onAddToPortfolio(crypto)}
              className="mt-1 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Add to Portfolio
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CryptoList;