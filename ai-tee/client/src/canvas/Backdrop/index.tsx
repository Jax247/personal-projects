import React, { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
const index = () => {
  const shadowRef = useRef(null);

  return (
    <AccumulativeShadows
      position={[0, 0, -0.14]}
      ref={shadowRef}
      temporal
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      frames={60}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -8]}
      />
    </AccumulativeShadows>
  );
};

export default index;
