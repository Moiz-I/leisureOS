import { useEffect, useState, useContext } from "react";
import "../App.css";
import { MovieCard } from "./MovieCard";
import { GlobalContext } from "../context/GlobalState";
import blank from "../assets/blank.jpg";

export default function MovieGrid() {
  const { watchlist } = useContext(GlobalContext);

  return (
    <div className="movie-page">
      {watchlist.length > 0 ? (
        <div className="movie-grid">
          <button type="button" className="add-movie-button movie-card">
            add
          </button>
          {watchlist.map((movie) => {
            console.log("mappedmovie:", movie);
            const imgSource = movie[1];
            return (
              <div>
                <MovieCard
                  imgSource={imgSource}
                  name={movie[0]}
                  key={movie[0]}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <h2 className="no-movies">No movies in your list! Add some!</h2>
      )}
    </div>
  );
}
