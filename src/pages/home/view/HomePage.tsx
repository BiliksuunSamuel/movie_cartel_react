import React, { useState, useEffect } from "react";
import {
  Container,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  Typography,
  Badge,
  Box,
} from "@mui/material";
import { AddDirector, AddMovie, Navbar } from "../components";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetMoviesThunk } from "../../../functions/movies";
import { GetDirectorsThunk } from "../../../functions/directors";
import { ResponseDisplay } from "../../../components";
import { FcVideoFile } from "react-icons/fc";
import { Outlet, useNavigate } from "react-router-dom";
export default function HomePage() {
  const [addDirector, setAddDirector] = useState<boolean>(false);
  const [addMovie, setAddMovie] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const { movies } = useAppSelector((state) => state.MoviesReducer);
  const { error, message } = useAppSelector((state) => state.ResponseReducer);
  useEffect(() => {
    navigation("/movies");
    dispatch(GetDirectorsThunk());
    dispatch(GetMoviesThunk());
  }, []);

  ///
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={(theme) => ({
        background: theme.palette.action.hover,
        heigth: "100%",
        overflow: "hidden",
      })}
      width="100%"
    >
      <Navbar
        handleAddMovie={() => setAddMovie(true)}
        handleAddDirector={() => setAddDirector(true)}
      />
      <ResponseDisplay error={error} message={message} />
      <AddDirector
        open={addDirector}
        handleClose={() => setAddDirector(false)}
      />
      <AddMovie open={addMovie} handleClose={() => setAddMovie(false)} />
      <Stack
        sx={(theme) => ({
          padding: theme.spacing(2),
          width: "100%",
          margin: theme.spacing(3, 0),
          background: theme.palette.common.white,
          marginTop: "60px",
        })}
      ></Stack>

      <Box
        sx={(theme) => ({
          width: "100%",
          height: "80vh",
        })}
      >
        <Outlet />
      </Box>
    </Stack>
  );
}
