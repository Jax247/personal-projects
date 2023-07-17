import React from "react";
import styled, { css, keyframes } from "styled-components";

const planeMoveTop = keyframes`
from {
    background-position: 0px -100px,0px 0px;
  }
  to {
    background-position: 0px 0px, 100px 0px;
  }`;

const planeMoveBottom = keyframes`
  from {
    background-position: 0px 0px,0px 0px;
  }
  to {
    background-position: 0px 100px, 100px 0px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0 auto;
  perspective: 360px;
  perspective-origin: 50% 50%;

  @media (max-height: 350px) {
    .wrap {
      perspective: 210px;
    }
  }
`;
const Plane = styled.div<{ bottom?: boolean }>`
  width: 200%;
  height: 130%;
  position: absolute;
  bottom: -30%;
  left: -50%;
  background-image: -webkit-linear-gradient(#a2cef4 2px, transparent 2px),
    -webkit-linear-gradient(left, #a2cef4 2px, transparent 2px);
  background-size: 100px 100px, 100px 100px;
  background-position: -1px -1px, -1px -1px;
  transform: rotateX(85deg);
  animation: ${planeMoveTop} 2s infinite linear;

  ${(props) =>
    props.bottom &&
    css`
      transform: rotateX(-85deg);
      top: -30%;
      animation: ${planeMoveBottom} 2s infinite linear;
    `}
`;

const index = () => {
  return (
    <>
      <Wrapper>
        <Plane />
        <Plane bottom />
      </Wrapper>
    </>
  );
};

export default index;
