import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const authIsReady = useSelector((state) => state.auth.isAuthReady);
  if (authIsReady) {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  }
};

export default RootLayout;
