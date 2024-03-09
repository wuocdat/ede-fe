import { Box, Divider, Stack, Tooltip, TooltipProps, Typography, styled, tooltipClasses } from "@mui/material";
import { grey } from "@mui/material/colors";

const edeText = `The GROUP BY clause groups rows that have the same values into summary rows, like "find the number of customers in each country".`
const viText = `Предложение GROUP BY группирует строки с одинаковыми значениями в сводные строки, например "найти количество клиентов в каждой стране".`

const TooltipTitle = () => {
  return <Stack >
    <Typography>{edeText}</Typography>
    <Divider />
    <Typography>{viText}</Typography>
  </Stack>
}

const StyledTooltip = styled(({ className, title, ...props }: TooltipProps) => (
  <Tooltip placement="top" title={<TooltipTitle />} {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));


const TransHistoryBox = () => {
  return <StyledTooltip title="">
    <Box borderRadius={2} p={1.5} bgcolor={grey[200]} maxWidth={300} >
      <Stack>
        <Typography fontWeight={500} fontSize={18} noWrap>{edeText}</Typography>
        <Typography noWrap>{viText}</Typography>
      </Stack>
    </Box>
  </StyledTooltip>
}

export default TransHistoryBox;