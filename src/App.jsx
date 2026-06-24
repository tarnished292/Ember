import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";

export default function App() {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    invoke("list_song").then(setSongs);
  }, []);

  return (
        <div className="h-screen bg-black">
          <Navbar />
    
          <div className="flex h-[calc(100vh-40px)]">
            <Sidebar />
          </div>
        </div>
      );
    
}
