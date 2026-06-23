import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

export default function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        Ember
      </h1>
    </div>
  );
}