mod metadata;
use log::info;
use metadata::read_tags;
use serde::Serialize;
use std::{fs, path::PathBuf};
mod lyrics;
use lyrics::load_lyrics;


#[tauri::command]
fn list_song() -> Vec<Song> {
    let dir = dirs::audio_dir().unwrap_or_else(|| {
        let mut fallback = dirs::home_dir().expect("No home dir");
        fallback.push("Music");
        fallback
    });

    info!("Audio dir: {:?}", dir);
    read_file(&dir)
}

#[derive(Debug, Serialize)]
struct Song {
    title: Option<String>,
    name: String,
    album: Option<String>,
    artist: Option<String>,
    path: String,
    cover: Option<String>,
}

fn read_file(path: &PathBuf) -> Vec<Song> {
    let paths = fs::read_dir(path).unwrap();
    let mut songs = Vec::new();

    let extension = ["mp3", "aac", "ogg", "wma"];

    for file in paths {
        let file = file.unwrap();
        let path = file.path();

        if path.is_dir() {
            songs.extend(read_file(&path));
            continue;
        }

        let ext = match path.extension().and_then(|e| e.to_str()) {
            Some(e) => e.to_lowercase(),
            None => continue,
        };

        if extension.contains(&ext.as_str()) {
            let name = path
                .file_stem()
                .and_then(|e| e.to_str())
                .unwrap_or("Unknown")
                .to_string();

            let (title, album, artist, cover) = read_tags(path.clone());
            songs.push(Song {
                name,
                path: path.display().to_string(),
                title,
                album,
                artist,
                cover,
            });
        }
    }
    info!("Loaded {} songs", songs.len());
    return songs;
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    info!("hello");
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![list_song, load_lyrics])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
