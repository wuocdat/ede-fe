import { COLORS } from "@/theme/colors";
import { ArrowBack } from "@mui/icons-material";
import { Box, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import Dialog from "@mui/material/Dialog";
import { DatePicker } from "@mui/x-date-pickers";
import { FC, useContext } from "react";
import { grey } from "@mui/material/colors";
import { TranslationContext } from "..";
import moment from "moment";

interface HistoryFinderDialogProps {
  open: boolean;
  onClose: () => void;
}

interface TransHistoryItemProps {
  text: string;
  transText: string;
  isLast?: boolean;
  time?: string;
  onClick: () => void;
}

const TransHistoryItem: FC<TransHistoryItemProps> = ({
  text,
  transText,
  isLast,
  time,
  onClick,
}) => {
  return (
    <Stack
      p={1}
      pb={0}
      spacing={1}
      borderRadius={2}
      sx={{
        cursor: "pointer",
        "&:hover": {
          bgcolor: grey[100],
        },
      }}
      onClick={onClick}
    >
      <Stack direction="row" spacing={3}>
        <Typography flex={1}>{text}</Typography>
        <Typography flex={1}>{transText}</Typography>
      </Stack>
      <Typography textAlign="end" variant="caption" fontStyle="italic">
        {time}
      </Typography>
      {!isLast && <Divider />}
    </Stack>
  );
};

export default function HistoryFinderDialog({ ...props }: HistoryFinderDialogProps) {
  const {
    startValue,
    endValue,
    textValue,
    historyData: data,
    onClickHistoryItem,
    setEndValue,
    setStartValue,
    setTextValue,
  } = useContext(TranslationContext);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      {...props}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Stack>
        <Stack
          position="sticky"
          direction="row"
          alignItems="center"
          spacing={1}
          bgcolor={COLORS.PRIMARY}
          color="white"
          pt={1}
          pb={3}
          px={2}
        >
          <IconButton color="inherit" onClick={props.onClose}>
            <ArrowBack fontSize="large" />
          </IconButton>
          <Typography variant="h5" textTransform="capitalize">
            Lịch sử
          </Typography>
          <Box display="flex" flex={1} justifyContent="flex-end">
            {/* <IconButton color="inherit">
              <Search fontSize="large" />
            </IconButton> */}
            <Typography>{data?.[1]} kết quả</Typography>
          </Box>
        </Stack>

        <Stack p={2} spacing={2} alignSelf="flex-start">
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DemoItem label="Từ ngày">
              <DatePicker value={startValue} onChange={(newValue) => setStartValue(newValue)} />
            </DemoItem>
            <DemoItem label="Đến ngày">
              <DatePicker value={endValue} onChange={(newValue) => setEndValue(newValue)} />
            </DemoItem>
          </DemoContainer>
          <TextField
            label="Nhập tiếng ede hoặc tiếng việt"
            value={textValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTextValue(event.target.value);
            }}
          />
        </Stack>
        <Stack p={2}>
          {data &&
            data[0] &&
            data[0].map((item) => (
              <TransHistoryItem
                key={item.id}
                text={item.correct_ede_text || item.ede_text}
                transText={item.vi_text || ""}
                time={moment(item.updatedAt).fromNow()}
                onClick={() => {
                  onClickHistoryItem(item.id);
                  props.onClose();
                }}
              />
            ))}
        </Stack>
      </Stack>
    </Dialog>
  );
}
