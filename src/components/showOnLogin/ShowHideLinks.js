import { useSelector } from "react-redux";

export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const HideOnLogin = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};
