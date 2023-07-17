import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { Github, LinkedIn } from "../assets/svgs";

const IconContainer = styled.div``;
const IconList = styled.div<{ horizontal: boolean; color?: string }>`
  position: fixed;
  display: ${(props) => (props.horizontal ? "flex" : "block")};
  flex-direction: row-reverse;
  align-items: center;
  bottom: ${(props) => (props.horizontal ? "2rem" : 0)};
  left: 2rem;
  z-index: 5;
  color: red;
  & svg {
    fill: ${(props) => props.theme.secondary};
    cursor: pointer;
    margin: 0.25em;
  }
  span:last-child {
    display: inline-block;
  }
  @media (max-width: 50em) {
    & svg {
      fill: ${(props) => props.theme.primary};
      fill: ${(props) => props.color};
    }
    & span {
      background-color: ${(props) => props.theme.primary};
      background-color: ${(props) => props.color};
    }
  }
`;
const Line = styled(motion.span)<{ horizontal: boolean }>`
  width: ${(props) => (props.horizontal ? "8rem" : "2px")};
  height: ${(props) => (props.horizontal ? "2px" : "8rem")};
  margin-left: ${(props) => (props.horizontal ? "5px" : "50%")};
  margin-right: ${(props) => (props.horizontal ? "5px" : "0px")};
  background-color: #fff;
`;

interface IconProps {
  delay: number;
  link: string;
  icon: ReactNode;
}

interface Props {
  horizontal?: boolean;
  color?: string;
}

const Socials: React.FC<Props> = ({ horizontal, color }) => {
  const Icon = ({ delay, link, icon }: IconProps) => (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1, 1.5, 1] }}
      transition={{ type: "spring", duration: 1, delay: delay }}
    >
      <a href={link} target="_blank">
        {icon}
      </a>
    </motion.div>
  );
  return (
    <IconList color={color} horizontal={horizontal!}>
      {/* <IconContainer> */}
      <Icon
        link="https://github.com/Jax247"
        icon={<Github width={25} height={25} />}
        delay={1.2}
      />
      <Icon
        link="https://www.linkedin.com/in/jewan-jeffries-257b37191/"
        delay={1}
        icon={<LinkedIn width={25} height={25} />}
      />
      {/* </IconContainer> */}
      <Line
        initial={horizontal ? { width: "0rem" } : { height: "0rem" }}
        animate={horizontal ? { width: "8rem" } : { height: "8rem" }}
        horizontal={horizontal || false}
        transition={{
          type: "spring",
          duration: 1,
          delay: 0.8,
        }}
        exit={horizontal ? { width: "0rem" } : { height: "0rem" }}
      />
    </IconList>
  );
};

export default Socials;
