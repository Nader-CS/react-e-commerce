import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { Home, Contact, Login, Register, Reset } from "./pages";

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
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "reset", element: <Reset /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
