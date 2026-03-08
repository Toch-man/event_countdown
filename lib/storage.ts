import { Count_down } from "./types"; //

const STORAGE_KEY = "event_countdowns";

export const storage = {
  getCountdowns: (): Count_down[] => {
    if (typeof window === "undefined") return [];

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading countdowns:", error);
      return [];
    }
  },

  saveCountdowns: (countdowns: Count_down[]): void => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(countdowns));
    } catch (error) {
      console.error("Error saving countdowns:", error);
    }
  },

  clearAll: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
