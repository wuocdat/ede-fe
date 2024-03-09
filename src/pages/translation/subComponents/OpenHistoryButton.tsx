import { History } from "@mui/icons-material"
import { Box, Tooltip } from "@mui/material"
import { grey } from "@mui/material/colors"

const OpenHistoryButton = () => {
  return <Tooltip title="History" placement="top">
    < Box borderRadius={2} bgcolor={grey[200]} alignSelf="stretch" p={2} display="flex" alignItems="center" ml={2} my={1} >
      <History />
    </Box >
  </Tooltip >
}

export default OpenHistoryButton