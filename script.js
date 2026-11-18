/* =========================================
   1. MOBILE NAVIGATION MENU
========================================= */
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
    const isOpen = navbar.classList.contains("active");
    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", event => {
    if (!navbar.contains(event.target) && !menuToggle.contains(event.target)) {
      navbar.classList.remove("active");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* =========================================
   2. DARK AND LIGHT MODE
========================================= */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") document.body.classList.add("dark");

function updateThemeButton() {
  if (!themeToggle) return;
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
}
updateThemeButton();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeButton();
  });
}

/* =========================================
   3. ORIGINAL INTERACTIVE 3D CARD
========================================= */
const card = document.getElementById("threeDCard");
const scene = document.getElementById("scene");
const rotateButton = document.getElementById("rotateCard");
let rotation = 0;

if (card && scene) {
  scene.addEventListener("pointermove", event => {
    if (event.pointerType === "touch") return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 25;
    const rotateY = (x - 0.5) * 25;

    card.style.setProperty("--rx", rotateX + "deg");
    card.style.setProperty("--ry", rotateY + "deg");
  });

  scene.addEventListener("pointerleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
}

if (card && rotateButton) {
  rotateButton.addEventListener("click", () => {
    rotation += 180;
    card.style.setProperty("--rz", rotation + "deg");
  });
}

/* =========================================
   4. NEW AUTOMATIC PHOTO SLIDER
========================================= */
const photoSlider = document.getElementById("photoSlider");

if (photoSlider) {
  const slides = [...photoSlider.querySelectorAll(".photo-slide")];
  const dots = [...photoSlider.querySelectorAll(".photo-dot")];
  const previousButton = document.getElementById("photoPrev");
  const nextButton = document.getElementById("photoNext");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let activePhoto = 0;
  let photoTimer = null;

  function showPhoto(index) {
    slides[activePhoto].classList.remove("active");
    if (dots[activePhoto]) dots[activePhoto].classList.remove("active");

    activePhoto = (index + slides.length) % slides.length;

    slides[activePhoto].classList.add("active");
    if (dots[activePhoto]) dots[activePhoto].classList.add("active");
  }

  function stopPhotoSlider() {
    if (photoTimer) {
      clearInterval(photoTimer);
      photoTimer = null;
    }
  }

  function startPhotoSlider() {
    stopPhotoSlider();
    if (slides.length < 2 || reduceMotion.matches) return;
    photoTimer = setInterval(() => showPhoto(activePhoto + 1), 3500);
  }

  function movePhoto(step) {
    showPhoto(activePhoto + step);
    startPhotoSlider();
  }

  if (nextButton) nextButton.addEventListener("click", () => movePhoto(1));
  if (previousButton) previousButton.addEventListener("click", () => movePhoto(-1));

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showPhoto(index);
      startPhotoSlider();
    });
  });

  photoSlider.addEventListener("mouseenter", stopPhotoSlider);
  photoSlider.addEventListener("mouseleave", startPhotoSlider);
  photoSlider.addEventListener("focusin", stopPhotoSlider);
  photoSlider.addEventListener("focusout", startPhotoSlider);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopPhotoSlider();
    else startPhotoSlider();
  });

  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener("change", startPhotoSlider);
  }

  startPhotoSlider();
}

/* =========================================
   5. SCROLL REVEAL ANIMATION
========================================= */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

/* =========================================
   6. AUTOMATIC COPYRIGHT YEAR
========================================= */
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

/* =========================================
   7. SMOOTH SCROLLING
========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(event) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* =========================================
   8. PAGE LOAD ANIMATION
========================================= */
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  console.log("Welcome to MyWebsite!");
});

/* =========================================
   9. REDUCED MOTION SUPPORT FOR 3D CARD
========================================= */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (reducedMotion.matches && card) {
  card.style.setProperty("--rx", "0deg");
  card.style.setProperty("--ry", "0deg");
  card.style.setProperty("--rz", "0deg");
}
