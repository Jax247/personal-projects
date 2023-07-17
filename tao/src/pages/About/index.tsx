import { color, motion } from "framer-motion";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Timeline, Tween } from "react-gsap";
import { AnimatedGridBG, ParticlesBG } from "../../components";
import SkillGrid from "./Grid";
import OctagonContainer from "./OctogonContainer";

const Wrapper = styled.div`
  height: 100vh;
`;
const Content = styled.div`
  display: flex;
  @media (max-width: 768px) {
flex-wrap: wrap;
  }
  padding: 20px;
  justify-content: center;
  color: white;
  gap: 4rem;
  /* width: 100%; */
  position: relative;
  top: 50%;
  z-index: 1;
  height: 75%;
  transform: translateY(-50%);
`;
const ContentContainer = styled.div`
  width: 100%;
  border-radius: 15px;
  border: 2px solid #00d998;
  max-width: 50%;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
`;
const AboutImage = styled.img`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
`;

const About = () => {
  // const ContentBlock:React.FC = () => {

  //   return (
  //     <>
  //       <Timeline>
  //         <Tween>
  //           Hello
  //         </Tween>
  //       </Timeline>
  //     </>
  //   );
  // };

  return (
    <Wrapper>
      <Suspense>
        <ParticlesBG />
        {/* <AnimatedGridBG/> */}
        <Content>
          <OctagonContainer
          // glareEnable={true}
          // tiltMaxAngleX={10}
          // tiltMaxAngleY={10}
          // perspective={1000}
          // glareColor={"rgb(255,255,255)"}
          >
            <div style={{ position: "relative" }}>
              <AboutImage src="/undraw-personal.svg" />
              <p>
                I'm a NYC based Web Developer from University at Buffalo who
                specializes in designing and building digital experiences. I
                have experience working with various various technologies,
                including HTML, CSS, JavaScript, React, Node.js, MongoDB, and
                PostgresSQL. I am passionate about creating dynamic and engaging
                user interfaces. I also pursue other fields of development such
                as Blockchain Development and Financial Trading automation.
              </p>

              <a href="#">Download CV</a>
            </div>
          </OctagonContainer>
          <OctagonContainer>
            <SkillGrid />
          </OctagonContainer>
        </Content>
      </Suspense>
    </Wrapper>
  );
};

export default About;
