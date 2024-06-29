const storeReducer = (state, action) => {
  switch (action.type) {
    case "GET_REQUEST": {
      return { ...state, loading: true };
    }
    case "GET_FAIL": {
      return { ...state, loading: false, error: action.payload };
    }
    case "GET_SUCCESS": {
      return { ...state, loading: false, data: action.payload };
    }
    case "MOVIES": {
      localStorage.setItem("moviesList", JSON.stringify(action.payload));
      return { ...state, moviesList: action.payload };
    }
    case "ADD_ITEM": {
      const updatedMovies = {
        ...state.moviesList,
      };
      localStorage.setItem("moviesList", JSON.stringify(updatedMovies));
      return { ...state, loading: false, movies: updatedMovies };
    }
    case "REMOVE_ITEM": {
      const updatedMovies = {
        ...state,
        moviesList: state.moviesList.filter((item) => item.id === action.payload),
      };
      localStorage.setItem("moviesList", JSON.stringify(updatedMovies));
      return { ...state, loading: false, movies: updatedMovies };
    }
    case "UPDATE_ITEM": {
        const updatedMovies = {
          ...state,
          moviesList: state.moviesList.filter((item) => item.id !== action.payload.id),
        };
        localStorage.setItem("moviesList", JSON.stringify(updatedMovies));
        return { ...state, loading: false, movies: updatedMovies };
      }
    default:
      return { ...state };
  }
};

export default storeReducer;
