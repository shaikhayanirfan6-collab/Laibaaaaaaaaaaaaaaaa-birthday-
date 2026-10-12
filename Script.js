document.addEventListener("DOMContentLoaded", () => {
  const screens = [...document.querySelectorAll(".screen")];
  let currentScreen = 0;

  // Background stars
  const stars = document.getElementById("stars");

  for (let i = 0; i < 100; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    stars.appendChild(star);
  }

  // Screen navigation
  function showScreen(id) {
    const nextIndex = screens.findIndex(s => s.id === id);
    if (nextIndex === -1) return;

    screens[currentScreen].classList.remove("active");
    currentScreen = nextIndex;
    screens[currentScreen].classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (id === "screen7") {
      makeHearts(12);
    }
  }

  document.querySelectorAll("[data-next]").forEach(button => {
    button.addEventListener("click", () => {
      showScreen(button.dataset.next);
    });
  });

  // Envelope animation
  const envelope = document.getElementById("openEnvelope");
  const envelopeHint = document.getElementById("envelopeHint");
  const envelopeNext = document.getElementById("envelopeNext");
  let envelopeOpened = false;

  envelope.addEventListener("click", () => {
    if (envelopeOpened) return;

    envelopeOpened = true;
    envelope.classList.add("open");
    envelopeHint.textContent = "A little love, just for you ♡";
    envelopeNext.classList.remove("hidden");
    makeHearts(14);
  });

  // Birthday countdown: October 31
  function updateCountdown() {
    const now = new Date();
    let year = now.getFullYear();

    let birthday = new Date(year, 9, 31, 0, 0, 0);

    if (now >= birthday) {
      birthday = new Date(year + 1, 9, 31, 0, 0, 0);
    }

    const diff = birthday.getTime() - now.getTime();

    document.getElementById("days").textContent =
      String(Math.floor(diff / 86400000)).padStart(2, "0");

    document.getElementById("hours").textContent =
      String(Math.floor(diff / 3600000) % 24).padStart(2, "0");

    document.getElementById("minutes").textContent =
      String(Math.floor(diff / 60000) % 60).padStart(2, "0");

    document.getElementById("seconds").textContent =
      String(Math.floor(diff / 1000) % 60).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Floating hearts
  function makeHearts(amount = 15) {
    const symbols = ["♡", "♥", "✦", "💗"];

    for (let i = 0; i < amount; i++) {
      setTimeout(() => {
        const heart = document.createElement("span");
        heart.className = "floating-heart";
        heart.textContent =
          symbols[Math.floor(Math.random() * symbols.length)];

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (14 + Math.random() * 20) + "px";
        heart.style.animationDuration = (3 + Math.random() * 3) + "s";

        document.getElementById("petals").appendChild(heart);

        setTimeout(() => heart.remove(), 6500);
      }, i * 100);
    }
  }

  // Heart button
  document.getElementById("heartBtn").addEventListener("click", () => {
    makeHearts(20);
  });

  // Single photo fullscreen viewer
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const photo = document.querySelector(".photo");
  const photoImage = photo.querySelector("img");

  photo.addEventListener("click", () => {
    if (!photoImage.complete || photoImage.naturalWidth === 0) {
      alert("Yar, images folder mein laiba1.jpg check karo ❤️");
      return;
    }

    lightboxImage.src = photoImage.src;
    lightbox.classList.add("show");
  });

  function closeLightbox() {
    lightbox.classList.remove("show");
    lightboxImage.src = "";
  }

  document.getElementById("closeLightbox")
    .addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });

  // Final celebration
  const celebrateBtn = document.getElementById("celebrateBtn");

  celebrateBtn.addEventListener("click", () => {
    makeHearts(50);
    celebrateBtn.textContent = "Happy Birthday, Jan! ♡";
  });

  // Restart
  document.getElementById("restartBtn").addEventListener("click", () => {
    envelopeOpened = false;
    envelope.classList.remove("open");
    envelopeHint.textContent = "Tap the letter to open";
    envelopeNext.classList.add("hidden");
    celebrateBtn.textContent = "Celebrate ✨";
    showScreen("screen1");
  });

  // Mobile swipe
  let startX = 0;
  let startY = 0;

  document.addEventListener("touchstart", event => {
    startX = event.changedTouches[0].screenX;
    startY = event.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener("touchend", event => {
    if (lightbox.classList.contains("show")) return;

    const dx = event.changedTouches[0].screenX - startX;
    const dy = event.changedTouches[0].screenY - startY;

    if (Math.abs(dx) < 100 || Math.abs(dy) > Math.abs(dx)) return;

    if (dx < 0 && currentScreen < screens.length - 1) {
      showScreen(screens[currentScreen + 1].id);
    } else if (dx > 0 && currentScreen > 0) {
      showScreen(screens[currentScreen - 1].id);
    }
  }, { passive: true });

  // Escape key for photo viewer
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLightbox();
  });
});
