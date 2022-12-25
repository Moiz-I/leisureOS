import React from "react";

export const MovieCard = ({ imgSource, name }) => {
  return (
    <div className="movie-card">
      <img src={imgSource} alt={`${name} Poster`} />
      <p>{name}</p>
    </div>
  );
};
