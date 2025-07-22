document.addEventListener("DOMContentLoaded", function () {
  var background = document.getElementById("parallax-background");

  window.addEventListener("scroll", function () {
    console.log("Scrolling...");
    var yPos = -window.pageYOffset / 2;
    background.style.transform = "translate3d(0," + yPos + "px, 0)";
  });

  getAllPinboardItems();
  //getAllPinboardItemsDummy();

  // Admin-Check und Add-Button/Formular-Steuerung
  const showAddBtn = document.getElementById('show-add-form');
  const pinboardForm = document.getElementById('pinboard-form');

  if (typeof hasRole === 'function') {
    if (hasRole(null, 'ADMIN')) {
      showAddBtn.style.display = 'block';
    }
  }

  showAddBtn.addEventListener('click', function() {
    if (pinboardForm.style.display === 'none') {
      pinboardForm.style.display = 'block';
      showAddBtn.style.display = 'none';
    }
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

function getAllPinboardItems() {
  var items = httpGet('/pinboard-items/get-all');
  var pinboardContainer = document.getElementById('pinboard-items');

  pinboardContainer.innerHTML = ""; // Lösche vorhandene Boxen

  if (items && Array.isArray(items)) {
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
}

// Create pinboard item
function createPinboardItem(title, text) {
  var data = { title: title, text: text };
  var result = httpPost('/pinboard-items/create', data);
  if (result) {
    getAllPinboardItems(); // Nach erfolgreichem Anlegen neu laden
  } else {
    alert('Fehler beim Erstellen des Eintrags!');
  }
}

// Event Listener für das Formular
var pinboardForm = document.getElementById('pinboard-form');
if (pinboardForm) {
  pinboardForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var title = document.getElementById('pin-title').value;
    var text = document.getElementById('pin-text').value;
    createPinboardItem(title, text);
    pinboardForm.reset();
  });
}
