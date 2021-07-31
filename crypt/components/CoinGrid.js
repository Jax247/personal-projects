import React from "react";
import CoinRow from "./CoinRow";

const CoinGrid = ({ CoinData }) => {
  const tags = ["Coin", "ABV", "Price", "Volume", "Change", "Market Cap"];
  return (
    <div className="coin-list">
      <div className="tags">
        {tags.map((tag) => {
          return (
            <div key={tag} className={tag.toLowerCase().replace(/ /g, "")}>
              <p >{tag}</p>
            </div>
          );
        })}
      </div>
      {CoinData.map((coin) => {
        return (
          <CoinRow
            key={coin.id}
            name={coin.name}
            id={coin.id}
            symbol={coin.symbol}
            price={coin.current_price}
            marketcap={coin.market_cap}
            volume={coin.total_volume}
            image={coin.image}
            low={coin.low_24h}
            high={coin.high_24h}
            percent_change={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
};
// export default function CoinCard() {
//     return (
//         <div>

//         </div>
//     )
// }

export default CoinGrid;
