import { Box, CircularProgress } from "@mui/material";

const LoadingOverlay = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      borderRadius={4}
      bgcolor="rgba(255,255,255,0.9)"
      sx={{ inset: 0 }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingOverlay;
