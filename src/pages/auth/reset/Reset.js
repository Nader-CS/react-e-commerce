import React, { useState } from "react";
import classes from "./Reset.module.scss";
import resetImg from "../../../assets/forgot.png";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/config.js";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const resetHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Check your email for a reset link");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.auth}>
        <div className={classes["img-container"]}>
          <img src={resetImg} />
        </div>
        <div className={classes.form}>
          <h2>Reset</h2>
          <form onSubmit={resetHandler}>
            <input
              type="email"
              placeholder="Email"
              onInput={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
            <button type="submit" className="btn btn-primary btn-block">
              Reset password
            </button>
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
    </>
  );
};

export default Reset;
