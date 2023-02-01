import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Header } from "../../components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandIcon from "@mui/icons-material/ExpandMore";
// import { tokens } from "../../theme";

const FAQ = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  const AccEntry = (question:string, answer:string ) => (
    <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography variant="h3" 
          // color={colors.greenAccent[500]}
          >
            Accordion Title #1
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph fontSize={"1rem"}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime eum
            eius porro, sint minus delectus magni fuga exercitationem illum nam!
          </Typography>
        </AccordionDetails>
      </Accordion>
    )

  return (
    <Box p={3}>
      <Header
        title="Frequently Asked Questions"
        subtitle="Get all your knowledge here"
      />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography variant="h3" 
          // color={colors.greenAccent[500]}
          >
            Accordion Title #1
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph fontSize={"1rem"}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime eum
            eius porro, sint minus delectus magni fuga exercitationem illum nam!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography variant="h3" 
          // color={colors.greenAccent[500]}
          >
            Accordion Title #2
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph fontSize={"1rem"}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime eum
            eius porro, sint minus delectus magni fuga exercitationem illum nam!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography variant="h3" 
          // color={colors.greenAccent[500]}
          >
            Accordion Title #3
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph fontSize={"1rem"}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime eum
            eius porro, sint minus delectus magni fuga exercitationem illum nam!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography variant="h3" 
          // color={colors.greenAccent[500]}
          >
            Accordion Title #4
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph fontSize={"1rem"}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime eum
            eius porro, sint minus delectus magni fuga exercitationem illum nam!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography variant="h3" 
          // color={colors.greenAccent[500]}
          >
            Accordion Title #5
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph fontSize={"1rem"}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime eum
            eius porro, sint minus delectus magni fuga exercitationem illum nam!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Typography variant="h3" 
          // color={colors.greenAccent[500]}
          >
            Accordion Title #6
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph fontSize={"1rem"}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime eum
            eius porro, sint minus delectus magni fuga exercitationem illum nam!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
