import React from "react";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Loader = () => {
  return (
    <Box>
      <div className="lds-dual-ring"></div>
    </Box>
  );
};

export default Loader;
