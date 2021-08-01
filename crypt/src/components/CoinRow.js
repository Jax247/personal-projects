import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import "../css/coinRow.css";

const CoinRow = ({
  name,
  id,
  symbol,
  price,
  image,
  percent_change,
  volume,
  marketcap,
}) => {

  let history = useHistory();
  
  const navigate = () => {
    history.push(`/coin/${id}`);
  };

  return (
      <div onClick={() => navigate()} className="coin-row">
        <div>
        <div className="coin-tag">
          <img src={image} alt={name} width={130} height={130} />
          <h2>{name}</h2>
        </div>
        <div className="coin-symbol">
          <p>{symbol.toUpperCase()}</p>
        </div>
        <div className="coin-price">
          <p>${price.toLocaleString()}</p>
        </div>
        <div className="coin-volume">
          <p>${volume.toLocaleString()}</p>
        </div>
        <div
          className={
            percent_change < 0 ? "coin-percentage red" : "coin-percentage green"
          }
        >
          <p>{Math.round(percent_change * 100) / 100}%</p>
        </div>

        <p className="coin-mktcap">${marketcap.toLocaleString()}</p>
        </div>
      </div>
  );
};

export default CoinRow;
