import logo from "./logo.svg";
import "./App.css";
import Search from "./components/search";
import MovieGrid from "./components/MovieGrid";
import Popup from "reactjs-popup";

import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <p>hi</p>
        <Popup
          trigger={<button> Trigger</button>}
          position="center center"
          offsetY={300}
        >
          <Search />
        </Popup>
        <MovieGrid />
      </div>
    </GlobalProvider>
  );
}

export default App;
