import "./App.css";
import React, { useState, useContext } from "react";
import MovieGrid from "./components/MovieGrid";
import Select from "react-select";
import { GlobalProvider, GlobalContext } from "./context/GlobalState";
import "./lib/font-awesome/css/all.min.css";
import ReactGA from "react-ga";
const TRACKING_ID = "G-D10ZBLTCT7"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <MovieGrid />
        <a href="https:/twitter.com/Moiz_zzz">
          <p className="promo">Built with 💛 by Moiz</p>
        </a>
      </div>
    </GlobalProvider>
  );
}

export default App;
