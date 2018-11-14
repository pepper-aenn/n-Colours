document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);
$("#how").click(function() {
  $("div").removeClass("explain");
});

$("#close").click(function() {
  $(".test").addClass("explain");
});
