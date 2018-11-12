/* Load the HTTP library */
var http = require("http");
const express = require("express");

const router = express.Router();
/* Create an HTTP server to handle responses */

http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Hello World");
    response.end();
  })
  .listen(8888);

module.exports = router;
