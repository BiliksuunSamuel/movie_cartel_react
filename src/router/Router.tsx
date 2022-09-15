import React from "react";
import { BrowserRouter } from "react-router-dom";
import HomeRouter from "./HomeRouter";
export default function Router() {
  return (
    <BrowserRouter>
      <HomeRouter />
    </BrowserRouter>
  );
}
