import { Box, BoxProps, CircularProgress } from "@mui/material";
import { FC } from "react";

const LoadingOverlay: FC<BoxProps> = (props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      borderRadius={4}
      bgcolor="rgba(255,255,255,0.9)"
      sx={{ inset: 0, zIndex: 999 }}
      {...props}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingOverlay;
