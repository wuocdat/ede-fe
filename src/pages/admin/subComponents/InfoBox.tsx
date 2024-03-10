import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";

interface InfoBoxProps {
  title: string;
  text: string | number;
}

const InfoBox: FC<InfoBoxProps> = ({ title, text }) => {
  return (
    <Stack
      p={2}
      minWidth={200}
      borderRadius={4}
      border={`1px solid ${grey[400]}`}
      alignItems="center"
    >
      <Typography textTransform="uppercase" variant="h6">
        {title}
      </Typography>
      <Typography variant="h5">{text}</Typography>
    </Stack>
  );
};

export default InfoBox;
