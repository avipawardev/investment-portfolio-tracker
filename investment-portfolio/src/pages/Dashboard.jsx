import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ref, onValue, set, remove } from 'firebase/database';
import { db } from '../firebase';
import Charts from '../components/Charts';

function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({ name: '', symbol: '', quantity: 0, price: 0, type: 'stock' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const assetsRef = ref(db, `users/${currentUser.uid}/assets`);
      const unsubscribe = onValue(assetsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const assetsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setAssets(assetsArray);
        } else {
          setAssets([]);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleAddAsset = () => {
    if (newAsset.name && newAsset.quantity > 0 && newAsset.price > 0) {
      const assetRef = ref(db, `users/${currentUser.uid}/assets/${Date.now()}`);
      set(assetRef, newAsset);
      setNewAsset({ name: '', symbol: '', quantity: 0, price: 0, type: 'stock' });
    }
  };

  const handleDeleteAsset = (assetId) => {
    const assetRef = ref(db, `users/${currentUser.uid}/assets/${assetId}`);
    remove(assetRef);
  };

  // Safe calculation of total value with fallbacks
  const totalValue = assets.reduce((total, asset) => {
    const quantity = Number(asset.quantity) || 0;
    const price = Number(asset.price) || 0;
    return total + (quantity * price);
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-32 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Portfolio Summary</h2>
            <p className="text-2xl text-blue-400">Total Value: ${totalValue.toFixed(2)}</p>
            <p className="text-gray-400">Number of Assets: {assets.length}</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Add New Asset</h2>
            <div className="space-y-4">
              <select
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={newAsset.type}
                onChange={(e) => setNewAsset({...newAsset, type: e.target.value})}
              >
                <option value="stock">Stock</option>
                <option value="crypto">Cryptocurrency</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Asset Name"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={newAsset.name}
                onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
              />
              <input
                type="text"
                placeholder="Symbol"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={newAsset.symbol}
                onChange={(e) => setNewAsset({...newAsset, symbol: e.target.value})}
              />
              <input
                type="number"
                placeholder="Quantity"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={newAsset.quantity}
                onChange={(e) => setNewAsset({...newAsset, quantity: parseFloat(e.target.value) || 0})}
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={newAsset.price}
                onChange={(e) => setNewAsset({...newAsset, price: parseFloat(e.target.value) || 0})}
              />
              <button
                onClick={handleAddAsset}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Add Asset
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <Charts assets={assets} />
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Your Assets</h2>
          {assets.length === 0 ? (
            <p className="text-gray-400">No assets yet. Add some to your portfolio.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-700 rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-300">Type</th>
                    <th className="px-4 py-2 text-left text-gray-300">Name</th>
                    <th className="px-4 py-2 text-left text-gray-300">Symbol</th>
                    <th className="px-4 py-2 text-left text-gray-300">Quantity</th>
                    <th className="px-4 py-2 text-left text-gray-300">Price</th>
                    <th className="px-4 py-2 text-left text-gray-300">Value</th>
                    <th className="px-4 py-2 text-left text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map(asset => {
                    // Safe data extraction with fallbacks
                    const quantity = Number(asset.quantity) || 0;
                    const price = Number(asset.price) || 0;
                    const value = quantity * price;
                    
                    return (
                      <tr key={asset.id} className="border-t border-gray-600">
                        <td className="px-4 py-3 text-white capitalize">{asset.type || 'other'}</td>
                        <td className="px-4 py-3 text-white">{asset.name || 'Unnamed Asset'}</td>
                        <td className="px-4 py-3 text-white">{asset.symbol || 'N/A'}</td>
                        <td className="px-4 py-3 text-white">{quantity}</td>
                        <td className="px-4 py-3 text-white">${price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-white">${value.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteAsset(asset.id)}
                            className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition duration-300"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;