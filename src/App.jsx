import React, { useEffect } from "react";
import { useState } from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import axios from "axios";
// import component:
import LayOut from "./LayOut";
import { NavbarMenu, Dashboard, DecksPannel, Register } from "./components";

import "./App.css";
import Grid from "@mui/material/Grid2";
import { getprofile } from "./servicess";

function App() {
  const [profile, setProfile] = useState();
  const [name, setName] = useState();
  const [window, setWindow] = useState(true);
  useEffect(() => {
    const fechData = async () => {
      try {
        const { data: profiledata } = await getprofile();
        console.log(profiledata);
        setProfile(profiledata.profile_img);
        setName(profiledata.name);
      } catch {
        console.log("error");
      }
    };
    fechData();
  }, []);

  const openCloseMenu = () => {
    setWindow(!window);
  };
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Register></Register>}></Route>
          <Route
            path="/"
            element={<LayOut window={window} openCloseMenu={openCloseMenu} />}
          >
            <Route
              path="/Dashboard"
              element={<Dashboard name={name} profile={profile} />}
            ></Route>
            <Route
              path="/Decks"
              element={<DecksPannel profile={profile} />}
            ></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
