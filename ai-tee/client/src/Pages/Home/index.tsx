import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import {
  headContainerAnimation,
  headTextAnimation,
  slideAnimation,
  headContentAnimation,
} from "../../config/motion";
import state from "../../store";
import { Button } from "../../components";
const Home = () => {
  const data = useSnapshot(state); // passed State proxy

  return (
    <AnimatePresence>
      {data.home && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="./threejs.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </motion.header>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="xl:block hidden" /> DO IT!
              </h1>
            </motion.div>

            <motion.div {...headContentAnimation}>
              <p className="max-w-md">
                Create a unique custom T-shirt with our brand-new 3D
                customization tool.
              </p>
              <Button
                type="filled"
                text="Get Started"
                handler={() => {
                  state.home = false;
                }}
                styles="w-fit px-4 py-5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
