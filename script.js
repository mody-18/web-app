// Run after DOM is ready (extra safety)
document.addEventListener("DOMContentLoaded", () => {
  // Header solid background on scroll
  const header = document.querySelector(".site-header");
  const setHeaderState = () => {
    if (!header) return;
    const solid = window.scrollY > 10;
    header.dataset.solid = solid;
  };
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  // Mobile nav toggle
  // const toggle = document.querySelector(".nav-toggle");
  // const mobileMenu = document.getElementById("mobile-menu");
  // if (toggle && mobileMenu) {
  //   toggle.addEventListener("click", () => {
  //     const open = mobileMenu.classList.toggle("open");
  //     toggle.setAttribute("aria-expanded", open);
  //     document.body.classList.toggle("no-scroll", open);
  //   });
  //   mobileMenu.querySelectorAll("a").forEach((a) =>
  //     a.addEventListener("click", () => {
  //       mobileMenu.classList.remove("open");
  //       toggle.setAttribute("aria-expanded", "false");
  //       document.body.classList.remove("no-scroll");
  //     })
  //   );
  // }

  // Mobile nav + overlay
  const toggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (toggle && mobileMenu) {
    // create overlay once
    const overlay = document.createElement("div");
    overlay.className = "menu-overlay";
    document.body.appendChild(overlay);

    const openMenu = () => {
      mobileMenu.classList.add("open");
      overlay.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("no-scroll");
    };
    const closeMenu = () => {
      mobileMenu.classList.remove("open");
      overlay.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    };

    toggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      overlay.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("no-scroll", isOpen);
    });

    // close on any menu link tap
    mobileMenu
      .querySelectorAll("a")
      .forEach((a) => a.addEventListener("click", closeMenu));

    // close when tapping outside (the overlay)
    overlay.addEventListener("click", closeMenu);

    // close with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  // Minimal hero slider
  const slides = Array.from(document.querySelectorAll(".slide"));
  const hero = document.querySelector(".hero");
  let index = 0;
  function show(i) {
    slides.forEach((s, n) => s.classList.toggle("active", n === i));
    if (hero) hero.dataset.index = i;
  }
  function next() {
    if (!slides.length) return;
    index = (index + 1) % slides.length;
    show(index);
  }
  function prev() {
    if (!slides.length) return;
    index = (index - 1 + slides.length) % slides.length;
    show(index);
  }

  // Only attach arrow handlers if arrows exist
  const rightArrow = document.querySelector(".hero-arrow.right");
  if (rightArrow) rightArrow.addEventListener("click", next);
  const leftArrow = document.querySelector(".hero-arrow.left");
  if (leftArrow) leftArrow.addEventListener("click", prev);

  // Optional keyboard nav only if we have multiple slides
  if (slides.length > 1) {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });
    // Auto-advance if you want:
    // setInterval(next, 6000);
  }

  // See more toggles (guard for missing targets)
  document.querySelectorAll(".see-more").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      target.classList.toggle("show-all");
      btn.textContent = target.classList.contains("show-all")
        ? "See less"
        : "See more";
    });
  });

  // --- Multilingual testimonial toggle ---
  document.querySelectorAll(".testimonial").forEach((card) => {
    const btn = card.querySelector(".translate-btn");
    const span = card.querySelector(".testimonial-text span");
    if (!btn || !span) return;

    const lang = card.dataset.lang || "auto";
    const originalHTML = (
      card.dataset.originalHtml ||
      card.dataset.original ||
      span.innerHTML
    ).replace(/\n/g, "<br />");

    const translatedHTML = (
      card.dataset.translationHtml ||
      card.dataset.translation ||
      ""
    ).replace(/\n/g, "<br />");

    let showingOriginal = true;

    btn.addEventListener("click", () => {
      if (showingOriginal && translatedHTML) {
        span.innerHTML = translatedHTML;
        span.removeAttribute("lang");
        btn.textContent = "Show original";
        showingOriginal = false;
      } else {
        span.innerHTML = originalHTML;
        span.setAttribute("lang", lang);
        btn.textContent = "Translate";
        showingOriginal = true;
      }
    });
  });
});
