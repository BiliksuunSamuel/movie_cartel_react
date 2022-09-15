import { createSlice } from "@reduxjs/toolkit";
import { DirectorsReducerState } from "../../app/state";
import { GetDirectorsThunk } from "../../functions/directors";

export default createSlice({
  name: "DirectorsReducer",
  initialState: DirectorsReducerState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetDirectorsThunk.fulfilled, (state, action) => {
      state.directors = action.payload;
    });
  },
}).reducer;
