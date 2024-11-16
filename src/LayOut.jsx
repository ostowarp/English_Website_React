// import icons:
import dashboardicon from "./assets/icons/dashboard.svg";
import decksicon from "./assets/icons/decks.svg";
import profileicon from "./assets/icons/profile.svg";
import settingicon from "./assets/icons/setting.svg";

import { Outlet } from "react-router-dom";
import { NavbarMenu } from "./components";
export default function LayOut({ window, openCloseMenu }) {
  return (
    <>
      {/* <h1>hello</h1> */}
      <NavbarMenu
        li={[
          ["Dashboard", dashboardicon, "/dashboard"],
          ["Decks", decksicon, "/decks"],
          ["Profie", profileicon, "/profile"],
          ["Setting", settingicon, "/setting"],
        ]}
        window={window}
        openClose={openCloseMenu}
      />
      <div className={`content ${window ? "" : "menuopen"}`}>
        <Outlet />
      </div>
    </>
  );
}
