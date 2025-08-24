import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Charts = ({ assets }) => {
  // Calculate total value and prepare data for charts
  const totalValue = assets.reduce((total, asset) => {
    const quantity = Number(asset.quantity) || 0;
    const price = Number(asset.price) || 0;
    return total + (quantity * price);
  }, 0);

  // Prepare data for doughnut chart
  const doughnutData = {
    labels: assets.map(asset => asset.name || 'Unnamed'),
    datasets: [
      {
        label: 'Portfolio Distribution',
        data: assets.map(asset => {
          const quantity = Number(asset.quantity) || 0;
          const price = Number(asset.price) || 0;
          return (quantity * price) / totalValue * 100;
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(199, 199, 199, 0.8)',
          'rgba(83, 102, 255, 0.8)',
          'rgba(40, 159, 64, 0.8)',
          'rgba(210, 99, 132, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
          'rgba(40, 159, 64, 1)',
          'rgba(210, 99, 132, 1)'
        ],
        borderWidth: 2,
        hoverOffset: 15
      }
    ]
  };

  // Prepare data for performance chart (simulated historical data)
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Portfolio Performance',
        data: [10000, 12000, 11500, 13000, 14000, 15000, 14500, 16000, 16500, 17000, 18000, totalValue/100],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Chart options with animations
  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'white',
          font: {
            size: 12
          },
          padding: 20
        }
      },
      title: {
        display: true,
        text: 'Portfolio Distribution',
        color: 'white',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw.toFixed(2)}%`;
          }
        }
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 2000,
      easing: 'easeOutQuart'
    },
    cutout: '60%'
  };

  const performanceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Portfolio Performance (Simulated)',
        color: 'white',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `$${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white',
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  if (assets.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Portfolio Analytics</h2>
        <p className="text-gray-400">No assets to display. Add some to your portfolio to see analytics.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-white mb-6">Portfolio Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="h-64">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="h-64">
            <Line data={performanceData} options={performanceOptions} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 rounded-lg">
          <h3 className="text-white text-lg font-semibold">Total Value</h3>
          <p className="text-2xl font-bold text-white">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-600 to-green-800 p-4 rounded-lg">
          <h3 className="text-white text-lg font-semibold">Number of Assets</h3>
          <p className="text-2xl font-bold text-white">{assets.length}</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 rounded-lg">
          <h3 className="text-white text-lg font-semibold">Best Performing</h3>
          <p className="text-xl font-bold text-white">
            {assets.length > 0 ? 
              assets.reduce((max, asset) => {
                const currentValue = (Number(asset.quantity) || 0) * (Number(asset.price) || 0);
                const maxValue = (Number(max.quantity) || 0) * (Number(max.price) || 0);
                return currentValue > maxValue ? asset : max;
              }).name || 'Unknown' : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Charts;