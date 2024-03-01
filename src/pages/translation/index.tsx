import BorderBox from "@/components/share/BorderBox";
import { COLORS } from "@/theme/colors";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC, useEffect, useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import { Edit, FolderOpen, Save } from "@mui/icons-material";
import { TranslationDto } from "@/types/type.dto";
import TransService from "@/service/trans.services";
import { toast } from "react-toastify";

interface TranslationFormProps {
  title: string;
  placeholder?: string;
  inputMode?: boolean;
  bottomActions?: React.ReactNode;
  text?: string;
  inputValue?: string;
  onChange?: (value: string) => void;
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
  inputMode,
  bottomActions,
  inputValue,
  text,
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
        {inputMode ? (
          <InputBase
            placeholder={placeholder}
            rows={7}
            multiline
            sx={{ width: "100%", fontSize: theme.typography.pxToRem(18) }}
            value={inputValue}
            onChange={handleChange}
          />
        ) : (
          <Typography fontSize={theme.typography.pxToRem(18)}>{text}</Typography>
        )}
      </Box>
      <Box position="absolute" bottom={4} left={4} right={4}>
        {bottomActions}
      </Box>
    </BorderBox>
  );
};

const Translation = () => {
  const [trans, setTrans] = useState<TranslationDto | null>(null);

  const fetchIncorrectTrans = async () => {
    try {
      const { data } = await TransService.getIncorrectTrans();
      if (data && data.trans) {
        setTrans(data.trans);
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

  const handleSave = async () => {
    if (trans && trans.vi_text) {
      try {
        await TransService.updateTransById(trans.id, { vi_text: trans.vi_text, correct: true });
        toast.success("Đã cập nhật thành công", { autoClose: 1000 });
        fetchIncorrectTrans();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchIncorrectTrans();
  }, []);

  return (
    <Box bgcolor={COLORS.BACKGROUND} flex={1}>
      {trans ? (
        <Grid container padding={3}>
          <Grid item xs={6}>
            <TranslationForm
              title="Tiếng Ê-đê"
              text={trans.ede_text}
              bottomActions={
                <Box>
                  <Stack direction="row" spacing={0.5}>
                    <IconButton>
                      <HistoryIcon />
                    </IconButton>
                    <IconButton>
                      <Edit />
                    </IconButton>
                    <IconButton>
                      <FolderOpen />
                    </IconButton>
                  </Stack>
                  {/* <SaveButton /> */}
                </Box>
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TranslationForm
              title="Tiếng Việt"
              placeholder="Nhập đoạn dịch bằng tiếng Êđê"
              inputMode
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
    </Box>
  );
};

export default Translation;
