const axios = require("axios");
var http = require("http");

const express = require("express");
const router = express.Router();

const SpotifyWebApi = require("spotify-web-api-node");

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

const URL =
  "https://open.spotify.com/user/annaundco.kg/playlist/1RGBEfsPYpCnvRI8S7dgsi?si=kBmkKrB-QJmF9CXlbQl7DQ";
var sub = URL.substr(52, 22);
const urlOfId = "" + sub + "";

console.log("SUBSTRING", sub);
console.log("URLOFID", urlOfId);

let trackId = "";
let arrayLength = 0;
setTimeout(() => {
  spotifyApi.getPlaylistTracks("" + sub + "").then(data => {
    arrayLength = data.body.items.length;
    console.log("array length", arrayLength);

    for (var i = 0; i < arrayLength; i++) {
      console.log("Daten von Spotify", data.body.items[i].track.id);
      trackId = data.body.items[i].track.id;
      // console.log("gespeichert in einer Variable", trackId);

      spotifyApi.getAudioAnalysisForTrack("" + trackId + "").then(data2 => {
        // for (var j = 0; j < arrayLength; j++) {
        console.log("key of our chosen song", data2.body.track.key);
        switch (data2.body.track.key) {
          case 0:
            console.log("0,100,90");
            break;
          case 1:
            console.log("30,100,90");
            break;
          case 2:
            console.log("60,100,90");
            break;
          case 3:
            console.log("90,100,90");
            break;
          case 4:
            console.log("120,100,90");
            break;
          case 5:
            console.log("150,100,90");
            break;
          case 6:
            console.log("180,100,90");
            break;
          case 7:
            console.log("210,100,90");
            break;
          case 8:
            console.log("240,100,90");
            break;
          case 9:
            console.log("270,100,90");
            break;
          case 10:
            console.log("300,100,90");
            break;
          case 11:
            console.log("330,100,90");
            break;
          case 12:
            console.log("360,100,90");
            break;
        }
        // }
      });

      spotifyApi.getAudioAnalysisForTrack("" + trackId + "").then(data2 => {
        console.log(
          "loudness of the song",
          Math.floor(data2.body.track.loudness)
        );
        switch (data2.body.track.loudness) {
          case -1:
            console.log("0,10,90");
            break;
          case -2:
            console.log("0,10,90");
            break;
        }
      }, 400);
    }
  });
}, 200);

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
