import axios from "axios";
import { getAdminStatsURL } from "./apiEndpoints";

export const getAdminStats = async (token) => {
  const { data } = await axios.get(getAdminStatsURL, {
    headers: {
      Authorization: token,
    },
  });

  return data.data.data;
};
