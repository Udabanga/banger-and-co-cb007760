import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserPage = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorPage = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminPage = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserPage,
  getModeratorPage,
  getAdminPage,
};
