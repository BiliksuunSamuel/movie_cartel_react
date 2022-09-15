import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Stack, TextField, Button, MenuItem } from "@mui/material";
import DirectorModel, {
  InitialDirectorInfo,
} from "../../../model/DirectorModel";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  RequestFailed,
  RequestPending,
  RequestSuccess,
} from "../../../features/slice/ResponseReducer";
import controller from "../../../controller";
import { PostRoutes } from "../../../api";
import { ResponseDisplay } from "../../../components";
import MovieModel, { InitialMovieInfo } from "../../../model/MovieModel";
import { GenerateYears } from "../../../utilities";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddMovie({ open, handleClose }: IProps) {
  const [info, setInfo] = useState<MovieModel>(InitialMovieInfo);
  const dispatch = useAppDispatch();
  const { directors } = useAppSelector((state) => state.DirectorsReducer);
  const { error, message } = useAppSelector((state) => state.ResponseReducer);

  ///
  async function handleAddDirector() {
    try {
      dispatch(RequestPending());
      ValidateInfo(info);
      const results = await controller({
        url: PostRoutes.add_movie,
        data: info,
      });
      dispatch(RequestSuccess(results));
      setInfo(InitialMovieInfo);
    } catch (error) {
      dispatch(RequestFailed(error));
    }
  }
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth="sm"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Add Movie Director</DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-slide-description">
          Director Info
        </DialogContentText>
        <Stack spacing={1} alignItems="center" width="100%">
          <TextField
            variant="outlined"
            size="small"
            label="Name"
            fullWidth
            value={info.name}
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
          />
          <TextField
            variant="outlined"
            size="small"
            label="Release Year"
            fullWidth
            value={info.release_year === 0 ? "" : info.release_year}
            select
            onChange={(e) =>
              setInfo({ ...info, release_year: parseInt(e.target.value) })
            }
          >
            {GenerateYears().map((yr) => (
              <MenuItem value={yr.toString()} key={yr.toString()}>
                {yr.toString()}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            size="small"
            label="Director"
            fullWidth
            value={info.director === 0 ? "" : info.director.toString()}
            select
            onChange={(e) =>
              setInfo({ ...info, director: parseInt(e.target.value) })
            }
          >
            {directors.map((d) => (
              <MenuItem value={d.id.toString()} key={d.id.toString()}>
                {`${d.first_name} ${d.last_name}`}
              </MenuItem>
            ))}
          </TextField>
          <Button
            onClick={handleAddDirector}
            fullWidth
            size="small"
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Stack>
        <ResponseDisplay error={error} message={message} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

function ValidateInfo(info: MovieModel) {
  if (info.name.length <= 0) {
    throw "Movie Name Required";
  }
  if (info.release_year <= 0) {
    throw "Release Year Required Required";
  }
  if (info.director === 0) {
    throw "Select Movie Director";
  }
}
