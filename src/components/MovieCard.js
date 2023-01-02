import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const MovieCard = ({ id, imgSource, name, link }) => {
  const { removeMovie, changeLink, watchlist } = useContext(GlobalContext);
  const editLink = () => {
    let newLink = prompt("enter link: ");
    if (!newLink.includes("https://")) {
      newLink = "https://" + newLink;
    }
    changeLink(id, newLink);
    let storedMovie = watchlist.find((o) => o[0] === id);
    watchlist[watchlist.indexOf(storedMovie)][3] = newLink;
  };
  return (
    <div className="movie-card">
      <a href={link}>
        <div className="overlay"></div>
        <img src={imgSource} alt={`${name} Poster`} />
      </a>
      <div className="inner-card-controls">
        <>
          <button className="ctrl-btn" onClick={() => editLink()}>
            <i className="fa-fw fa fa-pen-square"></i>
          </button>
          <button className="ctrl-btn" onClick={() => removeMovie(id)}>
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      </div>
      {/* <p>{name}</p> */}
    </div>
  );
};
