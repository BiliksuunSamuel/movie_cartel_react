import { CssBaseline } from "@mui/material";
import React from "react";
import "./App.css";
import { useAppSelector } from "./app/hooks";
import { Loader } from "./components";
import { Router } from "./router";

export default function App() {
  const { loading } = useAppSelector((state) => state.ResponseReducer);
  return (
    <React.Fragment>
      <Loader loading={loading} />
      <CssBaseline />
      <Router />
    </React.Fragment>
  );
}
