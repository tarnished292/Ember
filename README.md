# Ember

Ember is a desktop application built with Tauri, combining a Rust backend with a modern web frontend. It focuses on performance, low overhead, and a clean separation between system-level logic and UI.

The project is structured to support fast iteration while keeping the core architecture stable and predictable as features grow.

## Core Focus

- Lightweight desktop runtime
- Rust-driven backend logic
- Web-based UI layer
- Clear separation of concerns
- Performance-first design

## Architecture

- **Frontend:** Vite + React
- **Backend:** Rust (Tauri core)
- **Bridge:** Tauri IPC layer

## Design Direction

Ember is built around a simple principle: keep systems small, explicit, and composable. Complexity is introduced only when it becomes necessary, not by default.

The goal is long-term maintainability over short-term convenience.
