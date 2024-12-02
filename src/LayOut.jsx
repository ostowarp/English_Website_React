// import icons:
import dashboardicon from "./assets/icons/dashboard.svg";
import decksicon from "./assets/icons/decks.svg";
import profileicon from "./assets/icons/profile.svg";
import settingicon from "./assets/icons/setting.svg";
import { Box } from "@mui/material";

import { Outlet } from "react-router-dom";
import { NavbarMenu } from "./components";
export default function LayOut({ window, openCloseMenu }) {
  return (
    <>
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
      <Box
        sx={{
          width: {
            xs: "100%",
            md: window ? "calc(100% - 12.2rem)" : "calc(100% - 25.7rem)",
          },
          marginLeft: { xs: "", md: window ? "12.2rem" : "25.7rem" },
          marginTop: "3.4rem",
          transition: "0.3s",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
