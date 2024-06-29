import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import storeReducer from "../reducers/storeReducer";

export const Store = createContext();
const initialState = {
  moviesList: localStorage.getItem("moviesList")
    ? JSON.parse(localStorage.getItem("moviesList"))
    : [],
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const body = { state, dispatch };
  return <Store.Provider value={body}>{children}</Store.Provider>;
};
StoreProvider.propTypes = { children: PropTypes.node };
