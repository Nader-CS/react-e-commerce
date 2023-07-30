import React from "react";
import classes from "./Header.module.scss";
import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ImCross } from "react-icons/im";
import { useEffect } from "react";

const activeLink = ({ isActive }) => {
  return isActive ? `${classes["active-link"]}` : "";
};

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (showMenu && window.innerWidth >= 662) {
        hideMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showMenu]);
  return (
    <>
      {showMenu &&
        createPortal(
          <div>
            <div
              style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.2)",
                zIndex: 1,
              }}
              onClick={hideMenu}
            ></div>
          </div>,
          document.getElementById("overlay")
        )}
      <header>
        <div className={classes.container}>
          <div>
            <Link to="/" className={classes.link}>
              <h2>
                e<span>Shop</span>
              </h2>
            </Link>
          </div>
          <nav className={classes.nav}>
            <ul>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          <nav className={classes.nav}>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/order-history">My orders</Link>
              </li>
              <li>
                <Link to="/cart">
                  Cart
                  <span>
                    <FaShoppingCart size={20} />
                    <span className={classes["items-number"]}>5</span>
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className={classes["menu-icon"]}>
            <nav>
              <ul>
                <li>
                  <Link to="/cart">
                    Cart
                    <span>
                      <FaShoppingCart size={20} />
                      <span className={classes["items-number"]}>5</span>
                    </span>
                  </Link>
                </li>
                <li>
                  {
                    <GiHamburgerMenu
                      size={25}
                      color="white"
                      className={classes["hamburger"]}
                      onClick={toggleMenu}
                    />
                  }
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {showMenu && (
          <div className={classes["mobile-menu"]}>
            <div className={classes["mobile-menu-container"]}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-around",
                }}
              >
                <Link to="/" className={classes.link}>
                  <h2>
                    e<span>Shop</span>
                  </h2>
                </Link>
                <ImCross
                  color="red"
                  onClick={hideMenu}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div>
                <ul>
                  <li>
                    <Link to="/" onClick={hideMenu}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={hideMenu}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>
                    <Link to="/login" onClick={hideMenu}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={hideMenu}>
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/order-history" onClick={hideMenu}>
                      My orders
                    </Link>
                  </li>
                  <li>
                    <div className={classes["cart-items-number-mobile"]}>
                      <Link to="/cart" onClick={hideMenu}>
                        Cart
                        <span>
                          <FaShoppingCart size={20} />
                          <span className={classes["items-number"]}>5</span>
                        </span>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
