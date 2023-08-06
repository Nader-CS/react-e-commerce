import React, { useEffect, useState } from "react";
import classes from "./Register.module.scss";
import { Link } from "react-router-dom";
import registerImg from "../../../assets/register.png";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/config.js";
import Loader from "../../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveUser, setDisplayName } from "../../../redux/slices/authSlice";
import CustomError from "../../../components/custom-error/CustomError.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState({
    isError: false,
    errorMsg: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setErrorState({ isError: false, errorMsg: "" });
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          setActiveUser({
            isLoggedIn: true,
            email: user.email,
            userId: user.uid,
          })
        );

        updateProfile(auth.currentUser, { displayName: username })
          .then(() => {
            dispatch(setDisplayName({ displayName: username }));
          })
          .catch((e) => {
            console.log("error while updating displayName");
          });
        setIsLoading(false);
        toast.success("User is created...");
        navigate("/");
      })
      .catch((error) => {
        setErrorState({ isError: true, errorMsg: error.message });
        setIsLoading(false);
      });
  };
  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);
  useEffect(() => {
    setIsPasswordValid(password == confirmPassword && password.length >= 6);
  }, [password, confirmPassword]);
  useEffect(() => {
    setIsUsernameValid(username.length >= 3);
  }, [username]);

  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.auth}>
        <div className={classes.form}>
          <h2>Register</h2>
          {errorState.isError && <CustomError error={errorState.errorMsg} />}
          <form onSubmit={formSubmitHandler}>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onInput={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <input
              type="text"
              value={username}
              placeholder="Username"
              onInput={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onInput={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm passowrd"
              onInput={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
            />
            <button
              type="submit"
              disabled={!isEmailValid || !isPasswordValid || !isUsernameValid}
              className={`btn btn-primary btn-block ${
                !isEmailValid || !isPasswordValid || !isUsernameValid
                  ? classes["disabled-button"]
                  : ""
              }`}
            >
              Register
            </button>
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
    </>
  );
};

export default Register;
