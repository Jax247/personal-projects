import { proxy } from "valtio";

type InitialState =
  | {
      home: boolean;
      color: string;
      isLogoTexture: boolean; // Are we displaying logo
      isFullTexture: boolean;
      logoDecal: string;
      fullDecal: string;
    }

  const init: InitialState = {
  home: true,
  color: "hsl(240, 100%, 50%)",
  isLogoTexture: true, // Are we displaying logo
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
}

const state = proxy(init);

export default state;
