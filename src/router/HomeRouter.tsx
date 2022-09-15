import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  DirectorInfoPage,
  HomePage,
  MovieInfoPage,
  MoviesPage,
} from "../pages/home/view";

export default function HomeRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/:id" element={<MovieInfoPage />} />
        <Route path="director/info/:id" element={<DirectorInfoPage />} />
      </Route>
    </Routes>
  );
}
