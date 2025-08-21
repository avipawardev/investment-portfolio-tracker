import React from 'react';

const Charts = ({ assets }) => {
  // Simple chart showing asset distribution
  const totalValue = assets.reduce((total, asset) => total + (asset.quantity * asset.price), 0);
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Portfolio Distribution</h2>
      {assets.length === 0 ? (
        <p className="text-gray-400">No assets to display</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg text-white mb-3">Assets</h3>
            <div className="space-y-2">
              {assets.map(asset => {
                const value = (asset.quantity * asset.price);
                const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;
                
                return (
                  <div key={asset.id} className="flex justify-between items-center">
                    <span className="text-white">{asset.name}</span>
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-600 rounded-full mr-2">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-lg text-white mb-3">Portfolio Value</h3>
            <div className="bg-blue-900 p-4 rounded-lg">
              <p className="text-3xl font-bold text-white">${totalValue.toFixed(2)}</p>
              <p className="text-gray-400">Total Portfolio Value</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Charts;