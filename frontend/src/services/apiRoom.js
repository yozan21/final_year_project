import { getRoomsURL, getRoomURL } from "./apiEndpoints";
import api from "./axios";

export const getRoomsApi = async () => {
  const { data } = await api.get(getRoomsURL);
  return data.data.data;
};

export const getNearbyRoomsApi = async ({ lat, lng, radius = 10 }) => {
  const { data } = await api.get(`${getRoomsURL}nearby`, {
    params: { lat, lng, radius },
  });
  return data.data.data;
};

export const getRoomsInBoundsApi = async ({ bounds, filters = {} }) => {
  const { data } = await api.get(`${getRoomsURL}map-search`, {
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
  });
  return data.data.data;
};

export const getRoomApi = async (id) => {
  const { data } = await api.get(getRoomURL.replace("id", id));
  return data.data.data;
};

export const createRoomApi = async (formData) => {
  const { data } = await api.post(getRoomsURL, formData);
  return data.data.data;
};

export const updateRoomApi = async (id, formData) => {
  const { data } = await api.patch(getRoomURL.replace("id", id), formData);
  return data.data.data;
};

export const updateRoomStatusApi = async (id, status) => {
  const { data } = await api.patch(
    `${getRoomURL.replace("id", id)}/updateRoomStatus`,
    { status },
  );
  return data.data.data;
};

export const deleteRoomApi = async (id) => {
  await api.delete(getRoomURL.replace("id", id));
  return id;
};
