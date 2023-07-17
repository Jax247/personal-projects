import { motion } from "framer-motion";
import React, { lazy, Suspense, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Loader from "../../Loader";
import { projects as data } from "./data";
import ProjectCard from "./ProjectCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Socials = lazy(() => import("../../components/Socials"));

const MainContainer = styled.div`
  height: 400vh;
  /* height: calc(100vh + 500px); */
  /* overflow: hidden; */
  background: linear-gradient(
    146deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  background: rgb(0, 0, 0);
  & .splide,
  & .splide__track {
    height: 100%;
  }
`;

const SplideRoot = styled(Splide)``;
const ProjectCardSlide = styled(SplideSlide)`
  padding: 30px;
  display: flex;
  align-items: center;
`;
const ProjectCardStage = styled.div`
  min-width: calc(300px + 10vw);
  margin: 0 auto;
  max-width: 800px;
`;
const IntroFrames = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-200px);
      }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
`;
const CardTrack = styled(motion.div)`
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
  /* display: flex;
  align-items: center; */
  /* gap: calc(12px + 6vw); */
  width: 100%;
  height: 65vh;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);

  &::-webkit-scrollbar {
    display: none;
  }
  /* & > div {
    transform: translateY(-200px);
    opacity:0;
    animation: ${IntroFrames} 0.5s ease-in-out forwards;
  }

  & > div:nth-child(2) {
    animation-delay: 500ms;
  }
  & > div:nth-child(3) {
    animation-delay: 1000ms;
  }
  & > div:nth-child(4) {
    animation-delay: 1500ms;
  }
  & > div:nth-child(5) {
    animation-delay: 2000ms;
  } */
`;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
`;

const YinYang = styled.img`
  width: 50px;
  height: 50px;
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  background-color: #ffffff;
  border-radius: 50%;
  border: 2px solid #000;
`;

const TrackContainer = {
  hidden: {
    // opacity: 0
  },
  show: {
    // opacity: 1,
    // transition: {
    //   staggerChildren: 0.5,
    //   duration: 0.5,
    // },
  },
};
const f = styled.div``;

const Projects = () => {
  const track = useRef<HTMLDivElement>(null);
  const rotateRef = useRef<HTMLImageElement>(null);
  const height = window.screen.width;

  useEffect(() => {
    let trackEl = track.current;
    let rotateEl = rotateRef.current;
    let current = -1;
    const scroll = () => {
      // Align image rotation with scroll level
      let offset = window.scrollY;
      let dif = Math.abs(current - offset);

      //  Calculate height of container element
      const trackWidth = trackEl;

      if (offset > current) {
        // Downward movement
        trackEl!.scrollBy(dif, 0);
        rotateEl!.style.transform = `rotate(${current + dif}deg)`;
      } else if (dif < current) {
        // Upward Movement
        trackEl!.scrollBy(-dif, 0);
        rotateEl!.style.transform = `rotate(${current - dif}deg)`;
      }
      current = offset;
    };

    addEventListener("scroll", scroll);

    return () => {
      removeEventListener("scroll", scroll);
    };
  }, []);

  return (
    <MainContainer>
      <Suspense fallback={<Loader />}>
        <Socials horizontal color="#fff" />
        <CardTrack
          // ref={track}
          variants={TrackContainer}
          initial="hidden"
          animate="show"
        >
          <Splide aria-label="My Caro">
            {data.map((projectData, index) => (
              <ProjectCardSlide>
                <ProjectCardStage>
                  <ProjectCard
                    key={index}
                    name={projectData.name}
                    type={projectData.type}
                    tags={projectData.tags}
                    liveLink={projectData.liveLink}
                    srcLink={projectData.srcLink}
                    description={projectData.description}
                    screenshotpath={projectData.screenshotpath}
                  />
                </ProjectCardStage>
              </ProjectCardSlide>
            ))}
          </Splide>
        </CardTrack>
        <BottomBar>
          <YinYang src="/svg/yin-yang-solid.svg" ref={rotateRef} />
        </BottomBar>
      </Suspense>
    </MainContainer>
  );
};

export default Projects;
