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

//working with the manually entered playlistID
// const URL =
//   "https://open.spotify.com/user/annaundco.kg/playlist/1RGBEfsPYpCnvRI8S7dgsi?si=kBmkKrB-QJmF9CXlbQl7DQ";

// let url = "";

//trying to work with the given playlistID
router.get("/dashboard", (req, res, next) => {
  res.render("/dashboard");
});

console.log("HEY!!!!!!!!!!!!!!!!!!!!!!!");

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

// var h = URL.split("/")[6];
// var sub = h.substr(0, 22);
// let urlOfId = "" + sub + "";

// console.log("maybe the 6th position of /, who knows:", h);
// console.log("SUBSTRING", sub);
// console.log("URLOFID", urlOfId);

//defining the colors

//getting the url from the form and change it

router.post("/dashboard", (req, res, next) => {
  // const playlist_url = req.body.PlaylistID;
  let URL = req.body.PlaylistID;
  var h = URL.split("/")[6];
  var sub = h.substr(0, 22);
  let urlOfId = "" + sub + "";
  let color1;
  let color2 = 100;
  let color3;

  console.log("maybe the 6th position of /, who knows:", h);
  console.log("SUBSTRING", sub);
  console.log("URLOFID", urlOfId);

  let trackId = "";
  let arrayLength = 0;

  setTimeout(() => {
    spotifyApi.getPlaylistTracks("" + sub + "").then(data => {
      arrayLength = data.body.items.length;
      console.log("array length", arrayLength);

      let colors = [];

      for (var i = 0; i < arrayLength; i++) {
        console.log("Daten von Spotify", data.body.items[i].track.id);
        trackId = data.body.items[i].track.id;
        // console.log("gespeichert in einer Variable", trackId);

        spotifyApi.getAudioAnalysisForTrack("" + trackId + "").then(data2 => {
          color1 = 30 * data2.body.track.key;

          color3 = 98 + 8 * Math.floor(data2.body.track.loudness);
          colors.push(`hsl(${color1}, ${color2 + "%"}, ${color3 + "%"})`);
          console.log("COLORS is", colors);
        });
      }
    });
  }, 200);
  res.redirect("/generatedArt");
});

// Retrieve an access token.
// spotifyApi.clientCredentialsGrant().then(
//   function(data) {
//     spotifyApi.setAccessToken(data.body["access_token"]);
//   },
//   function(err) {
//     console.log("Something went wrong when retrieving an access token", err);
//   }
// );

// axios
//   .get(
//     "https://api.spotify.com/v1/artists/1c30624cba6742dcb792991caecae571/albums"
//   )
//   .then(res => console.log("result is", res))
//   .catch(err => console.log("something is wrong with api", err));

// axios
//   .get("https://api.spotify.com/v1/audio-analysis/06AKEBrKUckW0KREUWRnvT")
//   .then(res => console.log("result is", res))
//   .catch(err => console.log("something is wrong with api", err));

// spotifyApi
//   .get("https://api.spotify.com/v1/audio-analysis/06AKEBrKUckW0KREUWRnvT")
//   .then(res => console.log("result is", res))
//   .catch(err => console.log("something is wrong with api", err));

// spotifyApi.getArtist('2hazSY4Ef3aB9ATXW7F5w3')

//   (req, res, next) => {
//     axios
//       .then(res => console.log("result is", res))
//       .catch(err => console.log("something is wrong with api", err));
//   }
// );

// this code works
// setTimeout(() => {
//   spotifyApi.getAudioAnalysisForTrack("7yotKA30dwTKNEGomV9ZsI").then(data => {
//     console.log(data.body.segments[0].pitches);
//   });
// }, 200);

//Variable that saves the id

//get the id of a song of a given playlist and save this value in the variable that we definded before
// setTimeout(() => {
//   spotifyApi.getPlaylistTracks("4io1HIW2FglXekeLiFsZTU").then(data => {
//     console.log("Daten von Spotify", data.body.items[25].track.id);
//     trackId = data.body.items[25].track.id;
//     console.log("gespeichert in einer Variable", trackId);
//   });
// }, 200);

//use the value of the variable to get the key of this track
// setTimeout(() => {
//   spotifyApi.getAudioAnalysisForTrack("" + trackId + "").then(data2 => {
//     for (var j = 0; j < data.body.items.length; j++) {
//       console.log("key of our chosen song", data2.body.track.key);
//     }
//   });
// }, 500);

//get the loudness of a song
// setTimeout(() => {
//   spotifyApi.getAudioAnalysisForTrack("" + trackId + "").then(data2 => {
//     console.log("loudness of our chosen song", data2.body.track.loudness);
//   });
// }, 700);

// //get the confidence of given song
// setTimeout(() => {
//   spotifyApi.getAudioAnalysisForTrack("" + trackId + "").then(data2 => {
//     console.log(
//       "confidence of our chosen song",
//       data2.body.segments[0].confidence
//     );
//   });
// }, 900);

// setTimeout(() => {
//   spotifyApi.getAudioAnalysisForTrack("4Wv5UAieM1LDEYVq5WmqDd").then(data => {
//     console.log(data.body.segments[0].pitches);
//   });
// }, 200);

// setTimeout(() => {
//   spotifyApi.getAudioAnalysisForTrack(trackId).then(id_finder => {
//     console.log(id_finder.body.segments[0].pitches);
//   });
// }, 200);

// spotifyApi.getArtist("2hazSY4Ef3aB9ATXW7F5w3").then(
//   function(data) {
//     console.log("Artist information", data.body);
//   },
//   function(err) {
//     console.error(err);
//   }
// );

// spotifyApi.searchTracks("artist:Love").then(
//   function(data) {
//     console.log(data.body.tracks);
//   },
//   function(err) {
//     console.log("Something went wrong!", err);
//   }
// );

//   spotifyApi.getAudioAnalysisForTrack("3JIxjvbbDrA9ztYlNcp3yL").then(data => {
//     console.log(data.body.track.key);
//   });
// }, 200);

module.exports = router;
