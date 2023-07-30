import React from "react";
import classes from "./Login.module.scss";
import loginImg from "../../../assets/login.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  return (
    <div className={classes.auth}>
      <div className={classes["img-container"]}>
        <img src={loginImg} />
      </div>
      <div className={classes.form}>
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="password" required />
          <button className="btn btn-primary btn-block">Login</button>
          <div className={classes["links-container"]}>
            <Link to="/reset" className={classes.link}>
              Reset password
            </Link>
          </div>
          <p className={classes.text}>-- or --</p>
        </form>
        <button className="btn btn-secondary btn-block">
          <FaGoogle />
          Login with Google
        </button>
        <p>
          Don't have an account ?{" "}
          <Link to="/register" className={classes.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
