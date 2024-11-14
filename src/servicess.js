import axios from "axios";
const SERVER_URL = "http://127.0.0.1:8000";

export const getServerUrl = () => {
  return SERVER_URL;
};

import useTokenStore from "./store/useTokenstate";
// USE TOKEN FOR ALL REQUEST:
import { getToken } from "./store/useTokenstate";
const token = getToken();

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
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
export const getprofile = (token) => {
  const url = "/getnameprof/";
  return api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// get Deck complete number:
export const getDeckComplete = (token) => {
  const url = "/deckcompleted/";
  return api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// get Due or all decks:
export const getDecks = (token, all) => {
  const url = all ? "/decks/all" : "/decks/";
  // const url = "decks";
  return api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
