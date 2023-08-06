import React from "react";
import classes from "./CustomError.module.css";
import Alert from "react-bootstrap/Alert";

const CustomError = (props) => {
  if (props.error.includes("email-already-in-use")) {
    return (
      <div className={classes.alert}>Sorry this email is already exist</div>
    );
  }
  if (props.error.includes("weak-password")) {
    return <div className={classes.alert}>Password should be at least 6</div>;
  }
  if (props.error.includes("invalid-email")) {
    return <div className={classes.alert}>Sorry , This email is invalid</div>;
  }
  if (props.error.includes("network-request-failed")) {
    return <div className={classes.alert}>There is no Internet</div>;
  }
  if (props.error.includes("user-not-found")) {
    return <div className={classes.alert}>User does not exist</div>;
  }
  if (props.error.includes("too-many-requests")) {
    return (
      <div className={classes.alert}>Too many attempts , Try again later.</div>
    );
  }
  if (props.error.includes("wrong-password")) {
    return <div className={classes.alert}>Password is wrong</div>;
  }
  if (props.error.includes("user-not-found")) {
    return (
      <div className={classes.alert}>Sorry This information Not correct!</div>
    );
  }

  return <div className={classes.alert}>Unkown Error</div>;
};

export default CustomError;
