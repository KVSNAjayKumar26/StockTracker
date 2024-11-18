import axios from 'axios';
import React, { useEffect, useState } from 'react'
import StockCard from './components/StockCard';
import './App.css';

const API_KEY = "cstdhl9r01qq1ruqvo4gcstdhl9r01qq1ruqvo50";
const API_URL = "https://finnhub.io/api/v1/quote";
const App = () => {
  const [stocks, setStocks] = useState([
    { symbol: "AAPL", name: "Apple"},
    { symbol: "GOOGL", name: "Google"},
    { symbol: "MSFT", name: "Microsoft"},
  ]);
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStcokData = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all(
          stocks.map((stock) =>
            axios.get(`${API_URL}?symbol=${stock.symbol}&token=${API_KEY}`)
          )
        );
        const data = responses.reduce((acc, res, idx) => {
          acc[stocks[idx].symbol] = res.data;
          return acc;
        }, {});
        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStcokData();
    const interval = setInterval(fetchStcokData, 5000);
    return () => clearInterval(interval);
  }, [stocks]);
  return (
    <div className='App'>
      <h1>Real-Time Stock Tracker</h1>
      <div className='stock-container'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          stocks.map((stock) => (
            <StockCard
            key={stock.symbol}
            name={stock.name}
            symbol={stock.symbol}
            data={stockData[stock.symbol]}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;