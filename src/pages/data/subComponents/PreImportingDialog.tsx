import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { PreTransDto } from "@/types/type.dto";
import { Cancel } from "@mui/icons-material";

interface PreImportingDialogProps {
  preData: PreTransDto[] | null;
  setPreData: (data: PreTransDto[] | null) => void;
  onClose: () => void;
  onUpload: () => void;
}

export default function PreImportingDialog({
  preData,
  onClose,
  setPreData,
  onUpload,
}: PreImportingDialogProps) {
  const handleRemoveTrans = (index: number) => {
    if (preData) {
      const filteredData = preData.filter((_, i) => index !== i);
      setPreData(filteredData);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={!!preData}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Kiểm tra dữ liệu trước khi tải lên</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tiếng Ê-đê</TableCell>
                  <TableCell>Tiếng Việt</TableCell>
                  <TableCell>Đã sửa</TableCell>
                  <TableCell>Bỏ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!!preData &&
                  preData.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.ede_text}</TableCell>
                      <TableCell>{row.vi_text}</TableCell>
                      <TableCell>{row.correct_ede_text}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleRemoveTrans(index)}
                        >
                          <Cancel />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ mr: 2, my: 2 }}>
          <Button onClick={onClose}>Thoát</Button>
          <Button onClick={onUpload} autoFocus variant="outlined">
            Tải lên
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
