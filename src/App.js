import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { Home, Contact, Login, Register, Reset } from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser, setIsAuthReady } from "./redux/slices/authSlice";
import Loader from "./components/loader/Loader";
import ProtectedRoute from "./utilities/ProtectedRoute";
import PublicRoute from "./utilities/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <Contact />,
        path: "contact",
      },
      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "reset", element: <Reset /> },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(setIsAuthReady({ isAuthReady: false }));
      if (user) {
        dispatch(
          setActiveUser({
            isLoggedIn: true,
            email: user.email,
            userId: user.uid,
            displayName: user.displayName,
          })
        );
      } else {
        console.log("There is no user logged in");
      }
      dispatch(setIsAuthReady({ isAuthReady: true }));
    });
  }, []);
  return (
    <>
      {!authData.isAuthReady && <Loader />}
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
