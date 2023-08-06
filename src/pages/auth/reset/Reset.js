import React, { useEffect, useState } from "react";
import classes from "./Reset.module.scss";
import resetImg from "../../../assets/forgot.png";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/config.js";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import CustomError from "../../../components/custom-error/CustomError.js";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState({
    isError: false,
    errorMsg: "",
  });
  const navigate = useNavigate();
  const resetHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Check your email for a reset link");
        navigate("/login");
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorState({ isError: true, errorMsg: error.message });
        toast.error(error.message);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);
  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.auth}>
        <div className={classes["img-container"]}>
          <img src={resetImg} />
        </div>
        <div className={classes.form}>
          <h2>Reset</h2>
          {errorState.isError && <CustomError error={errorState.errorMsg} />}
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
            <button
              type="submit"
              className={`btn btn-primary btn-block ${
                !isEmailValid ? classes["disabled-button"] : ""
              }`}
              disabled={!isEmailValid}
            >
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
