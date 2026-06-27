use std::{fs, path::PathBuf};

#[tauri::command]
pub fn load_lyrics(song_path: PathBuf) -> Option<String> {
    let lyrics_path = song_path.with_extension("lrc");
    if !lyrics_path.exists() {
        return None;
    }

    Some(fs::read_to_string(lyrics_path).ok()?)
}