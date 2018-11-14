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

// router.post("/dashboard", (req, res, next) => {
//   console.log("--------------------------------------------------");

//   const playlist_url = req.body.PlaylistID;
//   url = req.body.PlaylistID;

//   console.log("playlist_url", playlist_url);
//   console.log("I am the URL", url);

//   if (playlist_url === "") {
//     res.render({ message: "Indicate Playlist URL" });
//     return;
//   }

//   const newPlaylist = new Playlist({
//     playlist_url
//   });

//   newPlaylist
//     .save()
//     .then(() => {
//       console.log("SAVED");

//       res.redirect("/generatedArt");
//     })
//     .catch(err => {
//       res.render("/dashboard", { message: "Something went wrong" });
//     });
// });

router.post("/dashboard", (req, res, next) => {
  // const playlist_url = req.body.PlaylistID;
  let URL = req.body.PlaylistID;
  var h = URL.split("/")[6];
  var sub = h.substr(0, 22);
  console.log("hello");

  // let urlOfId = sub + "";
  console.log("mierrrrrrr", URL);

  // console.log("maybe the 6th position of /, who knows:", h);
  // console.log("SUBSTRING", sub);
  // console.log("URLOFID", urlOfId);

  let trackId = "";
  let arrayLength = 0;

  spotifyApi
    .getPlaylistTracks("" + sub + "")
    .then(data => {
      arrayLength = data.body.items.length;
      // console.log("array length", arrayLength);

      let promises = [];

      for (var i = 0; i < arrayLength; i++) {
        // console.log("Daten von Spotify", data.body.items[i].track.id);
        trackId = data.body.items[i].track.id;
        // console.log("gespeichert in einer Variable", trackId);
        promises.push(spotifyApi.getAudioAnalysisForTrack(trackId + ""));
      }
      Promise.all(promises).then(datas => {
        let colors = [];
        for (var i = 0; i < datas.length; i++) {
          let color1 = 30 * datas[i].body.track.key;
          let color2 = 100;
          let color3 = 98 + 8 * Math.floor(datas[i].body.track.loudness);
          colors.push(`hsl(${color1}, ${color2 + "%"}, ${color3 + "%"})`);
        }
        // console.log("COLORS is", colors);
        res.render("generatedArt", { colors });
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
