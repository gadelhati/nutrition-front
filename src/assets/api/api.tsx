import axios from "axios"
import { getLocalAccessToken } from "../../service/service.token"

const token = getLocalAccessToken();

export const api = axios.create({
  baseURL: "http://localhost:3119",
  // baseURL: "https://10.5.193.20/application-back",
});

api.interceptors.request.use(async config => {
  const token = getLocalAccessToken();
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
})