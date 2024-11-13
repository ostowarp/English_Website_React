import axios from "axios";
const SERVER_URL = "http://127.0.0.1:8000";

// USE TOKEN FOR ALL REQUEST:
const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
// Noteحالا میتونیم به جای اکسیوس از ای پی ای استفاده کنیم:

// Register User NOTE POST method:
export const registerUser = (user) => {
  const url = `${SERVER_URL}/api/user/create/`;
  return axios.post(url, user);
};

// Login User NOTE POST method:
export const loginUser = (user) => {
  const url = `${SERVER_URL}/api/token/`;
  return axios.post(url, user);
};

// get profile and full name:
export const getprofile = () => {
  const url = `/getnameprof/`;
  return api.get(url);
};
