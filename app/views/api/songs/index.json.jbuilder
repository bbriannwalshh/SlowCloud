@songs.each do |song|
  json.set! song.id do
    json.extract! song, :id, :title, :album_id, :genre, :user_id
  end
end