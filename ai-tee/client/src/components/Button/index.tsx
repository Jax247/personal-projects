import React, { CSSProperties } from "react";
import state from "../../store";
import { useSnapshot } from "valtio";
import { getContrastingColor } from "../../config/helpers";

interface Props {
  type: string;
  text: string;
  styles?: string;
  handler: () => void;
}

const Button: React.FC<Props> = ({ type, text, handler, styles }) => {
  const snap = useSnapshot(state)
    const dynamicStyles: {[key: string]: CSSProperties} = {
    filled:{
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
    },
    outlined:{
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color
    }
  };

  return (
    <button
      onClick={handler}
      className={`px-2 py-1.5 flex-1 rounded-md${styles}`}
      style={dynamicStyles[type]}
    >
      {text}
    </button>
  );
};

export default Button;
