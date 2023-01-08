import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  selectedCountry: localStorage.getItem("selectedCountry")
    ? JSON.parse(localStorage.getItem("selectedCountry"))
    : [{ value: "en_GB", label: "🇬🇧UK" }],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem(
      "selectedCountry",
      JSON.stringify(state.selectedCountry)
    );
  }, [state]);

  // actions
  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  const removeMovie = (id) => {
    dispatch({ type: "REMOVE_MOVIE", payload: id });
  };

  const changeLink = (id, newLink) => {
    dispatch({ type: "CHANGE_LINK", payload: id, newLink });
  };
  const changeCountry = (option) => {
    dispatch({ type: "CHANGE_COUNTRY", payload: option });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        selectedCountry: state.selectedCountry,
        addMovieToWatchlist,
        removeMovie,
        changeLink,
        changeCountry,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
