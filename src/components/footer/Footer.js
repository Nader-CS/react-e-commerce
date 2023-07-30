import React from "react";
import classes from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={classes.footer}>
      &copy;{new Date().getFullYear()} All Rights reserved
    </div>
  );
};

export default Footer;
