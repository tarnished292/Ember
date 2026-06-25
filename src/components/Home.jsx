import React from "react";
import { Store } from "../store/state";

function Home({ songs = [] }) {
  const currentSong = Store((state) => state.currentSong);
  const setCurrentSong = Store((state) => state.setCurrentSong);

  console.log(currentSong);


  return (
    <>
      <div className="flex-1 overflow-y-auto bg-black text-white px-5 py-5">
        <h1 className="text-2xl font-semibold ml-5 mt-5">Good Evening...</h1>
        <div className="cursor-pointer">
          {songs.map((song) => (
            <div
              key={song.path}
              onClick={() => setCurrentSong(song)}
              className="flex space-x-5 space-y-6 "
            >
              <img className="w-16 h-18 rounded-lg" src={song.cover} />
              <div className="items-center justify-center">
              <h1>{song.title}</h1>
              <h1 className="text-gray-400 text-sm">{song.artist}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
