import React from 'react'
import { motion } from 'framer-motion';
import './StockCard.css';

const StockCard = ({ name, symbol, data }) => {
    if (!data) return null;

    const priceChange = data.dp > 0 ? "positive" : "negative";

  return (
    <motion.div
    className={`stock-card ${priceChange}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    >
        <h2>{name}</h2>
        <p>{symbol}</p>
        <p>Current Price: ${data.c.toFixed(2)}</p>
        <p>Change: {data.dp.toFixed(2)}%</p>
    </motion.div>
  );
};

export default StockCard;