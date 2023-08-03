import React from "react";
import { createPortal } from "react-dom";

const Overlay = (props) => {
  return createPortal(
    <div>
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.2)",
          zIndex: 1,
        }}
        onClick={props.hideMenu}
      ></div>
    </div>,
    document.getElementById("overlay")
  );
};

export default Overlay;
