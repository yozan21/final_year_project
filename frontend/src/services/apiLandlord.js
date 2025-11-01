import axios from "axios";
import { getLandlordStatsURL } from "./apiEndpoints";

export const getLandlordStats = async (token) => {
  console.log(token);
  const { data } = await axios.get(getLandlordStatsURL, {
    headers: {
      Authorization: token,
    },
  });

  console.log(data);

  return data.data.data;
};
