import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
// import { tokens } from "../theme";
type Iprops = {
  title: string;
  subtitle: string;
  isDashboard?: boolean;
};

const Header = ({ title, subtitle,isDashboard }: Iprops) => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  return (
    <Box mb={isDashboard ? "0px" : 5} width="60%" >
      <Typography textAlign="left" variant="h2" color={theme.palette.secondary.light} fontWeight="bold" mb={1}>
        {title}
      </Typography>
      <Typography
        variant="h5"
        color={theme.palette.secondary.light}
        fontWeight="bold"
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
