import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";
import { stars } from "./config/stars.js";
const ParticlesBG = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    await console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={stars}
    />
  );
};

export default ParticlesBG;
