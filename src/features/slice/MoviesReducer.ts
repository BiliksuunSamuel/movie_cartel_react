import { MoviesReducerState } from "./../../app/state/index";
import { createSlice } from "@reduxjs/toolkit";
import { GetMoviesThunk } from "../../functions/movies";

export default createSlice({
  name: "MoviesReducer",
  initialState: MoviesReducerState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetMoviesThunk.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
}).reducer;
