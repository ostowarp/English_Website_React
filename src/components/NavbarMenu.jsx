import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "../Style/NavbarMenu.module.css";

// import icons:
import menuicon from "../assets/icons/menu.svg";
import logo from "../assets/logo.png";

const NavbarMenu = ({ li, openClose, window }) => {
  return (
    <nav
      className={styles.navbar}
      style={{
        width: window === false ? "243px" : "108px",
        overflow: "hidden",
      }}
    >
      <Link to={"/dashboard"}>
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>
      <ul className={styles.items}>
        {li.map((item, i) => (
          <NavLink
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
      <div className={styles.burger} onClick={() => openClose()}>
        <img src={menuicon} alt="burger" />
      </div>
    </nav>
  );
};

export default NavbarMenu;
