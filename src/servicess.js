import axios from "axios";
const SERVER_URL = "http://127.0.0.1:8000";

export const getServerUrl = () => {
  return SERVER_URL;
};

import useTokenStore from "./store/useTokenstate";
// USE TOKEN FOR ALL REQUEST:
import { getToken } from "./store/useTokenstate";
const token = getToken();

// -------------------------------
// Axios Instance Configuration
// -------------------------------
const api = axios.create({
  baseURL: `${SERVER_URL}/api/`,
});

// -------------------------------
// User Authentication APIs
// -------------------------------

// Register a new user (POST)
export const registerUser = (user) => {
  const url = `${SERVER_URL}/api/register/`;
  return axios.post(url, user);
};

// Login user and get access/refresh tokens (POST)
export const loginUser = (user) => {
  const url = `${SERVER_URL}/api/token/`;
  return axios.post(url, user);
};

// NOTE: this is for refresh token api:
export const refreshToken = (refreshToken) => {
  const url = "/token/refresh/";
  return api.post(url, { refresh: refreshToken });
};

// get profile and full name:
export const getProfile = (token) => {
  const url = "/profile/";
  return api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// -------------------------------
// Deck Management APIs
// -------------------------------

// (Create:POST) Deck:
export const createDeck = (token, newDeck) => {
  const url = "/decks/create/";
  return api.post(url, newDeck, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// get Deck complete number:
export const getDeckComplete = (token) => {
  const url = "/completed/decks/";
  return api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// get Due or all decks:
export const getDecks = (token, all) => {
  const url = all ? "/decks/all" : "/decks/";
  return api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get specific single Deck:
export const getDeck = (token, id) => {
  const url = `/decks/${id}/`;
  return api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// (DELETE) Deck:
export const deleteDeck = (token, deckId) => {
  const url = `/decks/${deckId}/`;
  return api.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// -------------------------------
// FlashCard Management APIs
// -------------------------------

// (POST) new card in specific deck:
export const createFlashCard = (token, deckId, newCard) => {
  const url = `/decks/${deckId}/flashcard/`;
  return api.post(url, newCard, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// (GET) card in specific deck:
export const getFlashCards = (token, deckId, all) => {
  const url = all ? `/decks/${deckId}/cards/all` : `/decks/${deckId}/cards`;
  return api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// (DELETE) flashcard:
export const delete_flashcard = (token, cardId) => {
  const url = `/flashcards/${cardId}/`;
  return api.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// (Update:PUT) specific flashcard by id:
export const updateFlashCard = (token, cardId, card) => {
  const url = `/flashcards/${cardId}/`;
  return api.put(url, card, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// (Review:POST) specific flashcard:
export const review_flashcard = (token, cardId, review) => {
  const url = `/flashcards/${cardId}/`;
  return api.post(url, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// -------------------------------
// Category Management APIs
// -------------------------------

// Add POST Category:
export const addCategory = (token, category) => {
  const url = "/categories/";
  return api.post(url, category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get All Categories:
export const getCategories = (token) => {
  const url = "/categories/";
  return api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
