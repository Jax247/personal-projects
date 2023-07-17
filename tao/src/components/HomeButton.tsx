import React from "react";
import styled from "styled-components";

// Fixed point of entry for all Pages

const HomeButtonContainer = styled.button`
position: fixed;
top: 2em;
left: 50%;
transform: translate(-50%, 0%);
`;

const HomeButton = () => {
  return <HomeButtonContainer>HomeButton</HomeButtonContainer>;
};

export default HomeButton;
