// =========================
// ROUTER.JS – SPA
// =========================

let pageUrls = {
  about: '/index.html?about',
  contact: '/index.html?contact',
  gallery: '/index.html?gallery'
};

// =========================
// START
// =========================
function OnStartUp() {
  popStateHandler();
}
OnStartUp();

// =========================
// NAVIGATION LISTENERS
// =========================
document.querySelector('#about-link').addEventListener('click', () => {
  let stateObj = { page: 'about' };
  document.title = 'About';
  history.pushState(stateObj, "about", "?about");
  RenderAboutPage();
});

document.querySelector('#contact-link').addEventListener('click', () => {
  let stateObj = { page: 'contact' };
  document.title = 'Contact';
  history.pushState(stateObj, "contact", "?contact");
  RenderContactPage();
});

document.querySelector('#gallery-link').addEventListener('click', () => {
  let stateObj = { page: 'gallery' };
  document.title = 'Gallery';
  history.pushState(stateObj, "gallery", "?gallery");
  renderGallery();
});

// =========================
// DARK MODE TOGGLE
// =========================
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// =========================
// PAGE RENDER FUNCTIONS
// =========================
function RenderAboutPage() {
  document.querySelector('main').innerHTML = `
    <h1 class="title">About Me</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}

function RenderContactPage() {
  document.querySelector('main').innerHTML = `
    <h1 class="title">Contact with me</h1>
    <form id="contact-form">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      
      <label for="message">Message:</label>
      <textarea id="message" name="message" required></textarea>
      
      <button type="submit">Send</button>
    </form>`;

  document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();

    // WALIDACJA
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert("Wypełnij wszystkie pola!");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Podaj poprawny adres email!");
      return;
    }

    alert('Form submitted!');
  });
}

// =========================
// GALLERY PAGE
// =========================
function renderGallery() {
  document.querySelector("main").innerHTML = `
    <h1 class="title">Gallery</h1>
    <div class="gallery" id="gallery"></div>

    <div class="modal" id="modal">
      <span id="close-modal">X</span>
      <img id="modal-img">
    </div>
  `;

  const gallery = document.getElementById("gallery");

  for (let i = 1; i <= 9; i++) {
    const img = document.createElement("img");
    img.dataset.src = `https://picsum.photos/300?${i}`; // obrazy BLOB
    img.loading = "lazy";

    img.onclick = () => {
      document.getElementById("modal").style.display = "flex";
      document.getElementById("modal-img").src = img.src;
    };

    gallery.appendChild(img);
  }

  lazyLoad();
}

// =========================
// LAZY LOADING
// =========================
function lazyLoad() {
  const imgs = document.querySelectorAll("img");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  });

  imgs.forEach(img => observer.observe(img));
}

// =========================
// MODAL CLOSE
// =========================
document.addEventListener("click", e => {
  if (e.target.id === "close-modal" || e.target.id === "modal") {
    document.getElementById("modal").style.display = "none";
  }
});

// =========================
// POP STATE HANDLER
// =========================
function popStateHandler() {
  let loc = window.location.href.toString().split(window.location.host)[1];

  if (loc === pageUrls.contact) { RenderContactPage(); }
  else if (loc === pageUrls.about) { RenderAboutPage(); }
  else if (loc === pageUrls.gallery) { renderGallery(); }
}

// =========================
// LISTENER FOR BACK/FORWARD BUTTONS
// =========================
window.onpopstate = popStateHandler;
