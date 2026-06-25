import { create } from "zustand";

export const Store = create((set) => ({
  currentSong: null,

  setCurrentSong: (song) => 
    set({
      currentSong: song,
    }),
}))