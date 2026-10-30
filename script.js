const addBackdropClose = (dialog) => {
  if ("closedBy" in HTMLDialogElement.prototype) return;
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const isDialogContent = (
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    );
    if (!isDialogContent) dialog.close();
  });
};

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
  addBackdropClose(menu);
  document.documentElement.classList.add("nav-ready");
}

const imageDialog = document.getElementById("image-dialog");
const imageDialogImage = document.getElementById("image-dialog-image");
const imageDialogTitle = document.getElementById("image-dialog-title");
const imageDialogOriginal = document.getElementById("image-dialog-original");
const imageDialogClose = document.getElementById("image-dialog-close");

if (imageDialog && imageDialogImage && imageDialogTitle && imageDialogOriginal && imageDialogClose) {
  document.querySelectorAll("[data-lightbox]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const source = link.getAttribute("href");
      if (!source || imageDialog.open) return;
      event.preventDefault();
      imageDialogImage.src = source;
      imageDialogImage.alt = link.dataset.alt || "";
      imageDialogTitle.textContent = link.dataset.title || "图片预览";
      imageDialogOriginal.href = source;
      imageDialog.showModal();
    });
  });

  imageDialogClose.addEventListener("click", () => imageDialog.close());
  imageDialog.addEventListener("close", () => {
    imageDialogImage.removeAttribute("src");
    imageDialogImage.alt = "";
  });
  addBackdropClose(imageDialog);
}

const navLinks = document.querySelectorAll("[data-nav]");
const sections = ["home", "about", "projects", "architecture", "demos", "honors", "copyright", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navSectionAliases = { demos: "projects", copyright: "honors" };

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
      if (entry.isIntersecting) {
        setActiveSection(navSectionAliases[entry.target.id] || entry.target.id);
      }
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

const supportsLazyMedia = Object.hasOwn(HTMLMediaElement.prototype, "loading");

if (!supportsLazyMedia && "IntersectionObserver" in window) {
  const lazyVideos = document.querySelectorAll('video[loading="lazy"]');
  const mediaObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const video = entry.target;
      if (video.dataset.poster) {
        video.poster = video.dataset.poster;
        delete video.dataset.poster;
      }
      video.querySelectorAll("source[data-src]").forEach((source) => {
        source.src = source.dataset.src;
        delete source.dataset.src;
      });
      video.load();
      observer.unobserve(video);
    });
  }, { rootMargin: "300px 0px" });

  lazyVideos.forEach((video) => {
    if (video.hasAttribute("poster")) {
      video.dataset.poster = video.getAttribute("poster");
      video.removeAttribute("poster");
    }
    video.preload = "none";
    video.querySelectorAll("source[src]").forEach((source) => {
      source.dataset.src = source.getAttribute("src");
      source.removeAttribute("src");
    });
    mediaObserver.observe(video);
  });
}
