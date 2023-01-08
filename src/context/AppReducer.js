export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    case "REMOVE_MOVIE":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie[0] !== action.payload
        ),
      };
    case "CHANGE_LINK":
      return {
        ...state,
      };
    case "CHANGE_COUNTRY":
      return {
        ...state,
        selectedCountry: action.payload,
      };
    default:
      return state;
  }
};
