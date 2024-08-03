import React from "react";
import { Box, Snackbar, Button, Alert } from "@mui/material";

interface SnackBarProps {
  open: boolean;
  message: string;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  handleClose: () => void;
  serverity:'success' | 'error' | 'warning'
}

const SnackBar: React.FC<SnackBarProps> = ({
  open,
  message,
  vertical,
  horizontal,
  handleClose,
  serverity
}) => {
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key="success-snackbar"
        action={
          <Button color="inherit" onClick={handleClose}>
            Close
          </Button>
        }
      >
        <Alert
          onClose={handleClose}
          severity={serverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SnackBar;
