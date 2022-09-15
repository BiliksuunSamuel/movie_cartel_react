import { GetRoutes } from "./../../api/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GenericType } from "typescript";
import controller from "../../controller";
import MovieModel from "../../model/MovieModel";

export default createAsyncThunk("api/movies/handle", async () => {
  try {
    return await controller<MovieModel[]>({
      url: GetRoutes.get_movies,
      method: "GET",
    });
  } catch (error) {
    throw error;
  }
});
