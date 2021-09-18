import { React, useState, useEffect } from "react";
// import Layout from "../../components/Layout";
import { Line } from "react-chartjs-2";
import coinGecko from "../api/coinGecko.js";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import "../css/coinDetails.css";

export const historyOptions = {
  lineHeightAnnotation: {
    always: true,
    hover: false,
    lineWeight: 1.5,
  },
  animation: {
    duration: 2000,
  },
  scales: {
    x: {
      ticks: {
        color: "rgb(255, 255, 255)", // this here
        font: {
          size: 14,
        },
      },
      gridLines: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: "rgb(255, 255, 255)", // this here
        font: {
          size: 18,
        },
      },
      gridLines: {
        display: false,
      },
    },
  },
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    display: false,
    labels: {
      fontColor: "white",
    },
  },

  interaction: {
    mode: "x",
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
      labels: {
        fontColor: "white",
      },
    },
    tooltip: {
      // backgroundColor: 'rgba(255, 255, 255, 0)'
    },
  },
};
const Coin = ({ match }) => {
  const [chartData, setChartData] = useState({});
  const [timeFormat, setTimeFormat] = useState(0);
  const [mounted, flipM] = useState(false);
  const [allData, setData] = useState([]);
  const [coinData, setCoinData] = useState(null);
  // const [init, setInit] = useState(false);
  let history = useHistory();

  useEffect(() => {
    const fetchCoinData = async () => {
      const url = `https://api.coingecko.com/api/v3/coins/${match.params.id}`;
      const response = await fetch(url);
      const initData = await response.json();
      setCoinData(initData);
    };

    fetchCoinData();
  }, []);

  const renderTF = () => {
    switch (timeFormat) {
      case 0:
        return <p>Past 24 Hours</p>;
      case 1:
        return <p>Past 7 Days</p>;
      case 2:
        return <p>30 Days</p>;
      default:
        break;
    }
  };


  const generateChart = (data) => {
    const today = new Date();
    const prices = data[timeFormat].data.prices;
    let res;
    let dif;

    console.log(prices);
    let labels = [];

    prices.forEach((price, index) => {
      if (index % 12 === 0 || index % 24 === 0 || index % 30 === 0) {
        res = new Date(price[0]);

        switch (timeFormat) {
          case 0:
            labels.push(res.toLocaleString([], { hour: "numeric" }));
            break;
          case 1:
            labels.push(res.toLocaleDateString());
            break;
          case 2:
            labels.push(res.toLocaleDateString());
            break;
          default:
            break;
        }
      } else {
        labels.push("");
      }
    });
    // console.log(labels);
    setChartData({
      labels: labels,
      datasets: [
        {
          fill: true,
          lineTension: 0.5,
          backgroundColor: "rgb(43, 68, 196)",
          borderColor: "#fff",
          borderWidth: 2,
          data: prices,
          pointRadius: 0,
        },
      ],
    });
  };

  const fetchData = async () => {
    console.log(coinData);
    if (coinData !== null) {
      const data = await Promise.all([
        coinGecko.get(`/coins/${coinData.id}/market_chart`, {
          params: { vs_currency: "usd", days: 1 },
        }),
        coinGecko.get(`/coins/${coinData.id}/market_chart`, {
          params: { vs_currency: "usd", days: 7 },
        }),
        coinGecko.get(`/coins/${coinData.id}/market_chart`, {
          params: { vs_currency: "usd", days: 30 },
        }),
      ]).then((data) => {
        setData(data);
        generateChart(data);
      });
    }
  };

  useEffect(() => {
    const setData = () => {
      generateChart(allData);
    };

    if (mounted) {
      setData();
    }
    flipM(true);
  }, [timeFormat]);

  useEffect(() => {
    // if(init){
    fetchData();
    // }
  }, [coinData]);

  const percent_change = () => {
    switch (timeFormat) {
      case 0:
        return (
          Math.round(coinData.market_data.price_change_percentage_24h * 100) /
          100
        );
      case 1:
        return (
          Math.round(coinData.market_data.price_change_percentage_7d * 100) /
          100
        );

      case 2:
        return (
          Math.round(coinData.market_data.price_change_percentage_30d * 100) /
          100
        );
      default:
        break;
    }
  };

  const navigate = () => {
    history.push("/");
  };
  if (coinData === null) {
    return <div>Loading...</div>;
  } else {
    return (
      // <Layout details={true} coinData={coinData} image={coinData.image.large} setTimeFormat={() => setTimeFormat()} percent_change={()=>percent_change()}>
      <Router>
        {mounted ? (
          <>
            <header className="details-header">
              <div className="main-link">
                <h1>Crypt Coin Tracker</h1>

                <div onClick={() => navigate()}>
                  <img
                    src={coinData.image.large}
                    alt="logo"
                    className="layout-logo"
                    width={130}
                    height={130}
                  />
                </div>
              </div>
              <div className="coin-container">
                <h1>{coinData.name}</h1>
                <p>{coinData.symbol.toUpperCase()}</p>
                <p>
                  ${coinData.market_data.current_price.usd.toLocaleString()}
                </p>
                <div
                  className={
                    percent_change() < 0
                      ? "coin-percentage red"
                      : "coin-percentage green"
                  }
                >
                  <p>{percent_change()}%</p>
                </div>
              </div>

              <div className="coin-chart-btns">
                <button onClick={() => setTimeFormat(0)}>24h</button>
                <button onClick={() => setTimeFormat(1)}>7d</button>
                <button onClick={() => setTimeFormat(2)}>1Mo</button>
              </div>
            </header>
            <div className="coin-details">
              <div className="coin-chart">
                {renderTF()}

                <Line data={chartData} options={historyOptions} />
              </div>
            </div>
          </>
        ) : null}
      </Router>

      // </Layout>
    );
  }
};

export default Coin;
