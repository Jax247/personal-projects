import React from "react";
import state from "../../store";
import { useSnapshot } from "valtio";
import { motion } from "framer-motion";
interface Props {
  tab: { name: string; icon: string };
  handler: () => void;
  isFilter?: boolean;
  isActive: boolean;
}
const index: React.FC<Props> = ({
  tab,
  isActive = false,
  isFilter,
  handler,
}) => {
  const snap = useSnapshot(state);

  const activeStyles =
    isFilter && isActive
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : { backgroundColor: snap.color, opacity: 0.5 };

  return (
    <motion.div
      key={tab.name}
      className={`tab-btn ${
        isFilter ? "rounded-full glassmorphism: rounded-4" : "rounded-4"
      } `}
      style={isActive ? activeStyles : {}}
      onClick={handler}
      whileHover={{ scale: 1.2 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={tab.icon}
        alt={tab.name}
        className={`${
          isFilter ? "w-2/3 h-2/3" : "w-11/12 h-11/12 object-contain"
        }`}
      />
    </motion.div>
  );
};

export default index;
