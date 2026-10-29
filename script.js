const menu = document.getElementById("site-menu");
const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");

if (menu && menuOpen && menuClose) {
  const openMenu = () => {
    if (menu.open) return;
    menu.showModal();
    menuOpen.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    if (menu.open) menu.close();
  };

  menuOpen.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  menu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
  menu.addEventListener("close", () => {
    menuOpen.setAttribute("aria-expanded", "false");
  });

  if (!("closedBy" in HTMLDialogElement.prototype)) {
    menu.addEventListener("click", (event) => {
      if (event.target !== menu) return;
      const rect = menu.getBoundingClientRect();
      const isDialogContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isDialogContent) closeMenu();
    });
  }

  document.documentElement.classList.add("nav-ready");
}

const navLinks = document.querySelectorAll("[data-nav]");
const sections = ["home", "about", "projects", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const setActiveSection = (id) => {
  navLinks.forEach((link) => {
    if (link.dataset.nav === id) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

setActiveSection("home");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveSection(entry.target.id);
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });

  sections.forEach((section) => sectionObserver.observe(section));

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("js");
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    document.querySelectorAll("[data-reveal]").forEach((element) => {
      revealObserver.observe(element);
    });
  }
}
