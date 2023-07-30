import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { Home, Contact } from "./pages";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
