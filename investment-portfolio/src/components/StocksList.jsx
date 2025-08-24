import React, { useState, useEffect } from 'react';
import { fetchTopStocks } from '../utils/api';

const StocksList = ({ onAddToPortfolio }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStocks = async () => {
      const stockData = await fetchTopStocks();
      setStocks(stockData);
      setLoading(false);
    };

    loadStocks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-white">Loading stocks...</div>
      </div>
    );
  }

  return (
    <div>
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
              onClick={() => onAddToPortfolio(stock)}
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

export default StocksList;