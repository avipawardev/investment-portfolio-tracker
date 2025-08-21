import React from 'react';
const StocksList = () => {
  // This will be replaced with actual API data
  const sampleStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 337.69 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 143.21 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.18 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 238.59 },
  ];

  return (
    <div>
      {sampleStocks.map(stock => (
        <div key={stock.symbol} className="flex justify-between items-center py-3 border-b border-gray-700">
          <div>
            <h3 className="text-white font-medium">{stock.symbol}</h3>
            <p className="text-gray-400 text-sm">{stock.name}</p>
          </div>
          <div className="text-right">
            <p className="text-white">${stock.price.toFixed(2)}</p>
            <button className="mt-1 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700 transition duration-300">
              Add to Portfolio
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default StocksList;




