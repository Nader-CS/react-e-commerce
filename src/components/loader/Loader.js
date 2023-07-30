import React from "react";
import { createPortal } from "react-dom";
import classes from "./Loader.module.scss";

const Loader = () => {
  return createPortal(
    <div className={classes["loader-wrapper"]}>
      <span className={classes.loader}></span>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
