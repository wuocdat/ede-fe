import BorderBox from "@/components/share/BorderBox";
import { COLORS } from "@/theme/colors";
import { Box, Button, Grid, InputBase, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC, createContext, useEffect, useState } from "react";
import { Save } from "@mui/icons-material";
import { TranslationDto } from "@/types/type.dto";
import TransService from "@/service/trans.services";
import { toast } from "react-toastify";
import HistoryComponent from "./subComponents/HistoryComponent";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { DATE_FORMATTER } from "@/utils/constants";
import { useDebounce } from "@/hooks/useDebounce";

interface TranslationFormProps {
  title: string;
  placeholder: string;
  bottomActions?: React.ReactNode;
  inputValue: string;
  onChange: (value: string) => void;
}

// const SaveButton: FC<ButtonProps> = (props) => (
//   <Button
//     variant="contained"
//     startIcon={<Save />}
//     sx={{ float: "right", mr: "20px", mb: "8px" }}
//     {...props}
//   >
//     Lưu
//   </Button>
// );

const TranslationForm: FC<TranslationFormProps> = ({
  title,
  placeholder,
  bottomActions,
  inputValue,
  onChange,
}) => {
  const theme = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <BorderBox minHeight="100%">
      <Typography
        align="center"
        variant="h6"
        sx={{
          borderBottom: `1px solid ${grey[400]}`,
          padding: theme.spacing(1.2),
        }}
      >
        {title}
      </Typography>
      <Box p={theme.spacing(1)}>
        <InputBase
          placeholder={placeholder}
          rows={7}
          multiline
          sx={{ width: "100%", fontSize: theme.typography.pxToRem(18) }}
          value={inputValue}
          onChange={handleChange}
        />
      </Box>
      <Box position="absolute" bottom={4} left={4} right={4}>
        {bottomActions}
      </Box>
    </BorderBox>
  );
};

type TransContextType = {
  historyData?: [TranslationDto[], number];
  startValue: Dayjs | null;
  endValue: Dayjs | null;
  textValue: string;
  onClickHistoryItem: (transId: number) => void;
  refetchHistory: () => void;
  setStartValue: (value: Dayjs | null) => void;
  setEndValue: (value: Dayjs | null) => void;
  setTextValue: (value: string) => void;
};

export const TranslationContext = createContext<TransContextType>({
  startValue: null,
  endValue: null,
  textValue: "",
  onClickHistoryItem: () => {},
  refetchHistory: () => {},
  setStartValue: () => {},
  setEndValue: () => {},
  setTextValue: () => {},
});

const Translation = () => {
  const [trans, setTrans] = useState<TranslationDto | null>(null);
  const [startValue, setStartValue] = useState<Dayjs | null>(dayjs().subtract(10, "days"));
  const [endValue, setEndValue] = useState<Dayjs | null>(dayjs());
  const [textValue, setTextValue] = useState("");

  const debounce = useDebounce(textValue, 500);

  const { data: recentData, refetch: recentHistoryRefetch } = useQuery({
    queryKey: ["recentUpdatedTrans"],
    queryFn: TransService.getRecetUpdatedTrans,
  });

  const fetchTransHistory = async () => {
    return await TransService.getTransWithOptions({
      start: startValue?.format(DATE_FORMATTER) || dayjs().format(DATE_FORMATTER),
      end: endValue?.format(DATE_FORMATTER) || dayjs().format(DATE_FORMATTER),
      text: textValue ? textValue : undefined,
    });
  };

  const { data: historyData, refetch: historyRefetch } = useQuery({
    queryKey: ["getTransWithOptions", startValue, endValue, debounce],
    queryFn: fetchTransHistory,
  });

  const fetchIncorrectTrans = async () => {
    try {
      const { data } = await TransService.getIncorrectTrans();
      if (data && data.trans) {
        setTrans(data.trans);
        historyRefetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleViInputChange = (value: string) => {
    setTrans((prev) => {
      if (prev) {
        return {
          ...prev,
          vi_text: value,
        };
      } else {
        return prev;
      }
    });
  };

  const handleEdeInputChange = (value: string) => {
    setTrans((prev) => {
      if (prev) {
        return {
          ...prev,
          ede_text: value,
        };
      } else {
        return prev;
      }
    });
  };

  const handleSave = async () => {
    if (trans && trans.vi_text && trans.ede_text) {
      try {
        await TransService.updateTransById(trans.id, {
          vi_text: trans.vi_text,
          correct_ede_text: trans.ede_text,
          correct: true,
        });
        toast.success("Đã cập nhật thành công", { autoClose: 1000 });
        await fetchIncorrectTrans();
        recentHistoryRefetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleHistoryItemClick = async (transId: number) => {
    try {
      const data = await TransService.getOneById(transId);
      if (data) {
        setTrans(data);
        historyRefetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchIncorrectTrans();
  }, []);

  return (
    <TranslationContext.Provider
      value={{
        historyData,
        startValue,
        endValue,
        textValue,
        onClickHistoryItem: handleHistoryItemClick,
        refetchHistory: historyRefetch,
        setStartValue,
        setEndValue,
        setTextValue,
      }}
    >
      <Box bgcolor={COLORS.BACKGROUND} flex={1} padding={3}>
        {trans ? (
          <Grid container>
            <Grid item xs={6}>
              <TranslationForm
                placeholder="Nhập đoạn dịch bằng tiếng Êđê"
                title="Tiếng Ê-đê"
                inputValue={trans.ede_text || ""}
                onChange={handleEdeInputChange}
                bottomActions={
                  // <Box>
                  //   <Stack direction="row" spacing={0.5}>
                  //     <IconButton>
                  //       <HistoryIcon />
                  //     </IconButton>
                  //     <IconButton>
                  //       <Edit />
                  //     </IconButton>
                  //     <IconButton>
                  //       <FolderOpen />
                  //     </IconButton>
                  //   </Stack>
                  //   {/* <SaveButton /> */}
                  // </Box>
                  <></>
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TranslationForm
                title="Tiếng Việt"
                placeholder="Nhập đoạn dịch bằng tiếng Việt"
                bottomActions={
                  <Button
                    variant="contained"
                    startIcon={<Save />}
                    sx={{ float: "right", mr: "20px", mb: "8px" }}
                    onClick={handleSave}
                  >
                    Lưu
                  </Button>
                }
                inputValue={trans.vi_text || ""}
                onChange={handleViInputChange}
              />
            </Grid>
          </Grid>
        ) : (
          <Typography bgcolor="yellow" textAlign="center" mt={2} fontStyle="italic">
            Không còn bản dịch nào
          </Typography>
        )}
        <HistoryComponent data={recentData} onClick={handleHistoryItemClick} />
      </Box>
    </TranslationContext.Provider>
  );
};

export default Translation;
