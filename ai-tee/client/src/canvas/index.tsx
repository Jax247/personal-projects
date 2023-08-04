import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Model from "./Model";
import CameraRig from "./CameraRig";
import Backdrop from "./Backdrop";

const index = () => {
  return (
    <Canvas 
    className="w-full max-w-full h-full transition-all ease-in"
    camera={{position: [0,0,0], fov: 35}}
    gl={{preserveDrawingBuffer: true}}
    shadows
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city"/>
      <CameraRig>
        {/* <Backdrop /> */}
        <Center>
          <Model />
        </Center>

      </CameraRig>
    </Canvas>
  );
};

export default index;
