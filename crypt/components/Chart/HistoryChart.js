import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
// import { historyOptions } from "../chartConfigs/chartConfigs";

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
      xAxes: [
        {
          type: "time",
          distribution: "linear",
        },
      ],
    },
  };
const HistoryChart = ({ data }) => {
  const chartRef = useRef();
  const { day, week, year, detail } = data;
  const [timeFormat, setTimeFormat] = useState("24h");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  useEffect(() => {
    if (chartRef && chartRef.current && detail) {
      console.log("yeah");
      const chartInstance = new Chartjs(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${detail.name} price`,
              data: determineTimeFormat(),
              backgroundColor: "rgba(174, 305, 194, 0.5)",
              borderColor: "rgba(174, 305, 194, 0.4",
              pointRadius: 0,
            },
          ],
        },
        options: {
          ...historyOptions,
        },
      });
    }
  });

  const renderPrice = () => {
    if (detail) {
      return (
        <>
          <p className="my-0">${detail.current_price.toFixed(2)}</p>
          <p
            className={
              detail.price_change_24h < 0
                ? "text-danger my-0"
                : "text-success my-0"
            }
          >
            {detail.price_change_percentage_24h.toFixed(2)}%
          </p>
        </>
      );
    }
  };
  return (
    <div>
      <div>{renderPrice()}</div>
      <div>
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
      </div>

      <div className="">
        <button
          onClick={() => setTimeFormat("24h")}
          className=""
        >
          24h
        </button>
        <button
          onClick={() => setTimeFormat("7d")}
          className=""
        >
          7d
        </button>
        <button
          onClick={() => setTimeFormat("1y")}
          className=""
        >
          1y
        </button>
      </div>
    </div>
  );
};

export default HistoryChart;