import React, { ReactElement } from "react";
import { Box, SvgIconTypeMap, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface Props {
  title: string;
  value: number;
  percent: number;
  icon: ReactElement;
  description: string;
}

const StatBox: React.FC<Props> = (props) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.secondary.main,
      }}
      gridColumn={"span 2"}
      gridRow="span 1"
      display="flex"
      justifyContent="space-between"
      p="1rem"
      flexDirection={"column"}
      flex="1 1 100%"
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography variant="h6">{props.title}</Typography>
        {props.icon}
      </FlexBetween>
      <Typography variant="h3" fontWeight="bold">
        {props.value}
      </Typography>
      <FlexBetween>
        <Typography
          fontStyle="italic"
          fontWeight="bold"
        >{`+${props.percent}%`}</Typography>
        <Typography variant="h6" fontSize="clamp(12px, .8vw, 16px)">{props.description}</Typography>
      </FlexBetween>
    </Box>
  );
};
export default StatBox;
