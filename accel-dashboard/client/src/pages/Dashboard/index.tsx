import React from "react";
import { Box } from "@mui/material";
import { Header } from "../../components";
const Dashboard = () => {
  return (
    <div className="main-content-wrapper">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your Dashboard" />
      </Box>
    </div>
  );
};

export default Dashboard;
