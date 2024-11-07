import React from "react";
import { useState } from "react";
import NavbarMenu from "./components/NavbarMenu";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Dashboard } from "./components";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavbarMenu />
      <Router>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
