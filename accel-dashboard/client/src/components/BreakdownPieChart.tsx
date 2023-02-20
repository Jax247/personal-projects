import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetSalesQuery } from "../state/api";
import Loader from "../Loader";

const BreakdownPieChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery("Sales");
  const theme = useTheme();

  if (!data || isLoading) return <Loader />;

  const colors =
    theme.palette.mode === "light"
      ? [
          '#4169e1',
          theme.palette.secondary.light,
          theme.palette.secondary.light,
          '#4169e1',
        ]
      : [
          theme.palette.secondary.main,
          theme.palette.secondary.light,
          theme.palette.secondary.light,
          theme.palette.secondary.main,
        ];
  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i],
    })
  );

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={"100%"}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "250px" : undefined}
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
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
              color: theme.palette.secondary.main,
            },
          },
        }}
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary.light}
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers:
            theme.palette.mode === "light"
              ? [["brighter", 5]]
              : [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary.main,
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary.main}
        textAlign="center"
        // pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6" textAlign="center">
          {!isDashboard && "Total:"} ${data.yearlySalesTotal}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownPieChart;
