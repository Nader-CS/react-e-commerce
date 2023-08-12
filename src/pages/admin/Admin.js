import React, { useState } from "react";
import classes from "./Admin.module.scss";
import Navbar from "../../components/admin/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { BsChevronDoubleRight } from "react-icons/bs";

const Admin = () => {
  const [hideNavbar, setHideNavbar] = useState(false);
  return (
    <div className={classes.admin}>
      {!hideNavbar && (
        <div className={classes.navbar}>
          <Navbar hideNavbar={hideNavbar} setHideNavbar={setHideNavbar} />
        </div>
      )}
      {hideNavbar && (
        <BsChevronDoubleRight
          size="25"
          className={classes["show-nav"]}
          onClick={() => {
            setHideNavbar(false);
          }}
        />
      )}
      <div
        className={`${classes.content} ${
          hideNavbar ? classes["full-width"] : ""
        }`}
      >
        <Outlet context={[hideNavbar, setHideNavbar]} />
      </div>
    </div>
  );
};

export default Admin;
