import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Typography, Paper, Divider } from "@mui/material";
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

interface IInfo {
  director: DirectorModel;
  info: MovieModel;
}
export default function MovieInfoPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState<IInfo | null>(null);
  const { error, message } = useAppSelector((state) => state.ResponseReducer);

  ///
  async function GetMovieInfoById() {
    try {
      dispatch(RequestPending());
      const data = await controller<IInfo>({
        url: GetRoutes.get_movie(parseInt(id ? id.toString() : "0")),
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
          <Typography variant="h6">{info.info.name}</Typography>
          <Divider />
          <Typography variant="body2">
            Year Released: {info.info.release_year}
          </Typography>
          <Divider />
          <Stack padding={0.85}>
            <Typography variant="body1">
              Director:
              {` ${info.director.first_name} ${info.director.last_name}`}
            </Typography>
          </Stack>
        </Paper>
      )}
      <ResponseDisplay error={error} message={message} />
    </Box>
  );
}
