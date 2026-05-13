import axios from "axios";
import { getLandlordStatsURL } from "./apiEndpoints";

export const getLandlordStats = async () => {
  const { data } = await axios.get(getLandlordStatsURL);

  return data.data.data;
};
