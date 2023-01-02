import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/get/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getSpectatorBoard = () => {
  return axios.get(API_URL + "spectator", { headers: authHeader() });
};

const getSystemManagerBoard = () => {
  return axios.get(API_URL + "systemmanager", { headers: authHeader() })
  .then((response) => {
    console.log(response.data)
    if (response.data) {
      system.forEach(element => {
        
      });
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });
};

const getProjectManagerBoard = () => {
  return axios.get(API_URL + "projectmanager", { headers: authHeader() });
};

const getSystems = () => {
  return axios.get(API_URL + "systems", { headers: authHeader() });
}

const userService = {
  getPublicContent,
  getUserBoard,
  getSystemManagerBoard,
  getProjectManagerBoard,
  getSystems,
};

export default userService