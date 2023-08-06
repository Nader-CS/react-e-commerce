import React, { useEffect } from "react";
import classes from "./Header.module.scss";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import Overlay from "../overlay/Overlay";
import { ImCross } from "react-icons/im";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { removeActiveUser } from "../../redux/slices/authSlice";
import { ShowOnLogin, HideOnLogin } from "../showOnLogin/ShowHideLinks";

const activeLink = ({ isActive }) => {
  return isActive ? `${classes["active-link"]}` : "";
};

const Header = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  console.log(authData);
  const navigate = useNavigate();
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

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeActiveUser());
        toast.success("Loutout Successfully...");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {showMenu && <Overlay hideMenu={hideMenu} />}
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
              {authData.isLoggedIn && authData.userName && (
                <Link to="/profile" className={classes.profile}>
                  <CgProfile className={classes["profile-icon"]} />
                  <p>
                    {authData.userName.charAt(0).toUpperCase() +
                      authData.userName.slice(1)}
                  </p>
                </Link>
              )}
              <HideOnLogin>
                {" "}
                <li>
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                </li>
              </HideOnLogin>

              <HideOnLogin>
                <li>
                  <NavLink to="/register" className={activeLink}>
                    Register
                  </NavLink>
                </li>
              </HideOnLogin>
              <ShowOnLogin>
                <li>
                  <NavLink to="/order-history" className={activeLink}>
                    My orders
                  </NavLink>
                </li>
              </ShowOnLogin>
              <ShowOnLogin>
                <li>
                  <Link to="/" onClick={logoutHandler}>
                    Logout
                  </Link>
                </li>
              </ShowOnLogin>
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
                {authData.isLoggedIn && authData.userName && (
                  <Link to="/profile" className={classes.profile}>
                    <CgProfile className={classes["profile-icon"]} />
                    <p>
                      {authData.userName.charAt(0).toUpperCase() +
                        authData.userName.slice(1)}
                    </p>
                  </Link>
                )}
                <ul>
                  <li>
                    <NavLink to="/" onClick={hideMenu} className={activeLink}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      onClick={hideMenu}
                      className={activeLink}
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <HideOnLogin>
                    <li>
                      <NavLink
                        to="/login"
                        onClick={hideMenu}
                        className={activeLink}
                      >
                        Login
                      </NavLink>
                    </li>
                  </HideOnLogin>
                  <HideOnLogin>
                    <li>
                      <NavLink
                        to="/register"
                        onClick={hideMenu}
                        className={activeLink}
                      >
                        Register
                      </NavLink>
                    </li>
                  </HideOnLogin>
                  <ShowOnLogin>
                    <li>
                      <NavLink
                        to="/order-history"
                        onClick={hideMenu}
                        className={activeLink}
                      >
                        My orders
                      </NavLink>
                    </li>
                  </ShowOnLogin>

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
