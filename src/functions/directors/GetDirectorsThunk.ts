import { GetRoutes } from "./../../api/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import controller from "../../controller";
import DirectorModel from "../../model/DirectorModel";

export default createAsyncThunk("api/directors/get", async () => {
  try {
    return await controller<DirectorModel[]>({
      url: GetRoutes.get_directors,
      method: "GET",
    });
  } catch (error) {
    throw error;
  }
});
