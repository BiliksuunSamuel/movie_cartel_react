import { createSlice } from "@reduxjs/toolkit";
import { ResponseReducerState } from "../../app/state";
import { GetDirectorsThunk } from "../../functions/directors";
import { GetMoviesThunk } from "../../functions/movies";

const ResponseReducer = createSlice({
  name: "ResponseReducer",
  initialState: ResponseReducerState,
  reducers: {
    RequestPending: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    RequestFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    RequestSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    ClearRequest: (state) => {
      state = ResponseReducerState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetDirectorsThunk.pending, (state) => {
        state.error = null;
        state.message = null;
        state.loading = true;
      })
      .addCase(GetDirectorsThunk.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
        state.message = null;
      })
      .addCase(GetDirectorsThunk.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.error.message;
      })
      .addCase(GetMoviesThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(GetMoviesThunk.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
        state.message = null;
      })
      .addCase(GetMoviesThunk.rejected, (state, action) => {
        state.loading = false;
        state.message = null;
        state.error = action.error.message;
      });
  },
});

export default ResponseReducer.reducer;
export const { RequestFailed, RequestPending, RequestSuccess, ClearRequest } =
  ResponseReducer.actions;
