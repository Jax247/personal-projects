import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { mediaQueries } from "../../ThemeProvider";
import Soundbar from "../Soundbar";
import NavLinkImport from "../../pages/Home/NavLink";

const Wrapper = styled.div`
  max-height: 100px;
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 2;
  padding: 0.5em 1em;

  @media (min-width: 450px) {
    padding: 2em 1em;
    width: 100%;
  }

  ${mediaQueries(50)`
      justify-content: center;
      gap: 15px;
  `};
`;

const Content = styled.div`
  max-width: 1280px;
  padding: 0 1.5rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${mediaQueries(50)`
      justify-content: center;
      gap: 15px;
  `};
`;

const RightNavGroup = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  /* max-width: max-content; */
  gap: 20px;
  ${mediaQueries(50)`
      gap: 40px;
      width: 100%;
  `};
`;
const NavGroup = styled.div`
  display: flex;
  /* width: 100%; */
  /* max-width: max-content; */
  gap: 20px;
  ${mediaQueries(50)`
      gap: 40px;
  `};
`;
const Logo = styled.a`
  font-size: 2rem;
  display: inline-block;
  color: ${(props) => props.theme.secondary};
  font-family: Great Vibes, cursive;
  cursor: pointer;
  margin: 0rem 1rem;
  z-index: 3;

  ${mediaQueries(40)`
      font-size:1.5em;
      left:1rem;
      top:2rem;
  `};
`;
const NavLinkContainer = styled.div`
  /* display: none; */
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: max-content;
`;
const NavLink = styled(NavLinkImport)`
  padding: 0.8em 1.25em;
`;

const Navbar = () => {
  const l = useLocation();
  const [location, setLocation] = useState("/");

  useEffect(() => setLocation((prev) => l.pathname), [l]);

  return (
    <Wrapper>
      <Content>
        <NavGroup>
          <Logo href="/">JJ</Logo>
          <Soundbar />
        </NavGroup>
        <RightNavGroup>
          <NavLinkContainer>
            <NavLink location={location} to={"/projects"} title="Projects" />
            <NavLink location={location} to={"/about"} title="About" />
            {/* <NavLink location={location} to={"/skills"} title="Skills" /> */}
            <NavLink
              location={location}
              to={"mailto:jewan.jeffries@gmail.com"}
              title="Contact Me"
            />
          </NavLinkContainer>
        </RightNavGroup>
      </Content>
    </Wrapper>
  );
};

export default Navbar;
