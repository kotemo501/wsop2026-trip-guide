const navButtons = document.querySelectorAll("[data-view]");
const viewPanels = document.querySelectorAll("[data-view-panel]");

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.view;
    navButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    viewPanels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.viewPanel === target));
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
