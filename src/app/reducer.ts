import { combineReducers } from "@reduxjs/toolkit";
import {
  ResponseReducer,
  DirectorsReducer,
  MoviesReducer,
} from "../features/slice";
export default combineReducers({
  ResponseReducer,
  MoviesReducer,
  DirectorsReducer,
});
