import React from "react";
import { Store } from "../store/state";

function Home({ songs = [] }) {
  const currentSong = Store((state) => state.currentSong);
  const setCurrentSong = Store((state) => state.setCurrentSong);

  console.log(currentSong);

  return (
    <>
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-[#121212] text-white px-5 py-5 ">
        <h1 className="text-2xl font-semibold ml-2 mt-5 mb-4">Library</h1>
        <div className="cursor-pointer">
          {songs.map((song) => {
            const isActive = currentSong?.path === song.path;
            return (
              <div
                key={song.path}
                onClick={() => setCurrentSong(song)}
                className={`flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  isActive ? "bg-[#C96A2A]/20 border border-[#C96A2A]/30" : "hover:bg-white/5"
                }`}
              >
                <img className="w-10 h-10 rounded-lg" src={song.cover} />
                <div className="items-center justify-center">
                <h1 className={`text-sm font-medium truncate ${isActive ? "text-[#C96A2A]" : ""}`}>{song.title}</h1>
                  <p className="text-gray-400 text-sm">{song.artist || "Unknown artist"}</p>
                  <p>{song.duration}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
