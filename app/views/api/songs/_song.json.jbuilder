json.extract! song, :id, :title, :album, :genre, :user_id
if (song.audio_file.attached?) 
  json.audio_fileUrl url_for(user.photo)
end
json.album song.album
json.artist song.user 