function renderAbout() {
  document.querySelector("main").innerHTML = `
    <h1 class="title">About</h1>
    <p>To jest strona About.</p>
  `;
}

function renderContact() {
  document.querySelector("main").innerHTML = `
    <h1 class="title">Contact</h1>
    <form>
      <input placeholder="Name" required><br><br>
      <input placeholder="Email" required><br><br>
      <textarea placeholder="Message"></textarea><br><br>
      <button>Send</button>
    </form>
  `;
}

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
    img.dataset.src = `https://picsum.photos/300?${i}`;
    img.loading = "lazy";

    img.onclick = () => {
      document.getElementById("modal").style.display = "flex";
      document.getElementById("modal-img").src = img.src;
    };

    gallery.appendChild(img);
  }

  lazyLoad();
}

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

/* MENU */
document.getElementById("about-link").onclick = renderAbout;
document.getElementById("contact-link").onclick = renderContact;
document.getElementById("gallery-link").onclick = renderGallery;

/* MODAL */
document.addEventListener("click", e => {
  if (e.target.id === "close-modal" || e.target.id === "modal") {
    document.getElementById("modal").style.display = "none";
  }
});

/* DARK MODE */
document.getElementById("theme-toggle").onclick = () => {
  document.body.classList.toggle("dark-mode");
};
