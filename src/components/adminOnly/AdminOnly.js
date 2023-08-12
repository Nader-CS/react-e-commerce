import { useSelector } from "react-redux";
import forbidden from "../../assets/forbidden.svg";
import classes from "./AdminOnly.module.scss";

export const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector((state) => state.auth.email);
  if (userEmail == process.env.REACT_APP_EMAIL) {
    return children;
  }
  return (
    <div className={classes.container}>
      <img src={forbidden} />
    </div>
  );
};
export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector((state) => state.auth.email);
  if (userEmail == process.env.REACT_APP_EMAIL) {
    return children;
  }
  return null;
};
