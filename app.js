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

const viewHash = (target) => `#view-${target}`;

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateView(button.dataset.view);
    history.replaceState(null, "", viewHash(button.dataset.view));
  });
});

document.querySelectorAll("[data-view-jump]").forEach((item) => {
  item.addEventListener("click", () => {
    activateView(item.dataset.viewJump);
    history.replaceState(null, "", viewHash(item.dataset.viewJump));
    document.querySelector(".layout")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const rawHash = window.location.hash.slice(1);
const initialView = rawHash.startsWith("view-") ? rawHash.replace("view-", "") : rawHash;
if (initialView && document.querySelector(`[data-view-panel="${initialView}"]`)) {
  activateView(initialView);
  if (rawHash.startsWith("view-")) {
    window.requestAnimationFrame(() => {
      window.scrollTo({ left: 0, top: 0 });
    });
  }
}

const tripDays = {
  "2026-06-22": { label: "6/22 到着日", note: "ホテル導線、水、WSOP会場の位置を確認。" },
  "2026-06-23": { label: "6/23 Daily", note: "13:00開始。パスポート、現金、上着を持つ。" },
  "2026-06-24": { label: "6/24 Tag Team", note: "10:00目安で会場へ。登録、支払い、交代ルールを確認。" },
  "2026-06-25": { label: "6/25 Grand Canyon", note: "04:15起床、05:05 pickup。カード、ID、水、上着。" },
  "2026-06-26": { label: "6/26 回復日", note: "体力優先。お土産、散歩、Daily候補は無理しない。" },
  "2026-06-27": { label: "6/27 Sphere + 空港", note: "荷物預け、スマホチケット、空港集合を最優先。" },
};

const dateInLasVegas = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
};

const daysBetween = (fromDate, toDate) => {
  const [fromYear, fromMonth, fromDay] = fromDate.split("-").map(Number);
  const [toYear, toMonth, toDay] = toDate.split("-").map(Number);
  const from = Date.UTC(fromYear, fromMonth - 1, fromDay);
  const to = Date.UTC(toYear, toMonth - 1, toDay);
  return Math.round((to - from) / 86400000);
};

const tripStatus = document.querySelector("[data-trip-status]");
const timeSummary = document.querySelector("[data-time-summary]");
const lasVegasToday = dateInLasVegas();
const todayTrip = tripDays[lasVegasToday];

document.querySelectorAll("[data-trip-date]").forEach((item) => {
  item.classList.toggle("is-trip-today", item.dataset.tripDate === lasVegasToday);
});

if (tripStatus) {
  const title = tripStatus.querySelector("b");
  const detail = tripStatus.querySelector("small");
  const untilStart = daysBetween(lasVegasToday, "2026-06-22");
  if (todayTrip) {
    title.textContent = `今日: ${todayTrip.label}`;
    detail.textContent = todayTrip.note;
  } else if (untilStart > 0) {
    title.textContent = `出発まであと${untilStart}日`;
    detail.textContent = "Sphere、Tag Team、保険、USD、荷物を出発前チェックで潰す。";
  } else {
    title.textContent = "旅行後メモ";
    detail.textContent = "写真、精算、反省、次回改善を帰国後にまとめる。";
  }
}

const timeFormatter = (timeZone) =>
  new Intl.DateTimeFormat("ja-JP", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const vegasTimeFormatter = timeFormatter("America/Los_Angeles");
const japanTimeFormatter = timeFormatter("Asia/Tokyo");

const updateLocalTimes = () => {
  if (!timeSummary) return;
  const now = new Date();
  timeSummary.textContent = `LV ${vegasTimeFormatter.format(now)} / JP ${japanTimeFormatter.format(now)}`;
};

if (timeSummary) {
  updateLocalTimes();
  window.setInterval(updateLocalTimes, 60000);
}

const heroImage = document.querySelector("[data-hero-image]");
const heroDots = document.querySelectorAll(".hero-dots span");
const heroSlides = [
  "assets/las-vegas-night.jpg",
  "assets/ellis-island-casino.jpg",
  "assets/wsop-poker-table.jpg",
  "assets/horseshoe-entrance.jpg",
  "assets/grand-canyon-south-rim.jpg",
  "assets/fashion-show-mall.jpg",
  "assets/sphere-las-vegas-bright.jpg",
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

const printButton = document.querySelector("[data-print]");

if (printButton) {
  printButton.addEventListener("click", () => {
    window.print();
  });
}

function resetCopyLabel(button, label) {
  window.setTimeout(() => {
    button.textContent = label;
  }, 1400);
}

async function copyGuideUrl(button, url) {
  const defaultLabel = button.textContent;

  try {
    await navigator.clipboard.writeText(url);
    button.textContent = "コピー済";
    resetCopyLabel(button, defaultLabel);
  } catch {
    button.textContent = "URL欄";
    resetCopyLabel(button, defaultLabel);
  }
}

const copyCurrentButton = document.querySelector("[data-copy-current]");
const copyMessageButton = document.querySelector("[data-copy-message]");
const copyBriefingButton = document.querySelector("[data-copy-briefing]");
const copySummaryButton = document.querySelector("[data-copy-summary]");

function guideUrl(path = "") {
  return new URL(path, window.location.href).href;
}

function buildShareMessage() {
  const topUrl = new URL(window.location.href);
  topUrl.hash = "";
  const quickstartUrl = guideUrl("docs/reader.html?doc=friend-quickstart.md");
  const briefingUrl = guideUrl("docs/reader.html?doc=final-briefing.md");
  const summaryUrl = guideUrl("docs/reader.html?doc=share-summary.md");

  return [
    "WSOP 2026ラスベガス旅の公開しおりです。",
    "スマホで見る前提で、日程、予約集合、持ち物、SOS、予算、現地メモをまとめています。",
    "",
    `トップ: ${topUrl.href}`,
    `友人向けクイックスタート: ${quickstartUrl}`,
    `公開用 最終案内書: ${briefingUrl}`,
    `共有用1枚サマリー: ${summaryUrl}`,
    "",
    "予約番号、チケットQR、保険/カード情報はGitLabには載せていません。",
    "必要なものは各自のメール、Wallet、非公開メモ、紙で持つ運用です。",
  ].join("\n");
}

if (copyCurrentButton) {
  copyCurrentButton.addEventListener("click", () => {
    const url = new URL(window.location.href);
    url.hash = "";
    copyGuideUrl(copyCurrentButton, url.href);
  });
}

if (copyMessageButton) {
  copyMessageButton.addEventListener("click", () => {
    copyGuideUrl(copyMessageButton, buildShareMessage());
  });
}

if (copyBriefingButton) {
  copyBriefingButton.addEventListener("click", () => {
    copyGuideUrl(copyBriefingButton, guideUrl("docs/reader.html?doc=final-briefing.md"));
  });
}

if (copySummaryButton) {
  copySummaryButton.addEventListener("click", () => {
    copyGuideUrl(copySummaryButton, guideUrl("docs/reader.html?doc=share-summary.md"));
  });
}

if ("serviceWorker" in navigator && (window.isSecureContext || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      // The guide remains usable without offline caching.
    });
  });
}
