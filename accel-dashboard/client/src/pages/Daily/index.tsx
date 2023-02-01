import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { Header } from "../../components";
import Loader from "../../Loader";
import { Datum, ResponsiveLine, Serie } from "@nivo/line";
import { useGetSalesQuery } from "../../state/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { YearlyStat } from "../../state/types";

const Daily = () => {
  const theme = useTheme();
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-02-11"));
  const { data, isLoading } = useGetSalesQuery("Sales");

  const [formattedData] = useMemo(() => {
    // Define Data to hold , From nivo Chart Docs
    /*
        id: name of line 
        color: color of line
        data: Array values of x,y coordinates
    */
    if (!data) return [];
    const { dailyData } = data as YearlyStat;
    const UnitDataLine: Serie = {
      id: "Total Units Sold",
      color: theme.palette.secondary.dark,
      data: [] as Datum[],
    };
    const SalesDataLine: Serie = {
      id: "Total Sales Made",
      color: "#03a9f4",
      data: [] as Datum[],
    };

    // Accumulate the lines full set of data, 12 months
    // Populate nivo chart data by keeping track of the Monthly Sales progression
    // in the chart data is an array of xy values where x = month y = Sales/Units

    console.log("Monthly Data", Object.values(dailyData));

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1);

        UnitDataLine.data = [
          ...UnitDataLine.data,
          { x: splitDate, y: totalUnits },
        ];

        SalesDataLine.data.push({ x: splitDate, y: totalSales });
      }
    });

    const OutputData = [UnitDataLine, SalesDataLine];

    return [OutputData];
  }, [data, startDate, endDate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box>
      <Header title={` Daily `} subtitle=" " />
      <Box height="80vh">
        <Box display="flex" justifyContent="flex-end">
          <Box>
            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box>
            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>

        <ResponsiveLine
          data={formattedData || []}
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
                color: theme.palette.primary.main,
              },
            },
          }}
          colors={{ datum: "color" }}
          margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            // orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Month",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            // orient: "left",
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Total",
            legendOffset: -50,
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
          legends={[
            {
              anchor: "top-right",
              direction: "column",
              justify: false,
              translateX: 50,
              translateY: 0,
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
          ]}
        />
        <ResponsiveLine
          data={formattedData || []}
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
                color: theme.palette.primary.main,
              },
            },
          }}
          colors={{ datum: "color" }}
          margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            //   orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            legend: "Month",
            legendOffset: 60,
            legendPosition: "middle",
          }}
          axisLeft={{
            //   orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Total",
            legendOffset: -50,
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
          legends={[
            {
              anchor: "top-right",
              direction: "column",
              justify: false,
              translateX: 50,
              translateY: 0,
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
          ]}
        />
      </Box>
    </Box>
  );
};

export default Daily;
