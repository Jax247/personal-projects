import React from "react";
import { Box, useTheme } from "@mui/material";
import { Header } from "../../components";
import { useGetGeographyQuery } from "../../state/api";
import Loader from "../../Loader";
import { ResponsiveChoropleth } from "@nivo/geo";
import { worldGeoData } from "../../state/worldData";

const Geography = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyQuery("Geography");

  if (isLoading) {
    return <Loader />;
  }

  console.log(data);
  return (
    <div className="main-content-wrapper">
      <Box>
        <Header title="GEOGRAPHY" subtitle="# of users by Location" />
        <Box
          mt={5}
          height="75vh"
          border={`1px solid ${theme.palette.secondary.light}`}
          borderRadius="4px"
        >

<ResponsiveChoropleth
        data={data || []}
        features={worldGeoData.features}
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
        margin={{ top: 0, right: 0, bottom: 0, left: -30 }}
        colors={theme.palette.mode === 'dark' ? "YlGnBu" : "PuOr"}
        enableGraticule={theme.palette.mode === 'light'}
        domain={[ 0, 55 ]}
        unknownColor="#ccc"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={150}
        projectionTranslation={[ 0.45, 0.6]}
        projectionRotation={[ 0, 0, 0 ]}
        borderWidth={1.3}
        borderColor="#fff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: true,
                translateX: 0,
                translateY: -30,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.secondary.light,
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: theme.palette.background.paper,
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
        </Box>
      </Box>
    </div>
  );
};

export default Geography;
