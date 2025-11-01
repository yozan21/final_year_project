import axios from "axios";
import { currentUserURL, loginURL, logoutURL, signupURL } from "./apiEndpoints";

export const loginApi = async ({ email, password }) => {
  const { data } = await axios.post(loginURL, { email, password });
  return data;
};

export const logoutApi = async () => {
  const { data } = await axios.post(logoutURL);
  return data;
};

export const signupApi = async ({
  name,
  email,
  phone,
  phoneSecond = "",
  address,
  password,
  confirmPassword,
  role,
}) => {
  const { data } = await axios.post(signupURL, {
    name,
    email,
    phone,
    phoneSecond,
    address,
    password,
    confirmPassword,
    role,
  });
  return data;
};

export const getCurrentUserApi = async (token) => {
  const { data } = await axios.get(currentUserURL, {
    headers: {
      Authorization: token,
    },
  });

  return data.data.data;
};
