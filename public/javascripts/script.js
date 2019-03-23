var http = require("http");
setInterval(function() {
  http.get("http://n-colors.herokuapp.com/");
}, 300000);

document.addEventListener(
  "DOMContentLoaded",
  () => {
    $("#how").click(function() {
      $(".explain").removeClass("explain");
      console.log("trying 1");
      $(".sheer").removeClass("sheer");
      console.log("trying 3");
    });
    console.log("IronGenerator JS imported successfully!");
  },

  false
);

document.addEventListener(
  "DOMContentLoaded",
  () => {
    $("#close").click(function() {
      $("#explainDiv").addClass("explain");
      console.log("trying 2");
      $("#sheer_background").addClass("sheer");
      console.log("trying 4");
    }),
      $('[data-toggle="tooltip"]').tooltip();

    $('[data="tooltip"]').mouseenter(function() {
      setTimeout(() => {
        $(".tooltip").css("top", 50);
      }, 10);
    });
  },
  false
);
