import { Outlet } from "react-router-dom";
import { NavbarMenu } from "./components";
export default function LayOut({ window, openCloseMenu }) {
  return (
    <>
      {/* <h1>hello</h1> */}
      <NavbarMenu
        li={[
          ["Dashboard", "icon/dashboard.svg", "/dashboard"],
          ["Decks", "icon/decks.svg", "/decks"],
          ["Profie", "icon/profile.svg", "/profile"],
          ["Setting", "icon/setting.svg", "/setting"],
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
