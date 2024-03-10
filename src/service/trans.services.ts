import { IncorrectTransResDto, UpdateTransDto } from "@/types/type.dto";
import api from "./api";
import { API_PATH } from "./path";
import {
  CorrectTransByEditorStatisticDto,
  EditorStatisticDto,
  TransStatisticDto,
} from "@/types/statistic.dto";

const getIncorrectTrans = () => {
  return api.get<IncorrectTransResDto>(API_PATH.INCORRECT_TRANS);
};

const updateTransById = (id: number, data: UpdateTransDto) => {
  return api.patch(API_PATH.TRANSLATION + `/${id}`, data);
};

const getTransStatistic = async () => {
  const { data } = await api.get<TransStatisticDto>(API_PATH.TRANS_STATISTIC);

  return data;
};

const getCurrentMonthlyEditorStatistic = async () => {
  const { data } = await api.get<CorrectTransByEditorStatisticDto>(
    API_PATH.MONTHLY_EDITOR_STATISTIC
  );

  return data;
};

const getAllTimeEditorStatistic = async () => {
  const { data } = await api.get<EditorStatisticDto[]>(API_PATH.ALL_TIME_EDITOR_STATISTIC);

  return data;
};

const TransService = {
  getIncorrectTrans,
  updateTransById,
  getTransStatistic,
  getMonthlyEditorStatistic: getCurrentMonthlyEditorStatistic,
  getAllTimeEditorStatistic,
};

export default TransService;
