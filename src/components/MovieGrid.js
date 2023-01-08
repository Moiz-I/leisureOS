import { useState, useContext } from "react";
import "../App.css";
import { MovieCard } from "./MovieCard";
import { GlobalContext } from "../context/GlobalState";
import Search from "./results";
import Popup from "reactjs-popup";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Select from "react-select";

export default function MovieGrid() {
  const { watchlist } = useContext(GlobalContext);
  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const options = [
    { value: "en_US", label: "🇺🇸US" },
    { value: "en_GB", label: "🇬🇧UK" },
    { value: "en_NG", label: "🇳🇬Nigeria" },
    { value: "en_IN", label: "🇮🇳India" },
  ];
  const { selectedCountry, changeCountry, removeMovie } =
    useContext(GlobalContext);
  console.log("Selectedcountry: ", selectedCountry);
  const [selectedOption, setSelectedOption] = useState(selectedCountry);

  const onCountryChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    removeMovie(1000);
    changeCountry(selectedOption);
  };

  return (
    <div className="movie-page">
      <Select
        defaultValue={selectedOption}
        onChange={onCountryChange}
        options={options}
        className="dropdown"
      />
      {/* <p>request a country</p> */}
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
            <button
              onClick={onOpenModal}
              className="movie-card add-movie-button"
            >
              <p>+</p>
            </button>
            <Modal open={open} onClose={onCloseModal} center>
              <Search closeModal={onCloseModal} locale={selectedOption.value} />
            </Modal>
            {/* <Popup
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
            </Popup> */}
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
                      locale={selectedOption.value}
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
                      locale={selectedOption.value}
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
