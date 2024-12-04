import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "../Style/NavbarMenu.module.css";

// import Components:
import { Box } from "@mui/material";

// import icons:
import closeicon from "../assets/icons/closemenu.svg";
import menuicon from "../assets/icons/menu.svg";
import logo from "../assets/logo.png";

const NavbarMenu = ({ li, setWindow, window }) => {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          transition: "0.3s",
          top: "2rem",
          left: { xs: window ? "-11rem" : "1.4rem", md: "1.4rem" },
          zIndex: "1000",
        }}
      >
        <nav
          style={{
            transition: "0.3s",
            width: window === false ? "243px" : "108px",
          }}
        >
          <div
            className={styles.navbar}
            style={{
              overflow: "hidden",
              width: window === false ? "243px" : "108px",
            }}
          >
            <Link to={"/dashboard"}>
              <img
                className={styles.logo}
                src={logo}
                alt="logo"
                onClick={() => setWindow(true)}
              />
            </Link>
            <ul className={styles.items}>
              {li.map((item, i) => (
                <NavLink
                  onClick={() => setWindow(true)}
                  to={item[2]}
                  key={i}
                  className={({ isActive }) =>
                    isActive ? `${styles.item} ${styles.active}` : styles.item
                  }
                  style={{
                    width: window ? "48px" : "100%",
                  }}
                >
                  <img src={item[1]} alt={item[1]} />
                  <li
                    className="navbar__li"
                    style={{
                      opacity: window === false ? "100%" : "0",
                      width: window === false ? "100%" : "0",
                      marginLeft: "6px",
                    }}
                  >
                    {item[0]}
                  </li>
                </NavLink>
              ))}
            </ul>
            <Box
              display={{ xs: "none", md: "block" }}
              className={styles.burger}
            >
              <img
                src={window ? menuicon : closeicon}
                alt="burger"
                onClick={() => setWindow(!window)}
              />
            </Box>
          </div>
          <Box
            position={"absolute"}
            top={"6rem"}
            right={"-4.2rem"}
            display={{ xs: "block", md: "none" }}
            className={styles.burger}
          >
            <img
              style={{
                paddingLeft: "2rem",
                backgroundColor: "black",
                borderRadius: "5rem",
              }}
              src={window ? menuicon : closeicon}
              alt="burger"
              onClick={() => setWindow(!window)}
            />
          </Box>
        </nav>
      </Box>
    </>
  );
};

export default NavbarMenu;
