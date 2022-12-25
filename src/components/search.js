import { useEffect, useState, useContext } from "react";
import "../App.css";
import axios from "axios";
import blank from "../assets/blank.jpg";
import { GlobalContext } from "../context/GlobalState";

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [added, setAdded] = useState([]);

  const { addMovieToWatchlist, watchlist } = useContext(GlobalContext);

  const addStuff = () => {
    setAdded((added) => [...added, selectedName]);
  };

  const handleClick = (event) => {
    // event.preventDefault();
    // console.log(event.target.attributes.valuename);
    // setSelectedName(event.target.attributes.valuename.value);
    // setSelectedImg(event.target.attributes.valueimage.value);
    // //console.log("selcted" + selectedName);
    // //addStuff();
    const nameValue = event.target.attributes.valuename.value;
    const imgValue = event.target.attributes.valueimage.value;
    console.log("watchlist0: ", watchlist);
    const movie = [nameValue, imgValue];
    addMovieToWatchlist(movie);
    console.log("watchlist1: ", watchlist);
    console.log("name: ", nameValue);
    console.log("image: ", imgValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${query}`
        );
        setMovies(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="search-container">
      <div className="search">
        <input
          type="text"
          placeholder={"Search movie"}
          className={"input"}
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
      </div>
      <div className="results">
        {movies.map((movie) => {
          const imgSource = movie.show.image?.medium
            ? movie.show.image.medium
            : blank;
          try {
            console.log(movie.show.name);
            return (
              <button
                type="button"
                className="movie-button"
                onClick={handleClick}
                value={movie}
                valuename={movie.show.name}
                valueimage={imgSource}
              >
                <div
                  className="movie-details"
                  valuename={movie.show.name}
                  valueimage={imgSource}
                >
                  <img src={imgSource} />
                  <p>{movie.show.name}</p>
                </div>
              </button>
            );
          } catch (error) {
            console.log(error);
          }
        })}
      </div>
      <div>
        <img src={selectedImg} />
        <p>{selectedName}</p>
      </div>
    </div>
  );
}
