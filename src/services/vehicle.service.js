import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/";

const getVehicleList = () => {
    return axios.get(API_URL + "vehicles");
  };


  export default {
    getVehicleList,
  };