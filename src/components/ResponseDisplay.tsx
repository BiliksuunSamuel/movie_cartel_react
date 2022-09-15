import React from "react";
import { Stack, Typography } from "@mui/material";
interface IProps {
  error?: any;
  message?: any;
}
export default function ResponseDisplay({ error, message }: IProps) {
  if (Boolean(error || message)) {
    return (
      <Stack
        alignItems="center"
        width="100%"
        justifyContent="center"
        padding={1}
      >
        {error && (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        )}
        {message && (
          <Typography color="seagreen" variant="body1">
            {message}
          </Typography>
        )}
      </Stack>
    );
  } else {
    return null;
  }
}
