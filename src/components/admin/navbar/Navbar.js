import React, { useState } from "react";
import classes from "./Navbar.module.scss";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ImCross } from "react-icons/im";

const Navbar = (props) => {
  const name = useSelector((state) => state.auth.userName);
  return (
    <>
      {!props.hideNavbar && (
        <div className={classes.container}>
          <header className={classes["navbar-haeader"]}>
            <div>
              <ImCross
                size="13"
                className={classes["close-navbar"]}
                onClick={() => {
                  props.setHideNavbar(true);
                }}
              />
              <div>
                <CgProfile size="70" className={classes["profile-icon"]} />
              </div>
              <div className={classes["profile-name"]}>
                <p>{name}</p>
              </div>
            </div>
          </header>
          <main className={classes["main-container"]}>
            <nav className={classes.nav}>
              <ul>
                <li>
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      isActive ? `${classes["active-link"]}` : ""
                    }
                    end
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="all-products"
                    className={({ isActive }) =>
                      isActive ? `${classes["active-link"]}` : ""
                    }
                  >
                    View Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="add-products/new"
                    className={({ isActive }) =>
                      isActive ? `${classes["active-link"]}` : ""
                    }
                    end
                  >
                    Add Product
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="orders"
                    className={({ isActive }) =>
                      isActive ? `${classes["active-link"]}` : ""
                    }
                  >
                    View orders
                  </NavLink>
                </li>
              </ul>
            </nav>
          </main>
        </div>
      )}
    </>
  );
};

export default Navbar;
