import React from "react";
import { Backdrop } from "@mui/material";
interface IProps {
  loading: boolean;
}
export default function Loader({ loading }: IProps) {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 10001 }} open={loading}>
      <span className="loader"></span>
    </Backdrop>
  );
}
