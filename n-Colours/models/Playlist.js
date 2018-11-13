const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    playlist_url: String
    // playlist_picture: Image
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = Playlist;
