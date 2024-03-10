import {
  Box,
  BoxProps,
  Divider,
  Stack,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC } from "react";

interface TooltipTitleProps {
  ede: string;
  vi: string;
}

interface TransHistoryBoxProps extends BoxProps, TooltipTitleProps {}

const TooltipTitle: FC<TooltipTitleProps> = ({ ede, vi }) => {
  return (
    <Stack>
      <Typography>{ede}</Typography>
      <Divider sx={{ bgcolor: "white" }} />
      <Typography>{vi}</Typography>
    </Stack>
  );
};

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip placement="top" {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    // color: "rgba(0, 0, 0, 0.87)",
    // maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const TransHistoryBox: FC<TransHistoryBoxProps> = ({ ede, vi, ...props }) => {
  return (
    <StyledTooltip title={<TooltipTitle ede={ede} vi={vi} />}>
      <Box
        borderRadius={2}
        p={1.5}
        bgcolor={grey[200]}
        maxWidth={300}
        sx={{ cursor: "pointer" }}
        {...props}
      >
        <Stack>
          <Typography fontWeight={500} fontSize={18} noWrap>
            {ede}
          </Typography>
          <Typography noWrap>{vi}</Typography>
        </Stack>
      </Box>
    </StyledTooltip>
  );
};

export default TransHistoryBox;
