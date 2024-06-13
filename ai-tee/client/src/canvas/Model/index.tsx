import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../../store/";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

interface GLTFRes extends GLTF {
  nodes: {
    T_Shirt_male: THREE.Mesh; // Triangle structures
  };
  materials: {
    lambert1: THREE.MeshStandardMaterial;
  };
}

const index = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("./shirt_baked.glb") as unknown as GLTFRes;

  console.log("Nodes", nodes);
  console.log("Materials", materials);

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  console.log("Textures", logoTexture, fullTexture);

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  // Render a 3D model on the artilcle of clothing to be customized
  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {/* Only Logo Texture */}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            // anisotrophy={16}
            depthTest={false}
            // depthWrite={true}
          />
        )}

        {/* Full texture to go over shirt */}
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
      </mesh>
    </group>
  );
};

export default index;
