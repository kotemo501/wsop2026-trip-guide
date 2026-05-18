const navButtons = document.querySelectorAll("[data-view]");
const viewPanels = document.querySelectorAll("[data-view-panel]");

const activateView = (target) => {
  navButtons.forEach((item) => {
    const isActive = item.dataset.view === target;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
  });
  viewPanels.forEach((panel) => {
    const isActive = panel.dataset.viewPanel === target;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
};

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateView(button.dataset.view);
  });
});

document.querySelectorAll("[data-view-jump]").forEach((item) => {
  item.addEventListener("click", () => {
    activateView(item.dataset.viewJump);
    document.querySelector(".layout")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const heroImage = document.querySelector("[data-hero-image]");
const heroDots = document.querySelectorAll(".hero-dots span");
const heroSlides = [
  "assets/las-vegas-night.jpg",
  "assets/wsop-poker-table.jpg",
  "assets/grand-canyon-south-rim.jpg",
  "assets/sphere-las-vegas.jpg",
];
let heroIndex = 0;

if (heroImage && heroDots.length) {
  window.setInterval(() => {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    heroImage.classList.add("is-changing");
    window.setTimeout(() => {
      heroImage.src = heroSlides[heroIndex];
      heroDots.forEach((dot, index) => dot.classList.toggle("is-active", index === heroIndex));
      heroImage.classList.remove("is-changing");
    }, 220);
  }, 5200);
}

const taskInputs = document.querySelectorAll("[data-task]");
const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // The checklist still works for the current page view without persistence.
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage errors in private or restricted browsing contexts.
    }
  },
};

taskInputs.forEach((input) => {
  const key = `wsop2026:${input.dataset.task}`;
  input.checked = storage.get(key) === "done";
  input.addEventListener("change", () => {
    if (input.checked) {
      storage.set(key, "done");
    } else {
      storage.remove(key);
    }
  });
});

const resetButton = document.querySelector("[data-reset]");

if (resetButton) {
  resetButton.addEventListener("click", () => {
    taskInputs.forEach((input) => {
      input.checked = false;
      storage.remove(`wsop2026:${input.dataset.task}`);
    });
  });
}
