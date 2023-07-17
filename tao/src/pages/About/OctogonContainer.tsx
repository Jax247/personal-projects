import React, { ReactNode } from "react";
import styled from "styled-components";
import Tilt from "react-parallax-tilt";

const OctagonWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 800px;
  @media (min-width: 768px) {
    width: 45%;
  }
  z-index: 1;
  margin-right: 30px;
  margin-bottom: 30px;
`;

const Octagon = styled(Tilt)`
  background-color: #2e96ff;
  color: #000;
  padding: 1rem;
  text-align: center;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  clip-path: polygon(
    25% 0%,
    75% 0%,
    100% 25%,
    100% 75%,
    75% 100%,
    25% 100%,
    0% 75%,
    0% 25%
  );
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: -4px;
    left: -4px;
    background-color: #fff;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
    outline: 2px solid #00ff00;
    clip-path: polygon(
      29% 0%,
      71% 0%,
      100% 29%,
      100% 71%,
      71% 100%,
      29% 100%,
      0% 71%,
      0% 29%
    );
  }

  a {
    padding: 0.6rem 1rem;
    font-weight: bold;
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.secondary};
    border-radius: 20px;
  }
`;

interface OctagonContainerProps {
  children: ReactNode;
}

const OctagonContainer = ({ children }: OctagonContainerProps) => {
  return (
    <OctagonWrapper>
      <Octagon
        glareEnable={true}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        glareColor={"rgb(255,255,255)"}
      >
        {children}
      </Octagon>
    </OctagonWrapper>
  );
};

export default OctagonContainer;
