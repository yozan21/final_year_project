import axios from "axios";
import { getRoomsURL, getRoomURL } from "./apiEndpoints";

export const getRoomsApi = async (token) => {
  const { data } = await axios.get(getRoomsURL, {
    headers: {
      Authorization: token,
    },
  });
  return data.data.data;
};

export const getNearbyRoomsApi = async (token, { lat, lng, radius = 10 }) => {
  const { data } = await axios.get(`${getRoomsURL}nearby`, {
    params: { lat, lng, radius },
    headers: {
      Authorization: token,
    },
  });
  return data.data.data;
};

export const getRoomsInBoundsApi = async (token, { bounds, filters = {} }) => {
  const { data } = await axios.get(`${getRoomsURL}map-search`, {
    params: {
      north: bounds.north,
      south: bounds.south,
      east: bounds.east,
      west: bounds.west,
      limit: 100,
      type: filters.type || undefined,
      provinceId: filters.provinceId || undefined,
      districtId: filters.districtId || undefined,
      localLevelId: filters.localLevelId || undefined,
      ward: filters.ward || undefined,
    },
    headers: {
      Authorization: token,
    },
  });
  return data.data.data;
};

export const getRoomApi = async (token, id) => {
  const { data } = await axios.get(getRoomURL.replace("id", id), {
    headers: {
      Authorization: token,
    },
  });
  return data.data.data;
};

export const createRoomApi = async (token, formData) => {
  const { data } = await axios.post(getRoomsURL, formData, {
    headers: {
      Authorization: token,
    },
  });
  return data.data.data;
};

export const updateRoomApi = async (token, id, formData) => {
  const { data } = await axios.patch(getRoomURL.replace("id", id), formData, {
    headers: {
      Authorization: token,
    },
  });
  return data.data.data;
};

export const updateRoomStatusApi = async (token, id, status) => {
  const { data } = await axios.patch(
    `${getRoomURL.replace("id", id)}/updateRoomStatus`,
    { status },
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return data.data.data;
};

export const deleteRoomApi = async (token, id) => {
  await axios.delete(getRoomURL.replace("id", id), {
    headers: {
      Authorization: token,
    },
  });
  return id;
};
