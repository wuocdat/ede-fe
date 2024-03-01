import { PreDataUploadResDto, PreTransDto } from "@/types/type.dto";
import api from "./api";
import { API_PATH } from "./path";

const uploadFile = (data: FormData) => {
  return api.post<PreTransDto[]>(API_PATH.UPLOAD, data);
};

const uploadPreData = (preData: PreTransDto[]) => {
  return api.post<PreDataUploadResDto>(API_PATH.PRE_DATA_UPLOAD, preData);
};

const DataService = {
  uploadFile,
  uploadPreData,
};

export default DataService;
