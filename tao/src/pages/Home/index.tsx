import React, { Suspense, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { YinYang } from "../../assets/svgs.jsx";
import { mediaQueries } from "../../ThemeProvider";
import Intro from "./Intro.js";
import Socials from "../../components/Socials.js";
import NavLink from "./NavLink";

const MainContainer = styled(motion.div)`
  background: ${(props) => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: Great Vibes, cursive;

    font-weight: 500;
  }

  h2 {
    ${mediaQueries(40)`
      font-size:1.2em;

  `};

    ${mediaQueries(30)`
      font-size:1em;

  `};
  }
`;

const Container = styled.div`
  /* padding: 2.5em 2em; */
`;
const LinkContainer = styled.div`
  /* padding: 2.5em 2em; */
`;

const MainButtonText = styled.span``;

const RotateAni = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const Center = styled.div<{ active: boolean; bp: boolean }>`
  position: absolute;
  cursor: pointer;
  top: ${(props) => (props.active ? "50%" : "50%")};
  left: ${(props) => (props.active ? "65%" : "50%")};
  transform: translate(-50%, -50%);
  transition: all 1s ease;
  z-index: 100;
  border-radius: 50%;
  & > svg {
    transition: all 1s ease;
    display: block;
    fill: ${(props) =>
      props.active ? props.theme.primary : props.theme.secondary};
    animation: ${RotateAni} infinite 1.5s linear;
  }
  & > *:last-child {
    text-align: center;

    display: ${(props) => (props.active ? "none" : "block")};
    color: ${(props) => (props.active ? "transparent" : props.theme.secondary)};
    margin-top: 1rem;
  }
  @media only screen and (max-width: 50em) {
    top: ${(props) => (props.active ? "65%" : "50%")};
    left: ${(props) => (props.active ? "50%" : "50%")};
    width: ${(props) => (props.active ? "150px" : "80px")};
    height: ${(props) => (props.active ? "150px" : "80px")};
  }
  @media only screen and (max-width: 30em) {
    width: ${(props) => (props.active ? "150px" : "40px")};
    height: ${(props) => (props.active ? "150px" : "40px")};
  }
`;
const CircularBG = styled.div<{ active: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  background: linear-gradient(
      to right,
      ${(props) => props.theme.secondary} 50%,
      ${(props) => props.theme.primary} 50%
    )
    1;
  transform: translate(-50%, -50%);
  transition: all 1s ease;

  ${(props) => (props.active ? "transform: scale(3)" : "")};

  @media only screen and (max-width: 50em) {
    top: ${(props) => (props.active ? "50%" : "50%")};
    left: ${(props) => (props.active ? "50%" : "50%")};
    width: ${(props) => (props.active ? "80px" : "150px")};
    height: ${(props) => (props.active ? "80px" : "150px")};
  }
  @media only screen and (max-width: 30em) {
    width: ${(props) => (props.active ? "40px" : "150px")};
    height: ${(props) => (props.active ? "40px" : "150px")};
  }
`;

const DarkSide = styled.div<{ active: boolean }>`
  background: #000000;
  position: absolute;
  top: 0%;
  right: 50%;
  bottom: 0%;
  width: ${(props) => (props.active ? "100%" : "0%")};
  transition: width 1s ease 0.5s;
  z-index: 1;

  ${(props) =>
    props.active
      ? mediaQueries(50)`
     height: 50%;
     right:0;
     width: 100%;
     transition: width 0.5s ease, height 1s ease 0.5s;  
    `
      : mediaQueries(50)`
     height: 0;
    width: 0;
    `};
`;
const LightSide = styled.div<{ active: boolean }>`
  background: #fff;
  position: absolute;
  top: 0px;
  left: 50%;
  bottom: 0px;
  right: 0px;
  height: 100%;
  width: ${(props) => (props.active ? "100%" : "0%")};
  transition: width 1s ease 0.5s;
  z-index: 1;

  ${(props) =>
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
    `};
`;

const Home = () => {
  // Active and Idle state for home display
  const [active, setActive] = useState(true);
  const breakpoint = window.matchMedia("(max-width: 50em)").matches;
  const mainButtonDimensions = breakpoint
    ? active
      ? 150
      : 80
    : active
    ? 300
    : 120;

  const moveY = {
    y: "-100vh",
  };
  // const moveX = {
  //   x: `${active === "work" ? "100%" : "-100%"}`,
  // };

  return (
    // React suspense to  wait for load
    <MainContainer
      key={"/"}
      transition={{ duration: 0.5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: -100000 }}
    >
      <Suspense fallback={<YinYang />}>
        <DarkSide active={active} />
        <LightSide active={active} />
        <CircularBG active={active} />
        <Container>
          <Center bp={breakpoint} active={active}>
            <YinYang
              onClick={() => setActive((prev) => !prev)}
              width={mainButtonDimensions}
              height={mainButtonDimensions}
              // fill="currentColor"
            />
            <MainButtonText>click here</MainButtonText>
          </Center>
        </Container>
        {active && <Intro active={active} />}
        <Socials horizontal={breakpoint}/>
      </Suspense>
    </MainContainer>
  );
};

export default Home;
