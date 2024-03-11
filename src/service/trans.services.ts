import {
  FindTransOptions,
  IncorrectTransResDto,
  TranslationDto,
  UpdateTransDto,
} from "@/types/type.dto";
import api from "./api";
import { API_PATH } from "./path";
import {
  CorrectTransByEditorStatisticDto,
  EditorStatisticDto,
  TransStatisticDto,
  YearlyStatisticChartDto,
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

const getYearlyStatisticChartData = async () => {
  const { data } = await api.get<YearlyStatisticChartDto[]>(API_PATH.YEARLY_STATISTIC_DATA_CHART);

  return data;
};

const getRecetUpdatedTrans = async () => {
  const { data } = await api.get<TranslationDto[]>(API_PATH.RECENT_UPDATED_TRANS);

  return data;
};

const getOneById = async (transId: number) => {
  const { data } = await api.get<TranslationDto>(API_PATH.GET_ONE_BY_ID + `/${transId}`);

  return data;
};

const getTransWithOptions = async (option: FindTransOptions) => {
  const { data } = await api.get<[TranslationDto[], number]>(API_PATH.GET_TRANS_WITH_OPTIONS, {
    params: option,
  });

  return data;
};

const TransService = {
  getIncorrectTrans,
  updateTransById,
  getTransStatistic,
  getMonthlyEditorStatistic: getCurrentMonthlyEditorStatistic,
  getAllTimeEditorStatistic,
  getYearlyStatisticChartData,
  getRecetUpdatedTrans,
  getOneById,
  getTransWithOptions,
};

export default TransService;
