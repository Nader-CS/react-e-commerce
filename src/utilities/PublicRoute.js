import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAuthReady = useSelector((state) => state.auth.isAuthReady);
  if (isAuthReady) {
    if (isLoggedIn) {
      return <Navigate to="/" />;
    } else {
      return <Outlet />;
    }
  }
}
