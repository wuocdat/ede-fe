import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisuallyHiddenInput from "@/components/base/VisuallyHiddenInput";
import { ChangeEvent, useRef, useState } from "react";
import DataService from "@/service/data.services";
import { toast } from "react-toastify";

const DataPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputMultipleRef = useRef<HTMLInputElement | null>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", files[0]);
        const { data } = await DataService.uploadFile(formData);

        if (data) {
          toast.success(`Đã tải lên thành công ${data.savedTransNum} bản ghi.`);
          if (inputRef && inputRef.current) inputRef.current.value = "";
        }
      } catch (error) {
        console.log(error);
        toast.error("Tải file lên không thành công");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleMultipleFilesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        setLoading(true);
        const formData = new FormData();
        [...files].forEach((file) => formData.append("files", file));
        const { data } = await DataService.uploadMultipleFiles(formData);

        if (data) {
          toast.success(
            `Đã tải lên thành công ${data.savedTransNum} bản ghi từ: ${data.filesNameList.join(
              ", "
            )}`
          );
          if (inputMultipleRef && inputMultipleRef.current) inputMultipleRef.current.value = "";
        }
      } catch (error) {
        console.log(error);
        toast.error("Tải file lên không thành công");
      } finally {
        setLoading(false);
      }
    }
  };

  // const handleUploadPreData = async () => {
  //   if (preData) {
  //     try {
  //       setLoading(true);
  //       const { data } = await DataService.uploadPreData(
  //         preData.map((item) => ({ ...preData, correct: !!item.correct_ede_text }))
  //       );
  //       if (data) {
  //         toast.success(
  //           `Đã tải lên thành công ${data.savedTransNum} bản ghi, ${
  //             preData.length - data.savedTransNum
  //           } bản ghi lỗi hoặc bị trùng`
  //         );
  //         setPreData(null);
  //         if (inputRef && inputRef.current) inputRef.current.value = "";
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Đã xảy ra lỗi, tải lên không thành công");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  return (
    <>
      <Stack mt={2} flex={1} justifyContent="center" spacing={2}>
        <Typography textAlign="center" textTransform="uppercase" variant="h5">
          Thêm bản ghi
        </Typography>
        <Box position="relative" sx={{ alignSelf: "center" }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            disabled={loading}
          >
            Upload file
            <VisuallyHiddenInput
              ref={inputRef}
              type="file"
              accept=".xlsx"
              onChange={handleChange}
            />
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: "darkgrey",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
        <Box position="relative" sx={{ alignSelf: "center" }}>
          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            disabled={loading}
          >
            Upload Multiple Files
            <VisuallyHiddenInput
              ref={inputMultipleRef}
              type="file"
              accept=".xlsx"
              multiple
              onChange={handleMultipleFilesChange}
            />
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: "darkgrey",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
        {/* <Button variant="contained" sx={{ alignSelf: "center" }}>
          Thêm bản ghi
        </Button> */}
      </Stack>
      {/* <PreImportingDialog
        preData={preData}
        onClose={() => setPreData(null)}
        setPreData={setPreData}
        onUpload={handleUploadPreData}
      /> */}
    </>
  );
};

export default DataPage;
