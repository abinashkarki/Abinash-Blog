const links = document.querySelectorAll('a[href^="#"]');
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });
});

const year = document.querySelector("[data-year]");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking a link
  const navItems = navLinks.querySelectorAll("a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("active");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || navToggle.getAttribute("aria-expanded") !== "true") return;
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("active");
    navToggle.focus();
  });
}
