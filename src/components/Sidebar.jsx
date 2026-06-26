import React, { useState } from "react";
import {
  AudioLines,
  Library,
  LucideDisc,
  LucideDownload,
  LucideHeart,
  Telescope,
} from "lucide-react";

function Sidebar() {
  const navItem = [
    { id: "home", icon: <AudioLines size={18} />, label: "Explore" },
    { id: "library", icon: <Library size={18} />, label: "Library" },
    { id: "Discovery", icon: <Telescope size={18} />, label: "Albums" },
    { id: "liked", icon: <LucideHeart size={18} />, label: "Liked" },
    { id: "download", icon: <LucideDownload size={18} />, label: "Download" },
  ];

  return (
    <>
      <div className="w-56 h-full text-white border-r border-zinc-800 bg-[#121212]">
        <div className="text-white pt-6 cursor-pointer text-sm">
          <div className="flex items-center justify-center mr-28 mb-3">
            <img src="./icon.png" alt="image-icon" className="w-16" />

            <h1 className="font-bold text-2xl -ml-3 text-orange-600">Ember</h1>
          </div>
          {navItem.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3  text-zinc-400
                   hover:text-white
                   py-4 rounded-2xl px-4
                   hover:bg-zinc-900
                   transition-all
                   duration-150 "
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
