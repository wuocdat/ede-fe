import { History } from "@mui/icons-material";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { StyledTooltip } from "./TransHistoryBox";

const OpenHistoryButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <StyledTooltip title="History" placement="top">
      <Box
        borderRadius={2}
        bgcolor={grey[200]}
        alignSelf="stretch"
        p={2}
        display="flex"
        alignItems="center"
        ml={2}
        my={1}
        onClick={onClick}
      >
        <History />
      </Box>
    </StyledTooltip>
  );
};

export default OpenHistoryButton;
