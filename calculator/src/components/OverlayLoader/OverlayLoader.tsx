import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
interface OverlayLoaderProps{
    open: boolean;
    handleClose: () => void;
}
const OverlayLoader:React.FC<OverlayLoaderProps> = ({open,handleClose}) => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default OverlayLoader;
