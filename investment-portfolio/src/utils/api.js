// Alpha Vantage API for stock data
const ALPHA_VANTAGE_API_KEY = 'M1QAAH1T2QIMOR0Z'; // You can get a free API key from https://www.alphavantage.co/
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// CoinGecko API for cryptocurrency data
const COIN_GECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

// Fetch top stocks
export const fetchTopStocks = async () => {
  try {
    // Using demo key for now - you should get your own free API key
    const response = await fetch(
      `${ALPHA_VANTAGE_BASE_URL}?function=TOP_GAINERS_LOSERS&apikey=${ALPHA_VANTAGE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }
    
    const data = await response.json();
    
    // Extract top gainers
    if (data.top_gainers && data.top_gainers.length > 0) {
      return data.top_gainers.slice(0, 5).map(stock => ({
        symbol: stock.ticker,
        name: stock.ticker, // Alpha Vantage doesn't provide company names in this endpoint
        price: parseFloat(stock.price) || 0,
        change: parseFloat(stock.change_percentage) || 0,
        type: 'stock'
      }));
    }
    
    // Fallback data if API doesn't work
    return getFallbackStocks();
  } catch (error) {
    console.error('Error fetching stocks:', error);
    return getFallbackStocks();
  }
};

// Fetch top cryptocurrencies
export const fetchTopCrypto = async () => {
  try {
    const response = await fetch(
      `${COIN_GECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch crypto data');
    }
    
    const data = await response.json();
    
    return data.map(crypto => ({
      symbol: crypto.symbol.toUpperCase(),
      name: crypto.name,
      price: crypto.current_price || 0,
      change: crypto.price_change_percentage_24h || 0,
      type: 'crypto'
    }));
  } catch (error) {
    console.error('Error fetching crypto:', error);
    return getFallbackCrypto();
  }
};

// Fallback data in case API fails
const getFallbackStocks = () => [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change: 1.2, type: 'stock' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 337.69, change: 0.8, type: 'stock' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 143.21, change: -0.5, type: 'stock' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.18, change: 2.1, type: 'stock' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 238.59, change: -1.3, type: 'stock' },
];

const getFallbackCrypto = () => [
  { symbol: 'BTC', name: 'Bitcoin', price: 51623.45, change: 2.5, type: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', price: 2987.32, change: 1.8, type: 'crypto' },
  { symbol: 'BNB', name: 'Binance Coin', price: 352.18, change: -0.7, type: 'crypto' },
  { symbol: 'SOL', name: 'Solana', price: 109.87, change: 3.2, type: 'crypto' },
  { symbol: 'XRP', name: 'Ripple', price: 0.5432, change: 0.4, type: 'crypto' },
];