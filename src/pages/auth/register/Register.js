import React from "react";
import classes from "./Register.module.scss";
import { Link } from "react-router-dom";
import registerImg from "../../../assets/register.png";

const Register = () => {
  return (
    <div className={classes.auth}>
      <div className={classes.form}>
        <h2>Register</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm passowrd" required />
          <button className="btn btn-primary btn-block">Register</button>
          <div className={classes["links-container"]}>
            <Link to="/reset" className={classes.link}>
              Reset password
            </Link>
          </div>
        </form>
        <p className={classes.text}>
          Have an account ?
          <Link to="/login" className={classes.link}>
            Login
          </Link>
        </p>
      </div>
      <div className={classes["img-container"]}>
        <img src={registerImg} />
      </div>
    </div>
  );
};

export default Register;
