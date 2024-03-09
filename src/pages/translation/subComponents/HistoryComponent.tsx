import { East } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import TransHistoryBox from "./TransHistoryBox";
import OpenHistoryButton from "./OpenHistoryButton";

const HistoryComponent = () => {
    return (<Stack mt={5} >
        <Stack direction="row" spacing={1} alignItems="center" ml={2} sx={{
            "&:hover": {
                color: grey[500],
                cursor: 'pointer'
            }
        }}>
            <Typography variant="h6">Xem Lịch sử</Typography>
            <East />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
            <TransHistoryBox />
            <TransHistoryBox />
            <TransHistoryBox />
            <OpenHistoryButton />
        </Stack>
    </Stack>)
}

export default HistoryComponent;