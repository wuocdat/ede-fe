import { East } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import TransHistoryBox from "./TransHistoryBox";
import OpenHistoryButton from "./OpenHistoryButton";
import { TranslationDto } from "@/types/type.dto";
import { FC, useState } from "react";
import HistoryFinderDialog from "./HistoryFinderDialog";

interface HistoryComponentProps {
  data?: TranslationDto[];
  onClick: (id: number) => void;
}

const HistoryComponent: FC<HistoryComponentProps> = ({ data, onClick }) => {
  const [openHistoryFinder, setOpenHistoryFinder] = useState<boolean>(false);

  const handleOpenFinder = () => {
    setOpenHistoryFinder(true);
  };

  const handleCloseFinder = () => {
    setOpenHistoryFinder(false);
  };

  return (
    <Stack mt={5} spacing={1}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        ml={2}
        sx={{
          "&:hover": {
            color: grey[500],
            cursor: "pointer",
          },
        }}
        onClick={handleOpenFinder}
      >
        <Typography variant="h6">Xem Lịch sử</Typography>
        <East />
      </Stack>
      <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap">
        {data &&
          data.map((trans) => (
            <TransHistoryBox
              key={trans.id}
              ede={trans.correct_ede_text || trans.ede_text}
              vi={trans.vi_text || ""}
              onClick={() => onClick(trans.id)}
            />
          ))}
        <OpenHistoryButton onClick={handleOpenFinder} />
      </Stack>
      <HistoryFinderDialog open={openHistoryFinder} onClose={handleCloseFinder} />
    </Stack>
  );
};

export default HistoryComponent;
