import { createContext } from "react";

export const ContactContext = createContext({
  profile_img: "",
  profile_name: "",
  completedDecks: 0,
  dueDecks: 0,
  decks_percent: 0,
});
