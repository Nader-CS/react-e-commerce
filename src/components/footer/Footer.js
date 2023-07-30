import React from "react";
import classes from "./Footer.module.scss";

const date = new Date();

const Footer = () => {
  return (
    <div className={classes.footer}>
      &copy;{date.getFullYear()} All Rights reserved
    </div>
  );
};

export default Footer;
