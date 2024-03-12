import { PreDataUploadResDto, PreTransDto, UploadMultipleFilesResDto } from "@/types/type.dto";
import api from "./api";
import { API_PATH } from "./path";

const uploadFile = (data: FormData) => {
  return api.post<PreDataUploadResDto>(API_PATH.UPLOAD, data);
};

const uploadMultipleFiles = (data: FormData) => {
  return api.post<UploadMultipleFilesResDto>(API_PATH.UPLOAD_MULTIPLE_FILES, data);
};

const uploadPreData = (preData: PreTransDto[]) => {
  return api.post<PreDataUploadResDto>(API_PATH.PRE_DATA_UPLOAD, preData);
};

const DataService = {
  uploadFile,
  uploadPreData,
  uploadMultipleFiles,
};

export default DataService;
