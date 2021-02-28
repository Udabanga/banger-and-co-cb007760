import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "test/all");
};

const getUserPage = () => {
  return axios.get(API_URL + "test/user", { headers: authHeader() });
};

const getEmployeePage = () => {
  return axios.get(API_URL + "test/employee", { headers: authHeader() });
};

const getAdminPage = () => {
  return axios.get(API_URL + "test/admin", { headers: authHeader() });
};

const getUserList = () => {
  return axios.get(API_URL + "users", { headers: authHeader() });
};

const updateUser = () => {
  return axios.put(API_URL + "users/update", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserPage,
  getEmployeePage,
  getAdminPage,
  getUserList,
  updateUser,
};
