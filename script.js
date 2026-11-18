
/* =========================================
   1. MOBILE NAVIGATION MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

  // OPEN AND CLOSE MENU

  menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("active");

    const isOpen = navbar.classList.contains("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute("aria-expanded", isOpen);

  });


  // CLOSE MENU AFTER CLICKING A LINK

  document.querySelectorAll("#navbar a").forEach(link => {

    link.addEventListener("click", () => {

      navbar.classList.remove("active");

      menuToggle.textContent = "☰";

      menuToggle.setAttribute("aria-expanded", "false");

    });

  });


  // CLOSE MENU WHEN CLICKING OUTSIDE

  document.addEventListener("click", (event) => {

    if (
      !navbar.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {

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


// LOAD SAVED THEME

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

  document.body.classList.add("dark");

}


// UPDATE THEME BUTTON

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


// TOGGLE THEME

if (themeToggle) {

  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem(
      "theme",
      isDark ? "dark" : "light"
    );

    updateThemeButton();

  });

}


/* =========================================
   3. INTERACTIVE 3D CARD
========================================= */

const card = document.getElementById("threeDCard");

const scene = document.getElementById("scene");

const rotateButton = document.getElementById("rotateCard");

let rotation = 0;


// MOUSE MOVEMENT EFFECT

if (card && scene) {

  scene.addEventListener("pointermove", (event) => {

    // Disable mouse tilt for touchscreens

    if (event.pointerType === "touch") return;

    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;

    const y = (event.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * 25;

    const rotateY = (x - 0.5) * 25;

    card.style.setProperty(
      "--rx",
      rotateX + "deg"
    );

    card.style.setProperty(
      "--ry",
      rotateY + "deg"
    );

  });


  // RESET CARD WHEN MOUSE LEAVES

  scene.addEventListener("pointerleave", () => {

    card.style.setProperty("--rx", "0deg");

    card.style.setProperty("--ry", "0deg");

  });

}


// CLICK TO ROTATE CARD

if (card && rotateButton) {

  rotateButton.addEventListener("click", () => {

    rotation += 180;

    card.style.setProperty(
      "--rz",
      rotation + "deg"
    );

  });

}


/* =========================================
   4. SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(

    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.15
    }

  );


  revealElements.forEach(element => {

    observer.observe(element);

  });

} else {

  // FALLBACK FOR OLDER BROWSERS

  revealElements.forEach(element => {

    element.classList.add("visible");

  });

}


/* =========================================
   5. AUTOMATIC COPYRIGHT YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {

  yearElement.textContent = new Date().getFullYear();

}


/* =========================================
   6. SMOOTH SCROLLING
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(event) {

    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});


/* =========================================
   7. PAGE LOAD ANIMATION
========================================= */

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

  console.log("Welcome to MyWebsite!");

});


/* =========================================
   8. PREVENT 3D EFFECT ON REDUCED MOTION
========================================= */

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (reducedMotion.matches && card) {

  card.style.setProperty("--rx", "0deg");

  card.style.setProperty("--ry", "0deg");

  card.style.setProperty("--rz", "0deg");

}
