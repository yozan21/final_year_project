import axios from "axios";
import { getLandlordStatsURL } from "./apiEndpoints";

export const getLandlordStats = async (token) => {
  const { data } = await axios.get(getLandlordStatsURL, {
    headers: {
      Authorization: token,
    },
  });

  return data.data.data;
};
