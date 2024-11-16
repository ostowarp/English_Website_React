// import contexts:
import { useAuth } from "../contexts/AuthContext";

import { ContactContext } from "../contexts/ContactContext";
import { useContext, useEffect, useState } from "react";

// import styles:
import styles from "../Style/SearchBar.module.css";

// import icons:
import logouticon from "../assets/icons/logout.svg";
import searchicon from "../assets/icons/search.svg";
import moreicon from "../assets/icons/more.svg";
import notificationsicons from "../assets/icons/notifications.svg";

// import rouher:
import { useNavigate } from "react-router-dom";

// import component:
import { Box } from "@mui/material";

export default function SearchBar() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const { profile_name, profile } = useContext(ContactContext);
  const [more, setMore] = useState(false);
  return (
    <div className={styles.searchnotif}>
      <div className={styles.search}>
        <img src={searchicon} alt="Search" className={styles.searchicon} />
        <input
          type="text"
          className={styles.searchinput}
          placeholder="Serch your deck name..."
        />
      </div>
      <div className={styles.prof}>
        <span className={styles.notificationsicons}>
          <p>22</p>
          <img src={notificationsicons} alt="Notif" />
        </span>
        <span className={styles.useremail}>
          <h3>{profile.username}</h3>
          <Box sx={{ display: { md: "block", xs: "none" } }}>
            <p>{profile.email}</p>
          </Box>
        </span>
        <div className={styles.prof2}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              setMore(!more);
            }}
            className={styles.prof2}
          >
            <img src={profile.image} alt="Profile" className={styles.profile} />
            <img src={moreicon} alt="More" />
          </span>
          <div
            className={styles.more}
            style={{
              display: more ? "block" : "none",
            }}
          >
            <span
              onClick={() => {
                navigate("/profile");
              }}
              className={styles.logout}
            >
              <h3>
                {profile.first_name} {profile.last_name}
              </h3>
              <img src={moreicon} alt="More" style={{ rotate: "-90deg" }} />
            </span>
            <hr />
            <span
              onClick={() => {
                handleLogout();
                navigate("/");
              }}
              className={styles.logout}
            >
              <h3>Log Out</h3>
              <img src={logouticon} alt="Logout" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
