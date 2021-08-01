import SearchBar from "../components/searchBar";
import CoinGrid from "../components/CoinGrid";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import '../css/main.css'


export default function Home() {
  const [state, setState] = useState("");
  const [CoinData, setCoinData] = useState([])

  useEffect(() => {
      const fetchPopularCoins = async () =>{
        const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false"
          );
          const CoinData = await response.json();
            
          setCoinData(CoinData);
          console.log(CoinData);
      }
      
      fetchPopularCoins();
  }, [])

  const filterSelectedCoins = () => { 
      return CoinData.filter((coin) =>
    coin.name.toLowerCase().includes(state.toLowerCase())
  );
  } 

  const change = (e) => {
    e.preventDefault();
    setState(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className="container">
        <SearchBar type="text" placeholder="Search Coin..." onChange={change} />
        <CoinGrid CoinData={filterSelectedCoins()} />
      </div>
    </Layout>
  );
}

