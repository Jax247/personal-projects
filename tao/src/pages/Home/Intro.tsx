import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { mediaQueries } from "../../ThemeProvider";

const Wrapper = styled(motion.div)`
  /* background: linear-gradient(
    to right,
    ${(props) => props.theme.primary} 50%,
    ${(props) => props.theme.secondary} 50%
  ); */
  border-left: 2px solid ${(props) => props.theme.primary};
  border-right: 2px solid ${(props) => props.theme.secondary};
  z-index: 1;
  height: 100%;
`;

const InnerBox = styled(motion.div)<{ active: boolean }>`
  font-family: Great Vibes, cursive;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 65%;
  padding: 0em 1em;
  overflow: hidden;
  border: 2px solid;
  border-width: 4px;
  border-style: solid;
  border-image: linear-gradient(
      to right,
      ${(props) => props.theme.secondary} 50%,
      ${(props) => props.theme.primary} 50%
    )
    1;
  color: ${(props) => props.theme.secondary};
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: "60vh";

  
  @media (max-width: 50em) {
    height: 60vh!important;
    border-image: linear-gradient(
        to bottom,
        ${(props) => props.theme.secondary} 50%,
        ${(props) => props.theme.primary} 50%
      )
      1;
  }
  /* ${(props) =>
    props.active
      ? mediaQueries(50)`
     height: 50%;
     top:unset;
     right:0;
     bottom:0;
     left:0;
     width: 100%;
     transition: width 0.5s ease, height 1s ease 0.5s;  
    `
      : mediaQueries(50)`
     height: 0;
    width: 0;
    `}; */
`;

const openFrames = keyframes`
0%{
 width: 0px;
 height: 0px;
}
50% {
    width: 65%;
}
100% {
    width: 65%;
    height: 60vh;
}
`;

const Half = styled(motion.div)`
  width: 50%;
  min-width: 300px;
  text-align: center;
`;

interface Props {
  active: boolean;
}

const Intro: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <InnerBox
        active={props.active}
        initial={{ height: 0, borderWidth: 0 }}
        animate={{ height: "55vh", borderWidth: "3px" }}
        transition={{ type: "spring", duration: 2, delay: 1 }}
      >
        <Half>
          <h1>Jay Jeffries</h1>
          <h2>Frontend Web Developer</h2>
        </Half>
        <Half>{/* <hr/> */}</Half>
      </InnerBox>
    </Wrapper>
  );
};

export default Intro;
