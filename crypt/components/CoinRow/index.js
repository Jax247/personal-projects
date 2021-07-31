import React, { Component } from "react";
import Link from "next/link";
export class coinRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      name,
      id,
      symbol,
      price,
      image,
      percent_change,
      volume,
      marketcap,
    } = this.props;
    return (
      <Link href={"/coin/[id]"} as={`/coin/${id}`}>
          <div className="coin-row">
        <a>
            <div className="coin-tag">
              <img src={image} alt={name} />
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
                percent_change < 0
                  ? "coin-percentage red"
                  : "coin-percentage green"
              }
            >
              <p>{Math.round(percent_change * 100) / 100}%</p>
            </div>

            <p className="coin-mktcap">${marketcap.toLocaleString()}</p>
        </a>
          </div>
      </Link>
    );
  }
}

export default coinRow;
