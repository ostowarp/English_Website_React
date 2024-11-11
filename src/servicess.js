import axios from "axios";

const SERVER_URL = "http://127.0.0.1:8000/";

export const getprofile = () => {
  const url = `${SERVER_URL}/api/getnameprof/`;
  return axios.get(url);
};
