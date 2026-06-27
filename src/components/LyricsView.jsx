import React from "react";
import { Store } from "../store/state";
import Player from "./Player";
import Navbar from "./Navbar";

export default function FullScreen() {
  const currentSong = Store((state) => state.currentSong);
  const lyrics = Store((state) => state.lyrics);

  return (
    <div className="flex h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="flex flex-1 gap-10 px-10 py-8 overflow-hidden">
        <div className="flex flex-1 items-center justify-center">
          <img
            src={currentSong?.cover}
            alt={currentSong?.title ?? currentSong?.name}
            className="aspect-square w-full max-w-sm rounded-2xl object-cover shadow-2xl"
          />
        </div>

        <div className="flex flex-1 flex-col items-start justify-center overflow-hidden">
          <pre className="h-full w-full overflow-y-auto whitespace-pre-wrap px-6 text-lg leading-10 text-white">
            {lyrics ?? "No lyrics found"}
          </pre>
        </div>
      </div>
      <Player />
    </div>
  );
}
