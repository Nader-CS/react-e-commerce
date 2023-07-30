import React from "react";
import classes from "./Reset.module.scss";
import resetImg from "../../../assets/forgot.png";
import { Link } from "react-router-dom";

const Reset = () => {
  return (
    <div className={classes.auth}>
      <div className={classes["img-container"]}>
        <img src={resetImg} />
      </div>
      <div className={classes.form}>
        <h2>Reset</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <button className="btn btn-primary btn-block">Login</button>
          <div className={classes["links-container"]}>
            <Link to="/login" className={classes.link}>
              Login
            </Link>
            <Link to="/register" className={classes.link}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;
