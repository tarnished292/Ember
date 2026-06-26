import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Player from "./components/Player";

export default function App() {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    invoke("list_song").then(setSongs);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
        <Navbar />
     
        <div className="flex flex-1 min-h-0">
          <Sidebar />
        <Home songs={songs} />
        </div>
        <Player />
      </div>
    );
  }
   