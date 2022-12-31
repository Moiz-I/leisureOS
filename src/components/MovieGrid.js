import { useEffect, useState, useContext } from "react";
import "../App.css";
import { MovieCard } from "./MovieCard";
import { GlobalContext } from "../context/GlobalState";
import blank from "../assets/blank.jpg";
import Search from "./results";
import Popup from "reactjs-popup";

export default function MovieGrid() {
  const { watchlist } = useContext(GlobalContext);

  return (
    <div className="movie-page">
      <div className="container">
        {watchlist.length >= 0 ? (
          <div className="movie-grid">
            <Popup
              trigger={
                <button className="movie-card add-movie-button"> Add</button>
              }
              position="center center"
              offsetX={450}
              offsetY={200}
            >
              <Search />
            </Popup>
            {watchlist.map((movie) => {
              console.log("mappedmovie:", movie);
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
            })}
          </div>
        ) : (
          <h2 className="no-movies">No movies in your list! Add some!</h2>
        )}
      </div>
    </div>
  );
}
