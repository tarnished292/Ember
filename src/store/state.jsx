import { create } from "zustand";

export const Store = create((set) => ({
  currentSong: null,
  isPlaying: false,
  lyricsMode: false,
  lyrcis: null,
  

  setCurrentSong: (song) => 
    set({
      currentSong: song,
    }),
  
  setPlaying: (playing) => 
    set({
      isPlaying: playing,
    }),
  
  setLyricsMode: (value) => 
    set({
      lyricsMode: value,
    }),
  
  setLyrics: (lyrics) => 
    set({
      lyrics,
    }),
  
}))