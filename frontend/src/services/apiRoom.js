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
    }
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
