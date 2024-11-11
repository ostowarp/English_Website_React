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

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxMTk0NTE2LCJpYXQiOjE3MzExNTg1MTYsImp0aSI6ImIzMzQ2ZDEyMGM2MTQxMGE4ZjZkZTM2NDU5NDU5MTYxIiwidXNlcl9pZCI6N30.OvkmyqHUCKXHzH5n70eMa1hNBTmSWjK9V6SdX-OXwK8";

function App() {
  const [profile, setProfile] = useState();
  const [name, setName] = useState();
  const [window, setWindow] = useState(true);
  useEffect(() => {
    const fechData = async () => {
      try {
        const { data: profiledata } = await axios.get(
          "http://127.0.0.1:8000/api/getnameprof/"
        );
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
