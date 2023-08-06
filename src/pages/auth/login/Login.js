import React, { useEffect, useState } from "react";
import classes from "./Login.module.scss";
import loginImg from "../../../assets/login.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/loader/Loader";
import CustomError from "../../../components/custom-error/CustomError";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailValid, setIsEmailVlaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState({
    isError: false,
    errorMsg: "",
  });
  const navigate = useNavigate();

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorState({ isError: false, errorMsg: "" });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Login Successfully...");
        navigate("/");
      })
      .catch((error) => {
        setErrorState({ isError: true, errorMsg: error.message });
        setIsLoading(false);
      });
  };
  const loginWithGoogleHandler = () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          toast.success("Loggin successfully...");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (e) {
      toast.error("Try again later");
    }
  };
  useEffect(() => {
    setIsPasswordValid(password.length >= 6);
  }, [password]);
  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailVlaid(emailRegex.test(email));
  }, [email]);

  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.auth}>
        <div className={classes["img-container"]}>
          <img src={loginImg} />
        </div>
        <div className={classes.form}>
          <h2>Login</h2>
          {errorState.isError && <CustomError error={errorState.errorMsg} />}
          <form onSubmit={loginSubmitHandler}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onInput={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onInput={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <button
              disabled={!isEmailValid || !isPasswordValid}
              type="submit"
              className={`btn btn-primary btn-block ${
                !isEmailValid || !isPasswordValid
                  ? classes["disabled-button"]
                  : ""
              }`}
            >
              Login
            </button>
            <div className={classes["links-container"]}>
              <Link to="/reset" className={classes.link}>
                Reset password
              </Link>
            </div>
            <p className={classes.text}>-- or --</p>
          </form>
          <button
            onClick={loginWithGoogleHandler}
            className="btn btn-secondary btn-block"
          >
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
    </>
  );
};

export default Login;
