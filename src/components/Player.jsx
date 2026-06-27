import { useEffect, useRef, useCallback } from "react";
import { Undo, Redo, MicVocal } from "lucide-react";
import { Store } from "../store/state";
import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";

function Player() {
  const currentSong = Store((state) => state.currentSong);
  const isPlaying = Store((state) => state.isPlaying);
  const setPlaying = Store((state) => state.setPlaying);
  const audioRef = useRef(null);
  const lyricsMode = Store((state) => state.lyricsMode);
  const setLyricsMode = Store((state) => state.setLyricsMode);
  const setLyrics = Store((state) => state.setLyrics);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!currentSong) return;

    invoke("load_lyrics", {
      songPath: currentSong.path,
    }).then((lyrics) => {
      setLyrics(lyrics);
      console.log(lyrics);
    });

    const audio = audioRef.current;
    audio.src = convertFileSrc(currentSong.path);
    audio.load();
    audio.onloadeddata = () => {
      setPlaying(true);
      audio.play().catch(console.error);
    };
  }, [currentSong?.path]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  if (!currentSong) return null;

  return (
    <>
      <audio
        ref={audioRef}
        onLoadedMetadata={(e) => {
          const sec = e.currentTarget.duration;
          setDuration(e.currentTarget.duration);
          const fmt = `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;
          console.log(fmt);
        }}
        onTimeUpdate={(e) => {
          setCurrentTime(e.currentTarget.currentTime);
        }}
      />
      <div className="h-24 bg-black text-white flex flex-col justify-center px-6 gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 w-1/3">
            {currentSong.cover ? (
              <img
                src={currentSong.cover}
                alt={currentSong.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-zinc-800" />
            )}
            <div>
              <h3 className="text-sm font-medium truncate">
                {currentSong.title || currentSong.name}
              </h3>
              <p className="text-xs text-zinc-500 truncate">
                {currentSong.artist || "Unknown Artist"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-10">
            <button>
              <Undo />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition cursor-pointer"
              onClick={() => setPlaying(!isPlaying)}
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            <button>
              <Redo />{" "}
            </button>
            <button onClick={() => setLyricsMode(!lyricsMode)} className="cursor-pointer">
              <MicVocal size={16} />{" "}
            </button>
          </div>

          <div className="w-1/3" />
        </div>

        <div className="flex items-center gap-2 w-1/2 mx-auto">
          <span className="text-xs text-zinc-500 w-8 text-right">
            {`${Math.floor(currentTime / 60)}:${String(Math.floor(currentTime % 60)).padStart(2, "0")}`}
          </span>
          <div className="relative flex-1 h-1 cursor-pointer">
            <input
              type="range"
              min={0}
              max={duration || 1}
              value={currentTime}
              onChange={(e) => {
                audioRef.current.currentTime = Number(e.target.value);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full h-full bg-white/10 rounded-full">
              <div
                className="h-full bg-[#C96A2A] rounded-full"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-zinc-500 w-8">
            {`${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, "0")}`}
          </span>
        </div>
      </div>
    </>
  );
}

export default Player;
