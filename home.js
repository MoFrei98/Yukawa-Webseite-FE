document.addEventListener("DOMContentLoaded", function () {
  var background = document.getElementById("parallax-background");

  window.addEventListener("scroll", function () {
    console.log("Scrolling...");
    var yPos = -window.pageYOffset / 2;
    background.style.transform = "translate3d(0," + yPos + "px, 0)";
  });
});

function goToMultimedia() {
  location.href="multimedia/multimedia.html";
}

function goToShop() {
  location.href="shop/shop.html";
}

function goToTour() {
  location.href="tour/tour.html";
}