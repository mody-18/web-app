// Header solid background on scroll
const header = document.querySelector(".site-header");
const setHeaderState = () => {
  const solid = window.scrollY > 10;
  header.dataset.solid = solid;
};
setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");
toggle.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  document.body.classList.toggle("no-scroll", open);
});
mobileMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  })
);

// Minimal hero slider
const slides = Array.from(document.querySelectorAll(".slide"));
const hero = document.querySelector(".hero");
let index = 0;
function show(i) {
  slides.forEach((s, n) => s.classList.toggle("active", n === i));
  hero.dataset.index = i;
}
function next() {
  index = (index + 1) % slides.length;
  show(index);
}
function prev() {
  index = (index - 1 + slides.length) % slides.length;
  show(index);
}
document.querySelector(".hero-arrow.right").addEventListener("click", next);
document.querySelector(".hero-arrow.left").addEventListener("click", prev);
// setInterval(next, 6000); // optional auto-advance

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});

document.querySelectorAll(".see-more").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.target);
    target.classList.toggle("show-all");
    btn.textContent = target.classList.contains("show-all")
      ? "See less"
      : "See more";
  });
});
