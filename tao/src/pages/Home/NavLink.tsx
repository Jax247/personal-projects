import { motion } from "framer-motion";
import React from "react";
import styled, { css } from "styled-components";
import { NavLink as Nav } from "react-router-dom";

const Container = styled(Nav)<{ location: string }>`
  color: #121212;
  ${(props) =>
    (props.location === "/") &&
    css`
      &:hover {
        color: #121212;
      }
    `}
  ${(props) =>
    (props.location === "/projects" || props.location === "/about") &&
    css`
      color: #fff;
      &:hover {
      }
    `}

  font-family: Great Vibes, cursive;
  @media (max-width: 50em) {
    color: #fff;
  }
`;

const NavText = styled(motion.h2)`
  margin: 0;
`;

interface Props {
  title: string;
  to: string;
  initial?: number;
  location: string;
}
const NavLink = ({ title, to, initial, location }: Props) => {
  return (
    <Container location={location} to={to}>
      <NavText
        initial={{
          y: initial,
        }}
        animate={{
          y: 0,
          transition: { type: "spring", duration: 1.5, delay: 1 },
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {title}
      </NavText>
    </Container>
  );
};

export default NavLink;
