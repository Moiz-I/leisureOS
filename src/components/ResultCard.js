import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import blank from "../assets/blank.jpg";

export const ResultCard = ({ movie }) => {
  const { addMovieToWatchlist, watchlist } = useContext(GlobalContext);

  const isAdded = (id) => {
    let storedMovie = watchlist.find((o) => o[0] === id);
    const alreadyAdded = storedMovie ? true : false;
    if (alreadyAdded == "true") {
      console.log("truuuu");
    }
    console.log("test");
    return alreadyAdded;
  };
  const imgSource = movie.show.image?.medium ? movie.show.image.medium : blank;

  const handleClick = (event) => {
    // event.preventDefault();
    // console.log(event.target.attributes.valuename);
    // setSelectedName(event.target.attributes.valuename.value);
    // setSelectedImg(event.target.attributes.valueimage.value);
    // //console.log("selcted" + selectedName);
    // //addStuff();
    const nameValue = event.target.attributes.valuename.value;
    const imgValue = event.target.attributes.valueimage.value;
    const idValue = event.target.attributes.valueid.value;
    console.log("watchlist: ", watchlist);
    console.log("name: ", nameValue);
    console.log("id: ", idValue);
    console.log("isAdded:", isAdded(idValue));
    console.log("type: ", typeof isAdded(idValue));
    if (isAdded(idValue) == false) {
      let link = prompt("enter link: ");
      if (!link.includes("https://")) {
        link = "https://" + link;
      }
      const movie = [idValue, nameValue, imgValue, link];
      addMovieToWatchlist(movie);
    }
  };

  return (
    <button
      type="button"
      className="movie-button"
      disabled={isAdded(movie.show.id)}
      onClick={handleClick}
      valueid={movie.show.id}
      valuename={movie.show.name}
      valueimage={imgSource}
      key={movie.show.id}
    >
      <div
        className="movie-details"
        valueid={movie.show.id}
        valuename={movie.show.name}
        valueimage={imgSource}
        disabled={isAdded(movie.show.id)}
      >
        <img
          src={imgSource}
          valueid={movie.show.id}
          valuename={movie.show.name}
          valueimage={imgSource}
        />
        <p
          valueid={movie.show.id}
          valuename={movie.show.name}
          valueimage={imgSource}
        >
          {movie.show.name}
        </p>
      </div>
    </button>
  );
};
