import Head from "next/head";
import Image from "next/image";
import SearchBar from "../components/searchBar";
import CoinGrid from "../components/CoinGrid.js";
import { useState } from "react";
import Layout from "../components/Layout";

export default function Home({ CoinData }) {
  const [state, setState] = useState("");

  const selectedCoins = CoinData.filter((coin) =>
    coin.name.toLowerCase().includes(state.toLowerCase())
  );

  const change = (e) => {
    e.preventDefault();
    setState(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <div className="container">
        <SearchBar type="text" placeholder="Search Coin..." onChange={change} />

        <CoinGrid CoinData={selectedCoins} />
      </div>
    </Layout>
  );
}

// should be fetched at request time due to cryptos fluctuating nature
export async function getServerSideProps() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false"
  );
  const CoinData = await response.json();

  // if data doesnt exist, send 404
  try {
    return {
      props: { CoinData },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
}
