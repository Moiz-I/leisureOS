import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
  }, [state]);

  // actions
  const addMovieToWatchlist = (movie) => {
    console.log("hi");
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  const removeMovie = (id) => {
    dispatch({ type: "REMOVE_MOVIE", payload: id });
  };

  const changeLink = (id, newLink) => {
    dispatch({ type: "CHANGE_LINK", payload: id, newLink });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        addMovieToWatchlist,
        removeMovie,
        changeLink,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
