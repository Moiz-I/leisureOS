import logo from "./logo.svg";
import "./App.css";
import Search from "./components/results";
import MovieGrid from "./components/MovieGrid";
import Popup from "reactjs-popup";
import "./lib/font-awesome/css/all.min.css";

import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <p>hi</p>
        <MovieGrid />
      </div>
    </GlobalProvider>
  );
}

export default App;
