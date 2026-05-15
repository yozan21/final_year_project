import { getLandlordStatsURL } from "./apiEndpoints";
import api from "./axios";

export const getLandlordStats = async () => {
  const { data } = await api.get(getLandlordStatsURL);

  return data.data.data;
};
