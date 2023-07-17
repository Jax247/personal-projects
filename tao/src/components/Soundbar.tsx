import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Track from "../assets/audio/u-said-it-v13-1167.mp3";
import { mediaQueries } from "../ThemeProvider";

const SoundbarContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  z-index: 10;

  & > *:nth-child(1) {
    animation-delay: 0.2s;
  }
  & > *:nth-child(2) {
    animation-delay: 0.3s;
  }
  & > *:nth-child(3) {
    animation-delay: 0.4s;
  }
  & > *:nth-child(4) {
    animation-delay: 0.5s;
  }
  & > *:nth-child(5) {
    animation-delay: 0.8s;
  }

  ${mediaQueries(40)`
    left:1rem;
    top:10rem;
  `};
`;

const playIconAnimation = keyframes`
    0%{
        transform: scaleY(1)
    }
    50%{
        transform: scaleY(2)
    }
    100%{
        transform: scaleY(1)
    }
`;
const Line = styled.span<{ isPlaying: boolean }>`
  background: ${(props) => props.theme.secondary};
  border: 1px solid ${(props) => props.theme.body};

  animation: ${playIconAnimation} 1s ease infinite;
  animation-play-state: ${(props) => (props.isPlaying ? "running" : "paused")};
  height: 1rem;
  width: 2px;
  margin: 0 0.1rem;

  ${mediaQueries(40)`
      height:0.5rem;
      width:1px;

  `};
`;

const Soundbar = () => {
  // Use of the html audio tag is in order here
  // Create multiple verical lines to create the graphic
  // During play animate lines
  // will need state to track playback
  const [play, setPlay] = useState(false);
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    play ? ref.current?.play() : ref.current?.pause();
  }, [play]);

  return (
    <SoundbarContainer onClick={() => setPlay((prev) => !prev)}>
      <Line isPlaying={play} />
      <Line isPlaying={play} />
      <Line isPlaying={play} />
      <Line isPlaying={play} />
      <Line isPlaying={play} />
      <audio src={Track} loop ref={ref} />
    </SoundbarContainer>
  );
};

export default Soundbar;
