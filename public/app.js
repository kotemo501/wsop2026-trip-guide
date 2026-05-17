const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.id === target));
  });
});

const taskInputs = document.querySelectorAll("[data-task]");

taskInputs.forEach((input) => {
  const key = `wsop2026:${input.dataset.task}`;
  input.checked = localStorage.getItem(key) === "done";
  input.addEventListener("change", () => {
    if (input.checked) {
      localStorage.setItem(key, "done");
    } else {
      localStorage.removeItem(key);
    }
  });
});

const resetButton = document.querySelector("[data-reset]");

if (resetButton) {
  resetButton.addEventListener("click", () => {
    taskInputs.forEach((input) => {
      input.checked = false;
      localStorage.removeItem(`wsop2026:${input.dataset.task}`);
    });
  });
}
