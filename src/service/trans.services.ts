import { IncorrectTransResDto, UpdateTransDto } from "@/types/type.dto";
import api from "./api";
import { API_PATH } from "./path";

const getIncorrectTrans = () => {
  return api.get<IncorrectTransResDto>(API_PATH.INCORRECT_TRANS);
};

const updateTransById = (id: number, data: UpdateTransDto) => {
  return api.patch(API_PATH.TRANSLATION + `/${id}`, data);
};

const TransService = {
  getIncorrectTrans,
  updateTransById,
};

export default TransService;
