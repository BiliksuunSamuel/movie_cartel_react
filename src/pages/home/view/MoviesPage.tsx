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
  Tabs,
  Divider,
  Tab,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { FcVideoFile, FcManager, FcViewDetails } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GenerateYears } from "../../../utilities";
import MovieModel from "../../../model/MovieModel";
import {
  RequestFailed,
  RequestPending,
  RequestSuccess,
} from "../../../features/slice/ResponseReducer";
import controller from "../../../controller";
import { GetRoutes } from "../../../api";
export default function MoviesPage() {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const [tab, setTab] = useState<number>(0);
  const { directors } = useAppSelector((state) => state.DirectorsReducer);
  const { movies } = useAppSelector((state) => state.MoviesReducer);
  const { error, message } = useAppSelector((state) => state.ResponseReducer);
  const [Movies, setMovies] = useState<MovieModel[]>([]);
  const [year, setYear] = useState<any>(null);

  async function getMoviesByYear() {
    try {
      if (year) {
        dispatch(RequestPending());
        const data = await controller<MovieModel[]>({
          url: GetRoutes.get_movies_by_year(year),
          method: "GET",
        });
        setMovies(data);
        dispatch(RequestSuccess(null));
      }
    } catch (error) {
      dispatch(RequestFailed(error));
    }
  }

  useEffect(() => {
    setMovies(movies);
  }, [movies]);

  useEffect(() => {
    getMoviesByYear();
  }, [year]);

  return (
    <Container
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        alignItem: "center",
        justifyContent: "center",
      })}
    >
      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        aria-label="basic tabs example"
      >
        <Tab
          label={
            <Stack>
              <Badge color="primary" badgeContent={Movies.length} />
              <Typography variant="body2">Movies</Typography>
            </Stack>
          }
        />
        <Tab
          label={
            <Stack>
              <Badge color="primary" badgeContent={directors.length} />
              <Typography variant="body2">Directors</Typography>
            </Stack>
          }
        />
      </Tabs>
      <Divider />
      {tab === 0 && (
        <Stack
          height="100%"
          sx={(theme) => ({
            boxShadow: theme.shadows[1],
            alignSelf: "center",
            width: "100%",
            background: theme.palette.background.paper,
          })}
          padding={1}
        >
          <Stack
            padding={1}
            alignItems="center"
            justifyContent="flex-end"
            direction="row"
            spacing={1}
          >
            <Typography variant="body1">Filter Movies</Typography>
            <TextField
              label="Year"
              sx={(theme) => ({ width: "150px" })}
              variant="outlined"
              size="small"
              select
              onChange={(e) => setYear(e.target.value)}
            >
              {GenerateYears().map((y) => (
                <MenuItem value={y.toString()} key={y.toString()}>
                  {y}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Divider />
          <List
            sx={(theme) => ({
              height: "100%",
              overflowY: "auto",
            })}
          >
            {Movies.map((movie) => (
              <React.Fragment>
                <ListItemButton
                  onClick={() => navigation("/movies/" + movie.id)}
                  key={movie.id.toString()}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FcVideoFile />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Title:${movie.name}`}
                    secondary={`Released Year:${movie.release_year.toString()}`}
                  />
                </ListItemButton>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Stack>
      )}
      {tab === 1 && (
        <Stack
          height="100%"
          sx={(theme) => ({
            boxShadow: theme.shadows[1],
            alignSelf: "center",
            width: "100%",
            background: theme.palette.background.paper,
          })}
          padding={1}
        >
          <List
            sx={(theme) => ({
              height: "100%",
              overflowY: "auto",
            })}
          >
            {directors.map((dir) => (
              <React.Fragment>
                <ListItem
                  key={dir.id.toString()}
                  secondaryAction={
                    <IconButton
                      onClick={() => navigation("/director/info/" + dir.id)}
                      size="medium"
                      edge="end"
                    >
                      <Badge
                        color="primary"
                        badgeContent={movies
                          .filter(
                            (m) =>
                              m.director.toString().trim() ===
                              dir.id.toString().trim()
                          )
                          .length.toString()}
                      />
                      <FcViewDetails />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FcManager size={20} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${dir.first_name} ${dir.first_name}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Stack>
      )}
    </Container>
  );
}
