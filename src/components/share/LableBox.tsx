import { Stack, StackProps, Typography } from "@mui/material";
import { FC } from "react";
import LoadingOverlay from "./LoadingOverLay";

interface LabelBoxProps extends StackProps {
  title: string;
  isLoading?: boolean;
}

const LabelBox: FC<LabelBoxProps> = ({ title, children, isLoading, ...others }) => {
  return (
    <Stack spacing={3} p={3} borderRadius={4} bgcolor="white" position="relative" {...others}>
      <Typography textTransform="uppercase" fontWeight={500}>
        {title}
      </Typography>
      {children}
      {isLoading && <LoadingOverlay />}
    </Stack>
  );
};

export default LabelBox;
