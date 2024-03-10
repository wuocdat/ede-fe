import { East } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import TransHistoryBox from "./TransHistoryBox";
import OpenHistoryButton from "./OpenHistoryButton";
import { TranslationDto } from "@/types/type.dto";
import { FC } from "react";

interface HistoryComponentProps {
  data?: TranslationDto[];
  onClick: (id: number) => void;
}

const HistoryComponent: FC<HistoryComponentProps> = ({ data, onClick }) => {
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
      >
        <Typography variant="h6">Xem Lịch sử</Typography>
        <East />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        {data &&
          data.map((trans) => (
            <TransHistoryBox
              key={trans.id}
              ede={trans.correct_ede_text || trans.ede_text}
              vi={trans.vi_text || ""}
              onClick={() => onClick(trans.id)}
            />
          ))}
        <OpenHistoryButton onClick={() => {}} />
      </Stack>
    </Stack>
  );
};

export default HistoryComponent;
