import React, { useRef } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import state from "../../store";
import { useSnapshot } from "valtio";
interface Props {
  children: React.ReactNode;
}
const index = ({ children }: Props) => {
  const snap = useSnapshot(state);
  const groupRef = useRef<THREE.Group | null>(null);
  const group = groupRef.current!;

  useFrame((state, delta) => {
    const mdbp = window.innerWidth <= 600;
    const lgbp = window.innerWidth <= 1250;

    //   set initial position
    let targetPos: [number, number, number] = [-0.4, 0, 2];
    if (snap.home) {
      if (lgbp) targetPos = [0, 0, 2];
      if (mdbp) targetPos = [0, 0.2, 2.5];
    } else {
      if (lgbp) targetPos = [0, 0, 2];
      if (mdbp) targetPos = [0, 0, 2.5];
    }
    //   Set Camera pos
    easing.damp3(state.camera.position, targetPos, 0.25, delta);

    // Set rotation of model with easing
    if (!group) return;

    easing.dampE(
      group.rotation,
      [state.pointer.y / 10, state.pointer.x / 5, 0], // x y z values for rotation
      0.25,
      delta
    );
  });
  return <group ref={groupRef}>{children}</group>;
};

export default index;
