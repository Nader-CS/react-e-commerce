import React, { useState } from "react";
import classes from "./Register.module.scss";
import { Link } from "react-router-dom";
import registerImg from "../../../assets/register.png";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config.js";
import Loader from "../../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      toast.error("Passwords don't matches");
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("User is created...");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
        // ..
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={classes.auth}>
        <div className={classes.form}>
          <h2>Register</h2>
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
            <button type="submit" className="btn btn-primary btn-block">
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
