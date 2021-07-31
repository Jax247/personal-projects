import { React, useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { Line } from "react-chartjs-2";
import coinGecko from "../api/coinGecko.js";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export const historyOptions = {
  lineHeightAnnotation: {
    always: true,
    hover: false,
    lineWeight: 1.5,
  },

  animation: {
    duration: 2000,
  },
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    x: [
      {
        title: "time",
        type: "time",
        distribution: "linear",
        grid: { display: false },
      },
    ],
  },
  interaction: {
    mode: "nearest",
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      // backgroundColor: 'rgba(255, 255, 255, 0)'
    },
  },
};
const Coin = ({ coinData }) => {
  const [chartData, setChartData] = useState({});
  const [timeFormat, setTimeFormat] = useState(0);
  const [mounted, flipM] = useState(false);
  const [allData, setData] = useState([]);

  const renderTF = () => {
    switch (timeFormat) {
      case 0:
        return <p>Past 24 Hours</p>;
        break;
      case 1:
        return <p>Past 7 Days</p>;
        break;
      case 2:
        return <p>30 Days</p>;
      default:
        break;
    }
  };

  const timecalc = (dif) => {
    let d = new Date(dif);
    let hours = d.getHours();

    if (hours > 12) return `${hours - 12} PM`;

    if (hours === 0) hours = 12;

    return `${hours} AM`;
  };

  const daycalc = (dif) => {
    console.log(dif);
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekDays[dif];
  };

  const monthcalc = (dif) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[dif];
  };

  const generateChart = (data) => {
    const today = new Date();
    const prices = data[timeFormat].data.prices;
    let res;
    let dif;

    console.log(prices);
    let labels = [];

    prices.forEach((price, index) => {
      if (index % 12 == 0 || index % 24 == 0 || index % 30 == 0) {
        res = new Date(price[0]);

        switch (timeFormat) {
          case 0:
            // 24h, data broken into 289 portions. Find good break point
            dif = today.getTime() - (today.getTime() - res.getTime());
            if (index % 30 == 0 || index == prices.length - 1)
              labels.push(`${timecalc(dif)}`);
            break;
          case 1:
            // 7d, 169 is hourly data. Break into days for labels
            dif = today.getDay() - (today.getDay() - res.getDay());
            if (index % 30 == 0 || index == prices.length - 1)
              labels.push(`${daycalc(dif)}`);
            break;
          case 2:
            // 1Mo, Daily data break up into daily intervals
            dif = today.getDate() - (today.getDate() - res.getDate());
            if (index % 30 == 0 || index == prices.length - 1)
              labels.push(`${monthcalc(res.getMonth())} ${dif}`);
            break;
          default:
            break;
        }
      } else {
        labels.push("");
      }
    });
    console.log(labels);
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
    fetchData();
  }, []);

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
    }
  };
  return (
    // <Layout details={true} coinData={coinData} image={coinData.image.large} setTimeFormat={() => setTimeFormat()} percent_change={()=>percent_change()}>
    <>
      <header>
        <div className="coin-container">
          <h1>{coinData.name}</h1>
          <p>{coinData.symbol.toUpperCase()}</p>
          <p>${coinData.market_data.current_price.usd.toLocaleString()}</p>
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
        {/* <div className="main-link"> */}
          <h1>Crypt Coin Tracker</h1>
          <Link href="/" passHref>
            <a>
              <img
                src={coinData.image.large}
                alt="logo"
                className="layout-logo"
              />
            </a>
          </Link>
        {/* </div> */}
      </header>
      <div className="coin-details">
        <div className="coin-chart">
          {renderTF()}
          <div className="coin-chart-btns">
            <button onClick={() => setTimeFormat(0)}>24h</button>
            <button onClick={() => setTimeFormat(1)}>7d</button>
            <button onClick={() => setTimeFormat(2)}>1Mo</button>
          </div>
          <Line data={chartData} options={historyOptions} />
        </div>
      </div>
    </>
    // </Layout>
  );
};

export default Coin;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;
  const response = await fetch(url);
  const coinData = await response.json();

  try {
    // What you pass into props must be consistent with the name
    // if not you must export it as the name : data
    return {
      props: { coinData: coinData },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
