import React from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

function Navbar() {
  return (
    <div
      data-tauri-drag-region
      className="h-10 bg-[#0F0F12] flex items-center px-4 border-b border-zinc-800"
    >
      <div
        className="flex items-center gap-2"
        data-tauri-drag-region={false}
      >
        <button
          onClick={() => appWindow.close()}
          className="w-3 h-3 rounded-full bg-red-500 hover:brightness-110"
        />

        <button
          onClick={() => appWindow.minimize()}
          className="w-3 h-3 rounded-full bg-yellow-500 hover:brightness-110"
        />

        <button
          onClick={() => appWindow.toggleMaximize()}
          className="w-3 h-3 rounded-full bg-green-500 hover:brightness-110"
        />
      </div>
    </div>
  );
}

export default Navbar;