import { useEffect, useState, useContext } from "react";
import "../App.css";
import axios from "axios";
import { ResultCard } from "./ResultCard";

export default function Search() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

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
          placeholder={"Search a show"}
          className={"input"}
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
      </div>
      <div className="results">
        {movies.map((movie) => (
          <ResultCard movie={movie} />
        ))}
      </div>
    </div>
  );
}
