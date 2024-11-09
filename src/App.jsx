import React from "react";
import { useState } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import component:
import { NavbarMenu, Dashboard, DecksPannel } from "./components";

import "./App.css";
import Grid from "@mui/material/Grid2";

function App() {
  const [window, setWindow] = useState(true);
  const openCloseMenu = () => {
    setWindow(!window);
  };
  return (
    <>
      <Router>
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
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />}></Route>
            <Route path="/Decks" element={<DecksPannel />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
