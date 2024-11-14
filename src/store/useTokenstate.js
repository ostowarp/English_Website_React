import { create } from "zustand";

const useTokenStore = create((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
  clearToken: () => set({ token: null }),
}));

export default useTokenStore;

export const getToken = () => useTokenStore.getState().token;
