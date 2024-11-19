// import ContextAPI:
import { AuthProvider } from "./contexts/AuthContext";
import { ContactContext } from "./contexts/ContactContext";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import component:
import LayOut from "./LayOut";
import {
  Dashboard,
  DecksPannel,
  Register,
  ProfilePannel,
  SingleDeck,
} from "./components";

import "./App.css";
import { getProfile } from "./servicess";
import useTokenStore from "./store/useTokenstate";

function App() {
  const localToken = localStorage.getItem("token");
  const { token, setToken, clearToken } = useTokenStore();

  const [completedDecks, setCompletedDecks] = useState(null);
  const [dueDecks, setDueDecks] = useState(null);

  const [completedPercent, setCompletedPercent] = useState(0);
  const [profile, setProfile] = useState({
    usename: "",
    email: "",
    image: "",
    first_name: "",
    last_name: "",
  });
  const [window, setWindow] = useState(true);

  // save Token into Token state:
  useEffect(() => {
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  // fetch profile data:
  const fetch_profile = async () => {
    try {
      const { data: profiledata } = await getProfile(token);
      setProfile({
        username: profiledata.username,
        email: profiledata.email,
        image: profiledata.profile_img,
        first_name: profiledata.first_name,
        last_name: profiledata.last_name,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetch_profile();
  }, [token]);

  const openCloseMenu = () => {
    setWindow(!window);
  };
  return (
    <>
      <Router>
        <AuthProvider>
          <ContactContext.Provider
            value={{
              profile: profile,
              dueDecks: dueDecks,
              completedDecks: completedDecks,
              setCompletedDecks: setCompletedDecks,
              setDueDecks: setDueDecks,
            }}
          >
            <Routes>
              <Route index element={<Register></Register>}></Route>
              <Route
                path="/"
                element={
                  <LayOut window={window} openCloseMenu={openCloseMenu} />
                }
              >
                <Route
                  path="/Dashboard"
                  element={
                    <Dashboard
                      dueDecks={dueDecks}
                      completedDecks={completedDecks}
                    />
                  }
                ></Route>
                <Route path="/Decks" element={<DecksPannel />}></Route>
                <Route path="/Profile" element={<ProfilePannel />}></Route>
                <Route path="/Decks/:id" element={<SingleDeck />}></Route>
              </Route>
            </Routes>
          </ContactContext.Provider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
