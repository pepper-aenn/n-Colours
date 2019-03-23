const passport = require("passport");
const http = require("http");

require("./serializers");
require("./localStrategy");

setInterval(function() {
  http.get("http://n-colors.herokuapp.com/");
}, 300000);

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
};
