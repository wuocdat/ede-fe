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
import { FC } from "react";
import HistoryIcon from "@mui/icons-material/History";
import { Edit, FolderOpen, Save } from "@mui/icons-material";

interface TranslationFormProps {
  title: string;
  placeholder?: string;
  inputMode?: boolean;
  bottomActions?: React.ReactNode;
}

const TranslationForm: FC<TranslationFormProps> = ({
  title,
  placeholder,
  inputMode,
  bottomActions,
}) => {
  const theme = useTheme();

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
          />
        ) : (
          <Typography fontSize={theme.typography.pxToRem(18)}>
            vietnamese
          </Typography>
        )}
      </Box>
      <Box position="absolute" bottom={4} left={4} right={4}>
        {bottomActions}
      </Box>
    </BorderBox>
  );
};

const Translation = () => {
  return (
    <Box bgcolor={COLORS.BACKGROUND} flex={1}>
      <Grid container padding={3}>
        <Grid item xs={6}>
          <TranslationForm
            title="Tiếng Việt"
            bottomActions={
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
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TranslationForm
            title="Tiếng Êđê"
            placeholder="Nhập đoạn dịch bằng tiếng Êđê"
            inputMode
            bottomActions={
              <Button
                variant="contained"
                startIcon={<Save />}
                sx={{ float: "right", mr: "20px", mb: "8px" }}
              >
                Lưu
              </Button>
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Translation;
