import { currentUserURL, loginURL, logoutURL, signupURL } from "./apiEndpoints";
import api from "./axios";

export const loginApi = async ({ email, password }) => {
  const { data } = await api.post(loginURL, { email, password });
  return data;
};

export const logoutApi = async () => {
  const { data } = await api.post(logoutURL);
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
  const { data } = await api.post(signupURL, {
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

export const getCurrentUserApi = async () => {
  const { data } = await api.get(currentUserURL);

  return data.data.data;
};
