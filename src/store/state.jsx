import { create } from "zustand";

export const Store = create((set) => ({
  currentSong: null,
  isPlaying: false,
  

  setCurrentSong: (song) => 
    set({
      currentSong: song,
    }),
  
  setPlaying: (playing) => 
    set({
      isPlaying: playing,
    }),
  
}))