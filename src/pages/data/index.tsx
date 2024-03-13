import { Box, Stack, Typography } from "@mui/material";
import VisuallyHiddenInput from "@/components/base/VisuallyHiddenInput";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import DataService from "@/service/data.services";
import { toast } from "react-toastify";
import { grey } from "@mui/material/colors";
import LoadingOverlay from "@/components/share/LoadingOverLay";
import UploadExcelIcon from "@/components/svg/UploadExcelIcon";

const DataPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState(false);

  const inputMultipleRef = useRef<HTMLInputElement | null>(null);

  const handleDrag = function (e: DragEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onButtonClick = () => {
    inputMultipleRef.current?.click();
  };

  const handleMultipleFilesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = async (files: FileList) => {
    try {
      setLoading(true);
      const formData = new FormData();
      [...files].forEach((file) => formData.append("files", file));
      const { data } = await DataService.uploadMultipleFiles(formData);

      if (data) {
        toast.success(
          `Đã tải lên thành công ${data.savedTransNum} bản ghi từ: ${data.filesNameList.join(", ")}`
        );
        if (inputMultipleRef && inputMultipleRef.current) inputMultipleRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
      toast.error("Tải file lên không thành công");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack mt={2} flex={1} justifyContent="center" spacing={2}>
        <Typography textAlign="center" textTransform="uppercase" variant="h5">
          Thêm bản ghi
        </Typography>
        <Box
          width={400}
          height={220}
          bgcolor={grey[50]}
          alignSelf="center"
          display="flex"
          flexDirection="column"
          position="relative"
          justifyContent="center"
          alignItems="center"
          borderRadius={2}
          border="1px dashed grey"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
        >
          <VisuallyHiddenInput
            ref={inputMultipleRef}
            type="file"
            accept=".xlsx"
            multiple
            onChange={handleMultipleFilesChange}
          />
          {/* <img src="/images/uploadImg.svg" /> */}
          <UploadExcelIcon />
          <Typography variant="h6" mt={2}>
            Kéo và thả hoặc click để tải lên
          </Typography>
          <Typography variant="caption" color="grey">
            Định dạng file: .xlsx
          </Typography>
          {(dragActive || loading) && (
            <LoadingOverlay>
              {dragActive && <img src="/images/uploadCloudAnimated.gif" width={100} />}
            </LoadingOverlay>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default DataPage;
