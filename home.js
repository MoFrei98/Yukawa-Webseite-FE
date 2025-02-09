document.addEventListener("DOMContentLoaded", function () {
  var background = document.getElementById("parallax-background");

  window.addEventListener("scroll", function () {
    console.log("Scrolling...");
    var yPos = -window.pageYOffset / 2;
    background.style.transform = "translate3d(0," + yPos + "px, 0)";
  });

  // getAllPinboardItems();
  getAllPinboardItemsDummy();
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

function getAllPinboardItems() {
  var items = httpGet('/pinboard-items/get-all');
  var pinboardContainer = document.getElementById('pinboard'); // Hole den Container

  pinboardContainer.innerHTML = ""; // Lösche vorhandene Boxen

  if (items && Array.isArray(items)) {
    items.forEach(function(item) {
      var box = document.createElement("div");
      box.classList.add("pinboard-item"); // Füge eine Klasse für das Styling hinzu

      var title = document.createElement("h1");
      title.textContent = item.title;
      box.appendChild(title);

      var text = document.createElement("p");
      text.textContent = item.text;
      box.appendChild(text);

      pinboardContainer.appendChild(box);
    });
  } else {
    console.error("Die Antwort ist kein Array oder ein Fehler ist aufgetreten.");
  }
}

function getAllPinboardItemsDummy() {
  fetch('../dummy-data/pinboard_item_dummy.json').then(response => {
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Datei');
        }
        return response.json();
      }).then(items => {
        var pinboardContainer = document.getElementById('pinboard');

        pinboardContainer.innerHTML = "";

        if (Array.isArray(items)) {
          items.forEach(function(item) {
            var box = document.createElement("div");
            box.classList.add("pinboard-item");

            var title = document.createElement("h1");
            title.textContent = item.title;
            box.appendChild(title);

            var text = document.createElement("p");
            text.textContent = item.text;
            box.appendChild(text);

            pinboardContainer.appendChild(box);
          });
        } else {
          console.error("Die Antwort ist kein Array oder ein Fehler ist aufgetreten.");
        }
      }).catch(error => {
        console.error("Fehler beim Laden der JSON-Datei:", error);
      });
}
