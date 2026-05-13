import { getAdminStatsURL } from "./apiEndpoints";
import api from "./axios";

export const getAdminStats = async () => {
  const { data } = await api.get(getAdminStatsURL);

  return data.data.data;
};
