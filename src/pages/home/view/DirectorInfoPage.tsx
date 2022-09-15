import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ResponseDisplay } from "../../../components";
import {
  RequestFailed,
  RequestPending,
  RequestSuccess,
} from "../../../features/slice/ResponseReducer";
import DirectorModel from "../../../model/DirectorModel";
import MovieModel from "../../../model/MovieModel";
import controller from "../../../controller";
import { GetRoutes } from "../../../api";
import { FcVideoFile, FcManager, FcViewDetails } from "react-icons/fc";
interface IInfo {
  info: DirectorModel;
  movies: MovieModel[];
}
export default function DirectorInfoPage() {
  const navigation = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState<IInfo | null>(null);
  const { error, message } = useAppSelector((state) => state.ResponseReducer);

  ///
  async function GetMovieInfoById() {
    try {
      dispatch(RequestPending());
      const data = await controller<IInfo>({
        url: GetRoutes.get_director(parseInt(id ? id.toString() : "0")),
        method: "GET",
      });
      dispatch(RequestSuccess(null));
      if (data) {
        setInfo(data);
      } else {
        dispatch(RequestFailed(`No Record Found!`));
      }
    } catch (error) {
      dispatch(RequestFailed(error));
    }
  }

  useEffect(() => {
    GetMovieInfoById();
  }, []);
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        padding: theme.spacing(1),
      })}
    >
      {info && (
        <Paper
          sx={(theme) => ({
            padding: theme.spacing(1),
          })}
        >
          <Typography variant="h6">{`${info.info.first_name} ${info.info.last_name}`}</Typography>
          <Divider />
          <Typography variant="body2">
            Total Movies: {info.movies.length}
          </Typography>
          <Divider />
          <Stack padding={0.85}>
            {info.movies.map((movie) => (
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
          </Stack>
        </Paper>
      )}
      <ResponseDisplay error={error} message={message} />
    </Box>
  );
}
