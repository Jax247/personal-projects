import { icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled, { css } from "styled-components";
import { Project } from "./data";
import { Github } from "../../assets/svgs";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
} from "@fortawesome/fontawesome-svg-core";
import { motion } from "framer-motion";
import { Opacity } from "tsparticles-engine";

const githubIconLookup: IconLookup = { prefix: "fab", iconName: "github" };
const githubIconDefinition: IconDefinition =
  findIconDefinition(githubIconLookup);
const globeIconLookup: IconLookup = { prefix: "fab", iconName: "globe" };
const globeIconDefinition: IconDefinition = findIconDefinition(globeIconLookup);
const Container = styled.div`
  position: relative;
  /* background: rgba(255, 255, 255, 0.1); */
  border-radius: 25px;
  display: flex;
  height: 100%;
  opacity: 1;
`;

const Overlay = styled(motion.div)<{bps: { md: boolean; lg: boolean }}>`
background: #00000050;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  backdrop-filter: blur(5px);
  transform-style: preserve-3d;
  transform: perspective(1000px);
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;

`;
const CardImg = styled.img`
  border-radius: 25px;
  width: 100%;
  margin: 0 auto;
`;
const CardHeader = styled.h3`
  margin-top: 0;
  font-size: calc(20px + 0.5vw);
`;
const CardBody = styled.div`
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
  align-items: center;
`;
const CardBodyText = styled.div`
  min-height: 0;
`;
const ExtraContent = styled.div`
  /* display: flex; */
  /* gap: 5px; */
  width: 100%;
  /* flex-wrap: wrap; */
`;
const LinkContainer = styled.div`
  display: flex;
  gap: 20px;
  /* position: absolute; */
  bottom: 0;
  left: 0;
  width: 100%;
  /* padding: 0rem 10px; */
  margin-top: 10px;
`;
const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  text-align: center;
  padding: 8px 12px;
  border: 2px solid ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.secondary};
  border-radius: 24px;
  margin-bottom: 10px;
  svg {
    width: 16px;
    margin-right: 5px;
    fill: ${(props) => props.theme.secondary};
  }
`;

const LinkIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;
const TagContainer = styled.div<{ bps: { md: boolean; lg: boolean } }>`
  display: none;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 5px;

  ${(props) =>
    !props.bps.md &&
    css`
      display: flex;
    `}

  ${(props) =>
    !props.bps.lg &&
    css`
      min-height: 85px;
    `}
`;
const Tag = styled.div<{ color: string; bps: { md: boolean; lg: boolean } }>`
  background-color: ${(props) => (props.bps.lg ? "unset" : props.color)};
  width: min-content;
  display: none;
  max-height: ${(props) => (props.bps.lg ? "unset" : "25px")};
  align-items: center;
  padding: ${(props) => (props.bps.lg ? "0px" : "8px 12px")};
  border-radius: 20px;

  & img {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }

  ${(props) =>
    !props.bps.lg &&
    css`
      display: flex;
      /* max-height: unset; */
      & img {
        /* display: none; */
      }
    `}
`;

const ProjectCard: React.FC<Project> = ({
  name,
  type,
  tags,
  srcLink,
  liveLink,
  description,
  screenshotpath,
}) => {
  const smbp = window.innerWidth < 380;
  const mdbp = window.innerWidth < 750;
  const bp = window.innerWidth < 950;
  let bps = { sm: smbp, md: mdbp, lg: bp };
  return (
    <Container>
      <CardImg src={screenshotpath} alt={name} />

      <Overlay
      bps={bps}
        initial={{ opacity: bps.md ? 1 : 0 }}
        whileHover={{ opacity: 1 }}
      >
        <CardBody>
          <CardBodyText>
            <CardHeader>
              {name} - {type}
            </CardHeader>
            <p style={{ fontSize: "calc(16px + 0.25vw)" }}>
              {!bps.md && description}
            </p>
          </CardBodyText>

          <ExtraContent>
            <TagContainer bps={bps}>
              {tags.map(({ color, icon, name }) =>
                bps.lg ? (
                  <span style={{ color: "#fff" }}>&#35;{name}</span>
                ) : (
                  <Tag bps={bps} key={name} color={color}>
                    <img src={icon} alt={name} />
                    <span>{name}</span>
                  </Tag>
                )
              )}
            </TagContainer>
            <LinkContainer>
              <Link href={srcLink} target="_blank">
                <Github />
                <span>Source</span>
              </Link>
              <Link href={liveLink} target="_blank">
                <LinkIcon icon={faGlobe} />
                <span>Live</span>
              </Link>
            </LinkContainer>
          </ExtraContent>
        </CardBody>
      </Overlay>
    </Container>
  );
};

export default ProjectCard;
