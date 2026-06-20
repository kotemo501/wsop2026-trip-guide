const tripDays = {
  "2026-06-22": { label: "6/22 Arrival", note: "Horseshoe導線、水、早寝。18:00-21:00 Welcome Party。", date: "6/22", dow: "Mon", nextDate: "Mon 6/22", nextTitle: "出発・到着", tag: "TRAVEL DAY", visual: "assets/las-vegas-airport-checkin.jpg", visualLabel: "BASE", hand: "ラスベガス到着・移動日", time: "18:00-21:00 Welcome Party", seat: "Horseshoe / Ellis Island", stack: "パスポート、スマホ、カード、水、上着", fold: "無理をしない。寝不足でプレイしない。飲みすぎない。" },
  "2026-06-23": { label: "6/23 Daily", note: "13:00 Daily。会場と登録導線に慣れる。", date: "6/23", dow: "Tue", nextDate: "Tue 6/23", nextTitle: "$250 Daily", tag: "TOURNAMENT", visual: "assets/wsop-poker-table.jpg", visualLabel: "WSOP", hand: "$250 Daily Deepstack", time: "13:00 start", seat: "WSOP会場", stack: "パスポート、現金/カード、上着、水", fold: "Tag Team前夜なので深追いしない。" },
  "2026-06-24": { label: "6/24 Tag Team", note: "10:00目安で会場。12:00開始。", date: "6/24", dow: "Wed", nextDate: "Wed 6/24", nextTitle: "Tag Team", tag: "EVENT #66", visual: "assets/wsop-poker-table.jpg", visualLabel: "TEAM", hand: "Event #66 Tag Team", time: "10:00会場 / 12:00 start", seat: "WSOP会場", stack: "パスポート、支払い手段、スマホ、上着", fold: "登録をぎりぎりにしない。翌朝が早いので夜更かししない。" },
  "2026-06-25": { label: "6/25 Grand Canyon", note: "04:15起床、05:05 pickup。04:50に部屋を出る。", date: "6/25", dow: "Thu", nextDate: "Thu 6/25", tag: "CONFIRMED", visual: "assets/generated-grand-canyon-poker-card.png", visualLabel: "SOUTH RIM", hand: "Grand Canyon South Rim", time: "04:15 Wake / 05:05 Pickup", seat: "Horseshoe Rideshare Lot", stack: "予約票、ID、カード、水、上着、モバイルバッテリー", fold: "04:50を過ぎても部屋にいない。夜の予定を入れない。" },
  "2026-06-26": { label: "6/26 Recovery", note: "疲労優先。買い物、散歩、ポーカーは体力で選ぶ。", date: "6/26", dow: "Fri", nextDate: "Fri 6/26", nextTitle: "回復日", tag: "FLEX", visual: "assets/las-vegas-night.jpg", visualLabel: "FREE", hand: "回復日 / フリー日", time: "固定時刻なし", seat: "近場中心", stack: "水、カード、少額現金、モバイルバッテリー", fold: "Grand Canyon疲れを無視しない。" },
  "2026-06-27": { label: "6/27 Sphere + Airport", note: "荷物回収と空港集合を最優先。", date: "6/27", dow: "Sat", nextDate: "Sat 6/27", nextTitle: "Sphere + Airport", tag: "FINAL DAY", visual: "assets/sphere-las-vegas-bright.jpg", visualLabel: "SPHERE", hand: "Sphere + Airport", time: "14:00 Sphere方針 / 夜 空港", seat: "Sphere / Horseshoe / 空港集合", stack: "スマホチケット、パスポート、カード、充電", fold: "大きいバッグをSphereへ持たない。観光で空港集合を崩さない。" },
};
const dateInLasVegas = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
};
const daysBetween = (fromDate, toDate) => {
  const [fy, fm, fd] = fromDate.split("-").map(Number);
  const [ty, tm, td] = toDate.split("-").map(Number);
  return Math.round((Date.UTC(ty, tm - 1, td) - Date.UTC(fy, fm - 1, fd)) / 86400000);
};
const lasVegasToday = dateInLasVegas();
const today = tripDays[lasVegasToday];
const tripDates = Object.keys(tripDays).sort();
const afterTripAction = { nextDate: "After 6/27", nextTitle: "帰国後メモ", tag: "WRAP UP", visual: "assets/generated-poker-felt-texture.png", visualLabel: "REVIEW", time: "写真・精算・反省", seat: "帰国後", fold: "写真、精算、WSOPと旅程の反省をまとめる。", hand: "Trip Wrap" };
const nextDateKey = tripDates.find((date) => daysBetween(lasVegasToday, date) >= 0);
const nextAction = today || (nextDateKey ? tripDays[nextDateKey] : afterTripAction);
document.querySelectorAll("[data-trip-date]").forEach((item) => item.classList.toggle("is-trip-today", item.dataset.tripDate === lasVegasToday));
const status = document.querySelector("[data-trip-status]");
if (status) {
  const title = status.querySelector("b");
  const detail = status.querySelector("small");
  const untilStart = daysBetween(lasVegasToday, "2026-06-22");
  if (today) { title.textContent = `今日: ${today.label}`; detail.textContent = today.note; }
  else if (untilStart > 0) { title.textContent = `出発まであと${untilStart}日`; detail.textContent = "Sphere、Tag Team、保険、USD、荷物を出発前に確認。"; }
  else { title.textContent = "旅行後メモ"; detail.textContent = "写真、精算、反省を帰国後にまとめる。"; }
}
if (nextAction) {
  const nextCard = document.querySelector("[data-next-action]");
  if (nextCard) {
    nextCard.querySelector("[data-next-title]").innerHTML = (nextAction.nextTitle || nextAction.hand).replace(" / ", "<br>");
    nextCard.querySelector("[data-next-date]").textContent = nextAction.nextDate;
    nextCard.querySelector("[data-next-time]").textContent = nextAction.time;
    nextCard.querySelector("[data-next-seat]").textContent = nextAction.seat;
    nextCard.querySelector("[data-next-rule]").textContent = nextAction.fold;
    nextCard.querySelector("[data-next-tag]").textContent = nextAction.tag || "ON DECK";
    const nextVisual = nextCard.querySelector("[data-next-visual]");
    if (nextVisual && nextAction.visual) nextVisual.src = nextAction.visual;
    const visualLabel = nextCard.querySelector("[data-next-visual-label]");
    if (visualLabel) visualLabel.textContent = nextAction.visualLabel || "BRIEF";
  }
}
if (today) {
  const card = document.querySelector("[data-today-card]");
  if (card) {
    card.querySelector(".chip-date b").textContent = today.date;
    card.querySelector(".chip-date small").textContent = today.dow;
    const values = [today.hand, today.time, today.seat, today.stack];
    card.querySelectorAll(".today-lines b").forEach((node, index) => { node.textContent = values[index]; });
    card.querySelector(".fold-note span").textContent = today.fold;
  }
}
const formatter = (timeZone) => new Intl.DateTimeFormat("ja-JP", { timeZone, hour: "2-digit", minute: "2-digit", hour12: false });
const vegas = formatter("America/Los_Angeles");
const japan = formatter("Asia/Tokyo");
const timeSummary = document.querySelector("[data-time-summary]");
const updateTime = () => { if (timeSummary) timeSummary.textContent = `LV ${vegas.format(new Date())} / JP ${japan.format(new Date())}`; };
updateTime();
window.setInterval(updateTime, 60000);
document.querySelector("[data-print]")?.addEventListener("click", () => window.print());
const sections = ["today", "itinerary", "bookings", "sos"].map((id) => document.getElementById(id)).filter(Boolean);
const dockLinks = document.querySelectorAll(".mobile-dock a");
const setActiveDock = () => {
  const current = sections.reduce((best, section) => Math.abs(section.getBoundingClientRect().top - 120) < Math.abs(best.getBoundingClientRect().top - 120) ? section : best, sections[0]);
  dockLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`));
};
if (sections.length) { setActiveDock(); window.addEventListener("scroll", setActiveDock, { passive: true }); }


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      // The guide still works online if service worker registration is unavailable.
    });
  });
}
