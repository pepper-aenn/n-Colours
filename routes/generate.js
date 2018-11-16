const axios = require("axios");
var http = require("http");

const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");
const Playlist = require("../models/Playlist");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");

// Remember to paste your credentials here

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

spotifyApi.clientCredentialsGrant().then(
  function(data) {
    spotifyApi.setAccessToken(data.body["access_token"]);
  },
  function(err) {
    console.log("Something went wrong when retrieving an access token", err);
  }
);

//trying to work with the given playlistID
router.get("/dashboard", (req, res, next) => {
  res.render("/dashboard");
});

router.post("/dashboard", (req, res, next) => {
  // const playlist_url = req.body.PlaylistID;
  let URL = req.body.PlaylistID;
  var h = URL.split("/")[6];
  var sub = h.substr(0, 22);
  console.log("hello");

  let trackId = "";
  let arrayLength = 0;

  spotifyApi.getPlaylist("" + sub + "").then(data2 => {
    playlist_name = data2.body.name;
    console.log("I am a playlist and i am called:", playlist_name);
  });

  let names = [];

  spotifyApi
    .getPlaylistTracks("" + sub + "")
    .then(data => {
      arrayLength = data.body.items.length;
      // console.log("array length", arrayLength);
      // console.log(data.body.items[1].track.name);
      let promises = [];
      for (var i = 0; i < arrayLength; i++) {
        // console.log(data.body.items[i].track.name);
        names.push(data.body.items[i].track.name);
      }

      let artists = [];
      for (var i = 0; i < arrayLength; i++) {
        artist = data.body.items[i].track.artists[0].name;
        artists.push(data.body.items[i].track.artists[0].name);
      }
      console.log(artists);

      let play_songs = [];
      for (var i = 0; i < arrayLength; i++) {
        play_songs.push(data.body.items[i].track.preview_url);
      }
      // let song_url = data.body.items[2].track.preview_url;
      console.log("I AM THE PREVIEW", play_songs);

      for (var i = 0; i < arrayLength; i++) {
        // console.log("Daten von Spotify", data.body.items[i].track.id);
        trackId = data.body.items[i].track.id;
        // console.log("gespeichert in einer Variable", trackId);
        promises.push(spotifyApi.getAudioAnalysisForTrack(trackId + ""));
      }
      Promise.all(promises).then(datas => {
        let colors = [];
        // console.log(names);

        for (var i = 0; i < datas.length; i++) {
          let color1 = 30 * datas[i].body.track.key;
          let color2 = 100;
          let color3 = 98 + 8 * Math.floor(datas[i].body.track.loudness);
          colors.push(`hsl(${color1}, ${color2 + "%"}, ${color3 + "%"})`);
        }

        //create Playlist in DB
        let playlist_url = req.body.PlaylistID;
        // let playlist_name= ;
        let playlist_array = promises;

        if (playlist_url === "") {
          res.render({ message: "Indicate Playlist URL" });
          return;
        }

        let objectSongs = [];

        for (let i = 0; i < names.length; i++) {
          let color = {
            name: names[i],
            color: colors[i],
            artists: artists[i]
          };
          objectSongs.push(color);
        }

        console.log(objectSongs);

        const newPlaylist = new Playlist({
          playlist_name,
          playlist_url: playlist_url,
          playlist_array: colors
          // playlist_picture
        });

        newPlaylist
          .save()
          .then(() => {
            // return playlist_name;
            // console.log("SAVED");

            // res.redirect("/generatedArt")-> DRAW;
            res.render("generatedArt", {
              objectSongs,
              playlist_name,
              play_songs
            });
          })
          .catch(err => {
            res.render("/dashboard", { message: "Something went wrong" });
          });
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
