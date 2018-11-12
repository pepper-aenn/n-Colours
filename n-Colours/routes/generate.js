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
let color1;
let color2 = 100;
let color3;

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
        //console.log("key of our chosen song", data2.body.track.key);
        switch (data2.body.track.key) {
          case 0:
            color1 = 0;
            console.log("color 1", color1);
            break;
          case 1:
            color1 = 30;
            console.log("color 1", color1);
            break;
          case 2:
            color1 = 60;
            console.log("color 1", color1);
            break;
          case 3:
            color1 = 90;
            console.log("color 1", color1);
            break;
          case 4:
            color1 = 120;
            console.log("color 1", color1);
            break;
          case 5:
            color1 = 150;
            console.log("color 1", color1);
            break;
          case 6:
            color1 = 180;
            console.log("color 1", color1);
            break;
          case 7:
            color1 = 210;
            console.log("color 1", color1);
            break;
          case 8:
            color1 = 240;
            console.log("color 1", color1);
            break;
          case 9:
            color1 = 270;
            console.log("color 1", color1);
            break;
          case 10:
            color1 = 300;
            console.log("color 1", color1);
            break;
          case 11:
            color1 = 330;
            console.log("color 1", color1);
            break;
          case 12:
            color1 = 360;
            console.log("color 1", color1);
            break;
        }

        // console.log("COLORS with color 2 is", colors);
        // }
      });

      spotifyApi.getAudioAnalysisForTrack("" + trackId + "").then(
        data2 => {
          // console.log(
          //   "loudness of the song",
          //   Math.floor(data2.body.track.loudness)
          // );
          // if (
          //   (data2.body.track.key === 0 && data2.body.track.loudness === -1) ||
          //   data2.body.track.loudness === 0
          // ) {
          //   ("red and bright: 0,100,90");
          // } else if (
          //   data2.body.track.key === 0 &&
          //   data2.body.track.loudness === -2
          // ) {
          //   ("red and less bright: 0,100,82");
          // } else if (
          //   data2.body.track.key === 0 &&
          //   data2.body.track.loudness === -3
          // ) {
          //   ("red and even less bright: 0,100,74");
          // }

          switch (Math.floor(data2.body.track.loudness)) {
            case -1:
              color3 = 90;
              console.log("color3", color3);
              break;
            case -2:
              color3 = 82;
              console.log("color3", color3);
              break;
            case -3:
              color3 = 74;
              console.log("color3", color3);
              break;
            case -4:
              color4 = 66;
              console.log("color3", color3);
              break;
            case -5:
              color3 = 58;
              console.log("color3", color3);
              break;
            case -6:
              color3 = 50;
              console.log("color3", color3);
              break;
            case -7:
              color3 = 42;
              console.log("color3", color3);
              break;
            case -8:
              color3 = 34;
              console.log("color3", color3);
              break;
            case -9:
              color3 = 26;
              console.log("color3", color3);
              break;
            case -10:
              color3 = 18;
              console.log("color3", color3);

              break;
          }
          let colors = ` "hsl(${color1}, ${color2 + "%"}, ${color3 + "%"}" )`;
          console.log("COLORS is", colors);
        },

        400
      );
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
