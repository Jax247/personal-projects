import { Box } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%" }}
    >
      <div className="lds-dual-ring"></div>
    </Box>
  );
};

export default Loader;
