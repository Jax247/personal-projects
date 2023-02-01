import React, { useState } from "react";
import { Box, FormControl, MenuItem, InputLabel, Select, useTheme } from "@mui/material";
import { useGetSalesQuery } from "../../state/api";
import Loader from "../../Loader";
import { Header, OverviewLineChart } from "../../components";
const Overview = () => {
  const theme = useTheme();
  const [mode, setMode] = useState("units");
  const { data, isLoading } = useGetSalesQuery("Sales");

  if (isLoading) {
    return <Loader />;
  }
  console.log("Sales", data);
  return (
    <div className="main-content-wrapper">
      <Box>
        <Header
          title="Transactions"
          subtitle="List of Transactions for Records"
        />
        <Box height="80vh" sx={{}}>
            {/* Switches between amount of units and sales */}
            <FormControl sx={{marginTop: "1rem"}}>
                <InputLabel>Mode</InputLabel>
                <Select value={mode} label="Mode" onChange={(e) => setMode(e.target.value)}>
                    <MenuItem value="units">Units</MenuItem>
                    <MenuItem value="sales">Sales</MenuItem>
                </Select>
            </FormControl>
          <OverviewLineChart mode={mode}/>
        </Box>
      </Box>
    </div>
  );
};

export default Overview;
