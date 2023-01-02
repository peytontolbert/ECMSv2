import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const register = (Username, Password) => {
  console.log("registering: " + Username + Password)
  return axios.post(API_URL + "register", {
    Username,
    Password
  });
};

const login = (Username, Password) => {
  console.log("username: " + Username + "password: " + Password)
  return axios.post(API_URL + "login", {
      Username,
      Password
    })
    .then((response) => {
      console.log(response.data.user)
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;