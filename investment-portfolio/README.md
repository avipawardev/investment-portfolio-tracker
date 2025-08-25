# 💼 Investment Portfolio Tracker
Deployed Link - 'https://investment-portfolio-tracker-tan.vercel.app/'

A sleek and responsive web application built with **React.js** that helps users track and manage their investments in **stocks, cryptocurrencies, and other assets**.  
It provides real-time portfolio insights, asset performance analytics, and an interactive dashboard with beautiful charts and graphs.  

---

## 🚀 Features
- **Portfolio Overview Dashboard**  
  - Dynamic pie charts for asset allocation  
  - Line graphs to track performance over time  
  - Real-time data updates from market APIs  

- **Interactive Asset Management**  
  - Add / remove assets (stocks, crypto, bonds, etc.)  
  - In-depth view of each asset with live price updates  
  - Draggable & customizable widgets  

- **Responsive Asset Filters**  
  - Sort by asset type (stocks, crypto, bonds)  
  - Search and group assets by category  
  - Highlight top-performing assets  

- **Performance Comparison Tool (Optional)**  
  - Compare multiple assets side by side  
  - Benchmark assets against indices (e.g., S&P 500, Bitcoin)  

---

## 🛠️ Tech Stack
- **Frontend**: React.js, React Router, Tailwind CSS, Framer Motion  
- **Charts & Graphs**: Recharts  
- **APIs**:   
  - [Alpha Vantage]Alpha Vantage Support 

- **Data Storage**:  
  - LocalStorage (for MVP – no backend required)  
  - Firebase (optional, for persistent storage & authentication)  

---

## 📂 Project Structure
investment-portfolio-tracker/
│── public/
│── src/
│   ├── assets/            # icons, images
│   ├── components/        # reusable UI parts (Navbar, Charts, Filters, Widgets)
│   ├── pages/             # main screens (Dashboard, Assets, Compare)
│   ├── hooks/             # custom hooks (useLocalStorage, useApiData)
│   ├── utils/             # helper functions (format numbers, api calls)
│   ├── App.js             # routing + layout
│   ├── index.js
│── package.json

npm install firebase react-router-dom chart.js react-chartjs-2