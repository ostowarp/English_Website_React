// import ContextAPI:
import { AuthProvider } from "./contexts/AuthContext";

import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import component:
import LayOut from "./LayOut";
import { Dashboard, DecksPannel, Register } from "./components";

import "./App.css";
import Grid from "@mui/material/Grid2";
import { getDeckComplete, getprofile, getDecks } from "./servicess";
import useTokenStore from "./store/useTokenstate";

function App() {
  const localToken = localStorage.getItem("token");
  const { token, setToken, clearToken } = useTokenStore();

  const [completedDecks, setCompletedDecks] = useState();
  const [dueDecks, setDueDecks] = useState();
  const [profile, setProfile] = useState();
  const [name, setName] = useState();
  const [window, setWindow] = useState(true);

  const [allDecks, setAllDecks] = useState([]);
  useEffect(() => {
    if (localToken) {
      setToken(localToken);
    }
  }, []);
  useEffect(() => {
    const fechData = async () => {
      try {
        const { data: profiledata } = await getprofile(token);
        const { data: decksdata } = await getDeckComplete(token);

        setCompletedDecks(decksdata.completed_decks);
        setDueDecks(decksdata.due_decks);
        console.log(decksdata);

        setProfile(profiledata.profile_img);
        setName(profiledata.name);
      } catch {
        console.log("error");
      }
    };
    fechData();
  }, [token]);

  const openCloseMenu = () => {
    setWindow(!window);
  };
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route index element={<Register></Register>}></Route>
            <Route
              path="/"
              element={<LayOut window={window} openCloseMenu={openCloseMenu} />}
            >
              <Route
                path="/Dashboard"
                element={
                  <Dashboard
                    dueDecks={dueDecks}
                    completedDecks={completedDecks}
                    name={name}
                    profile={profile}
                  />
                }
              ></Route>
              <Route
                path="/Decks"
                element={<DecksPannel profile={profile} />}
              ></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
