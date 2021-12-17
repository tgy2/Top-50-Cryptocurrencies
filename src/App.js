import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search for a coin</h1>
        <form>
          <input
            type="text"
            placeholder="Search for a cryptocurrency"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      <p className="credits">
        A simple desktop cryptocurrency tracker. Made with CoinGeckos free API
        with a rate limit of 10-50 calls per minute.
      </p>
      <div className="heading-container">
        <div className="heading-row">
          <div className="c-data">
            <p className="c-name">Top 50 listed cryptocurrencies</p>
            <p className="c-price">Price</p>
            <p className="c-volume">24h Volume</p>
            <p className="c-change">24h</p>
            <p className="c-marketcap">Market cap</p>
          </div>
        </div>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        );
      })}
    </div>
  );
}

export default App;
