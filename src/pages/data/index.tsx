import { Button, Stack, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisuallyHiddenInput from "@/components/base/VisuallyHiddenInput";
import { ChangeEvent, useRef, useState } from "react";
import DataService from "@/service/data.services";
import { toast } from "react-toastify";

const DataPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

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
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          disabled={loading}
          sx={{ alignSelf: "center" }}
        >
          Upload file
          <VisuallyHiddenInput ref={inputRef} type="file" accept=".xlsx" onChange={handleChange} />
        </Button>
        <Button variant="contained" sx={{ alignSelf: "center" }}>
          Thêm bản ghi
        </Button>
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
