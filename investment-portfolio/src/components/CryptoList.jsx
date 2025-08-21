import React from 'react';

const CryptoList = () => {
  // This will be replaced with actual API data
  const sampleCrypto = [
    { symbol: 'BTC', name: 'Bitcoin', price: 51623.45 },
    { symbol: 'ETH', name: 'Ethereum', price: 2987.32 },
    { symbol: 'BNB', name: 'Binance Coin', price: 352.18 },
    { symbol: 'SOL', name: 'Solana', price: 109.87 },
    { symbol: 'XRP', name: 'Ripple', price: 0.5432 },
  ];

  return (
    <div>
      {sampleCrypto.map(crypto => (
        <div key={crypto.symbol} className="flex justify-between items-center py-3 border-b border-gray-700">
          <div>
            <h3 className="text-white font-medium">{crypto.symbol}</h3>
            <p className="text-gray-400 text-sm">{crypto.name}</p>
          </div>
          <div className="text-right">
            <p className="text-white">${crypto.price.toFixed(2)}</p>
            <button className="mt-1 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700 transition duration-300">
              Add to Portfolio
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CryptoList;