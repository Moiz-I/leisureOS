import { useEffect, useState, useContext } from "react";
import "../App.css";
import axios from "axios";
import { ResultCard } from "./ResultCard";
import { AddLink } from "./AddLink";

export default function Search(props) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const [isSelected, setIsSelected] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState("");

  const handleSelect = (returnedMovie) => {
    console.log("selected");
    setIsSelected(true);
    setSelectedMovie(returnedMovie);
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
      {isSelected ? (
        <AddLink
          edit={false}
          movie={selectedMovie}
          closeModal={props.closeModal}
          locale={props.locale}
        />
      ) : (
        <>
          <div className="search">
            <input
              type="text"
              placeholder={"Search for a show"}
              className={"input"}
              onChange={(event) => setQuery(event.target.value)}
              value={query}
            />
          </div>
          <div className="results">
            {movies.map((movie) => (
              <ResultCard movie={movie} onSelectShow={handleSelect} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
