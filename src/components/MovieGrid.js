import { useState, useContext } from "react";
import "../App.css";
import { MovieCard } from "./MovieCard";
import { GlobalContext } from "../context/GlobalState";
import Search from "./results";
import Popup from "reactjs-popup";

export default function MovieGrid() {
  const { watchlist } = useContext(GlobalContext);
  const [query, setQuery] = useState("");

  return (
    <div className="movie-page">
      <div className="container">
        <div className="search-bar">
          <div className="inner">
            <input
              type="text"
              placeholder={"type to search"}
              className={"search-input"}
              onChange={(event) => setQuery(event.target.value)}
              value={query}
              autoFocus
            />
          </div>
        </div>
        {watchlist.length >= 0 ? (
          <div className="movie-grid">
            <Popup
              trigger={
                <button className="movie-card add-movie-button">
                  <p>+</p>
                </button>
              }
              position="left left"
              // offsetX={450}
              // offsetY={200}
            >
              <Search />
            </Popup>
            {watchlist.map((movie) => {
              if (movie[1].toLowerCase().includes(query.toLowerCase())) {
                const imgSource = movie[2];
                return (
                  <div>
                    <MovieCard
                      id={movie[0]}
                      imgSource={imgSource}
                      name={movie[1]}
                      link={movie[3]}
                      key={movie[0]}
                    />
                  </div>
                );
              } else if (query == "") {
                const imgSource = movie[2];
                return (
                  <div>
                    <MovieCard
                      id={movie[0]}
                      imgSource={imgSource}
                      name={movie[1]}
                      link={movie[3]}
                      key={movie[0]}
                    />
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <h2 className="no-movies">No movies in your list! Add some!</h2>
        )}
      </div>
    </div>
  );
}
