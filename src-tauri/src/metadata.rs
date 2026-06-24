use std::path::PathBuf;
use id3::{Tag, TagLike};
use base64::{Engine, engine::general_purpose};

pub fn read_tags(path: PathBuf) -> (Option<String>, Option<String>, Option<String>, Option<String>, Option<String>) {
    let Ok(tag) = Tag::read_from_path(&path) else {
        return (None, None, None, None, None);
    };

    let cover = tag.pictures()
        .find(|p| p.picture_type == id3::frame::PictureType::CoverFront)
        .or_else(|| tag.pictures().next())
        .map(|p| {
            let b64 = general_purpose::STANDARD.encode(&p.data);
            format!("data:{};base64,{}", p.mime_type, b64)
        });

    (
        tag.title().map(|t| t.to_string()),
        tag.album().map(|a| a.to_string()),
        tag.duration().map(|a| a.to_string()),
        tag.artist().map(|a| a.to_string()),
        cover,
    )
}