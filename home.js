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
    if (hasRole('ADMIN')) {
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
    items.forEach(function(item, idx) {
      var box = document.createElement("div");
      box.classList.add("pinboard-slideshow-item");
      if(idx === 0) box.classList.add('active');
      box.innerHTML = `<h1>${item.title}</h1><p>${item.text}</p>`;
      pinboardContainer.appendChild(box);
    });
    startPinboardSlideshow();
  } else {
    console.error("Die Antwort ist kein Array oder ein Fehler ist aufgetreten.");
  }
}

function startPinboardSlideshow() {
  var items = document.querySelectorAll('.pinboard-slideshow-item');
  if(items.length < 2) return;
  let current = 0;
  let intervalId;

  function showItem(next) {
    let prev = current;
    items[prev].classList.remove('active');
    items[prev].classList.add('prev');
    current = (next + items.length) % items.length;
    items[current].classList.add('active');
    items[current].classList.remove('prev');
    setTimeout(() => items[prev].classList.remove('prev'), 700);
  }

  function nextItem() {
    showItem(current + 1);
  }

  function prevItem() {
    showItem(current - 1);
  }

  intervalId = setInterval(nextItem, 5000);

  // Scroll-Event für das Pinboard
  const pinboard = document.getElementById('pinboard');
  pinboard.addEventListener('wheel', function(e) {
    e.preventDefault();
    clearInterval(intervalId); // Pause Autoplay beim Scrollen
    if (e.deltaY > 0) {
      nextItem();
    } else if (e.deltaY < 0) {
      prevItem();
    }
    intervalId = setInterval(nextItem, 5000); // Autoplay wieder starten
  }, { passive: false });
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
