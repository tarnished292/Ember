import React from "react";
import { useEffect, useRef, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Store } from "../store/state";
import { convertFileSrc } from "@tauri-apps/api/core";

function Player() {
  const currentSong = Store((state) => state.currentSong);
  const audioRef = useRef(null);
  

  useEffect(() => {
      if (!currentSong) return; 
    const audio = audioRef.current;
    audio.src = convertFileSrc(currentSong.path);
      audio.load();
      audio.play().catch((e) => console.error("Playback error:", e));
    }, [currentSong?.path]);

  if (!currentSong) return null;

  return (
    <>
      <audio ref={audioRef} />
      <div className="h-20 border-t border-zinc-800 bg-black text-white flex items-center justify-between px-6">

        
      <div className="flex items-center gap-4 w-1/3">
        {currentSong.cover ? (
          <img
            src={currentSong.cover}
            alt={currentSong.name}
            className="w-14 h-14 rounded-lg object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-zinc-800" />
        )}

        <div>
          <h3 className="font-medium">{currentSong.title || currentSong.name}</h3>

          <p className="text-sm text-zinc-500">{currentSong.artist || "Unknown Artist"}</p>
        </div>
      </div>
    
    </div>
    </>
  );
}

export default Player;
