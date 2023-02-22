import { Box, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Datum, ResponsiveLine, Serie } from "@nivo/line";
import { useGetSalesQuery } from "../state/api";
import { YearlyStat } from "../state/types";
import Loader from "../Loader";

interface Iprops {
  mode: string;
  isDashboard?: boolean;
}
const LineChart: React.FC<Iprops> = ({ mode, isDashboard }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery("Sales");

  //   Keep track of sales # and units Sold, only change when the data changes, useMemo accomplishes that
  const [UnitData, SalesData] = useMemo(() => {

    // Define Data to hold , From nivo Chart Docs
    /*
        id: name of line 
        color: color of line
        data: Array values of x,y coordinates
    */

        if (!data ) return []

    const { monthlyData } = data as YearlyStat;
    const UnitDataLine: Serie[] = [
      {
        id: "Total Units Sold",
        color: theme.palette.secondary.dark,
        data: [] as Datum[],
      },
    ];
    const SalesDataLine: Serie[] = [
      {
        id: "Total Sales Made",
        color: theme.palette.secondary.dark,
        data: [] as Datum[],
      },
    ];

    // Accumulate the lines full set of data, 12 months
    // Populate nivo chart data by keeping track of the Monthly Sales progression
    // in the chart data is an array of xy values where x = month y = Sales/Units

    console.log("Monthly Data", Object.values(monthlyData));

    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        // Add sales and units as you go through the months
        let currentMonthSales = acc.Sales + totalSales;
        let currentMonthUnits = acc.Units + totalUnits;

        //  Apply to nivoChart Data
        // 2 methods

        UnitDataLine[0].data = [
          ...UnitDataLine[0].data,
          { x: month, y: currentMonthUnits },
        ];

        SalesDataLine[0].data.push({ x: month, y: currentMonthSales });

        return { Units: currentMonthUnits, Sales: currentMonthSales };
      },
      { Sales: 0, Units: 0 }
    );

    return [UnitDataLine, SalesDataLine];
  }, [mode, data]);

  if(isLoading) {
    return <Loader/>
  }

  return (
    <ResponsiveLine
      data={(mode === "sales" ? SalesData : UnitData) || []}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary.light,
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary.light,
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary.light,
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary.light,
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary.light,
          },
        },
        tooltip: {
          container: {
            color: theme.palette.mode === "light"
            ? theme.palette.secondary.light
            : theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      colors={theme.palette.secondary.light}
      yFormat=" >-.2f"
      curve="catmullRom"
    enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        // orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        // orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${mode === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default LineChart;
