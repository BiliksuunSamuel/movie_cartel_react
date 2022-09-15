import React from "react";
import {
  AppBar,
  Chip,
  Stack,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { FcSearch, FcManager, FcVideoFile, FcRefresh } from "react-icons/fc";
import { GetDirectorsThunk } from "../../../functions/directors";
import { useAppDispatch } from "../../../app/hooks";
import { GetMoviesThunk } from "../../../functions/movies";

//
interface IProps {
  handleAddDirector: () => void;
  handleAddMovie: () => void;
}
export default function Navbar({ handleAddDirector, handleAddMovie }: IProps) {
  const dispatch = useAppDispatch();
  return (
    <AppBar
      variant="outlined"
      color="default"
      sx={(theme) => ({
        height: "50px",
        background: theme.palette.background.paper,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Toolbar
        sx={(theme) => ({
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        })}
      >
        <Stack direction="row" alignItems="center" justifyContent="flex-start">
          <Typography variant="h6">MovieCartel</Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          paddingX={2}
          spacing={1.5}
        >
          <IconButton onClick={handleAddDirector} size="medium">
            <FcManager />
          </IconButton>

          <Chip
            avatar={<FcRefresh />}
            size="small"
            variant="outlined"
            onClick={() => {
              dispatch(GetMoviesThunk());
              dispatch(GetDirectorsThunk());
            }}
            label={
              <Typography
                variant="body2"
                sx={(theme) => ({
                  [theme.breakpoints.down("sm")]: {
                    display: "none",
                  },
                })}
              >
                Refresh
              </Typography>
            }
          />

          <Chip
            avatar={<FcVideoFile />}
            size="small"
            variant="outlined"
            onClick={handleAddMovie}
            label={<Typography variant="body2">Add</Typography>}
            sx={(theme) => ({
              marginRight: theme.spacing(4),
            })}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
