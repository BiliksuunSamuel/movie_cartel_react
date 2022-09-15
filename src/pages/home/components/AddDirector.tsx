import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Stack, TextField, Button } from "@mui/material";
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

export default function AddDirector({ open, handleClose }: IProps) {
  const [info, setInfo] = useState<DirectorModel>(InitialDirectorInfo);
  const dispatch = useAppDispatch();
  const { error, message } = useAppSelector((state) => state.ResponseReducer);

  ///
  async function handleAddDirector() {
    try {
      dispatch(RequestPending());
      ValidateInfo(info);
      const results = await controller({
        url: PostRoutes.add_director,
        data: info,
      });
      dispatch(RequestSuccess(results));
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
            label="First Name"
            fullWidth
            value={info.first_name}
            onChange={(e) => setInfo({ ...info, first_name: e.target.value })}
          />
          <TextField
            variant="outlined"
            size="small"
            label="Last Name"
            fullWidth
            value={info.last_name}
            onChange={(e) => setInfo({ ...info, last_name: e.target.value })}
          />
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

function ValidateInfo(info: DirectorModel) {
  if (info.first_name.length <= 0) {
    throw "First Name Required";
  }
  if (info.last_name.length <= 0) {
    throw "Last Name Required";
  }
}
