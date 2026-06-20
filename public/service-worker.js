const CACHE_NAME = "wsop-2026-trip-guide-v40";

const CORE_ASSETS = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "offline.html",
  "favicon.ico",
  "assets/app-icon-192.png",
  "assets/app-icon-512.png"
];

const EXTRA_ASSETS = [
  "docs/reader.html",
  "docs/reader.css",
  "docs/reader.js",
  "assets/airplane-cabin.jpg",
  "assets/airplane-carryon.jpg",
  "assets/baggage-claim.jpg",
  "assets/ellis-island-casino.jpg",
  "assets/grand-canyon-south-rim.jpg",
  "assets/horseshoe-entrance.jpg",
  "assets/las-vegas-airport-checkin.jpg",
  "assets/las-vegas-night.jpg",
  "assets/las-vegas-strip-aerial.jpg",
  "assets/passports.jpg",
  "assets/sphere-las-vegas-bright.jpg",
  "assets/us-dollars.jpg",
  "assets/wsop-poker-table.jpg",
  "assets/wsop-vegas-hero.png",
  "assets/generated-poker-felt-texture.png",
  "assets/generated-chip-tray-accent.png",
  "assets/generated-sphere-poker-card.png",
  "assets/generated-grand-canyon-poker-card.png",
  "assets/generated-poker-journey-hero-desktop.png",
  "assets/generated-poker-journey-hero-mobile.png",
  "assets/generated-poker-journey-cover-mobile.png",
  "docs/budget.md",
  "docs/concierge-handoff.md",
  "docs/condition-care-card.md",
  "docs/confirmation-sheet.html",
  "docs/confirmation-sheet.md",
  "docs/confirmed-bookings.md",
  "docs/confirmation-intake-form.md",
  "docs/daily-concierge.md",
  "docs/daily-money-card.md",
  "docs/daily-briefings.md",
  "docs/decision-control.md",
  "docs/decisions.md",
  "docs/departure-arrival.md",
  "docs/departure-readiness.md",
  "docs/final-day-luggage-airport-card.md",
  "docs/final-briefing.md",
  "docs/final-day-sphere.md",
  "docs/final-travel-packet.md",
  "docs/flight-baggage.md",
  "docs/friend-quickstart.md",
  "docs/free-day-plan.md",
  "docs/gitlab-issues.md",
  "docs/gitlab-pages-guide.md",
  "docs/go-no-go-check.md",
  "docs/fun-mission-card.md",
  "docs/grand-canyon-reservation-manual.md",
  "docs/grand-canyon.md",
  "docs/money-logistics.md",
  "docs/onsite-navigation-card.md",
  "docs/options.md",
  "docs/paper-backup-card.md",
  "docs/planning-board.md",
  "docs/pocket-itinerary.md",
  "docs/poker-plan.md",
  "docs/predeparture-countdown.md",
  "docs/private-info-handbook.md",
  "docs/publish-checklist.md",
  "docs/safety-wallet.md",
  "docs/schedule.md",
  "docs/share-message-templates.md",
  "docs/share-summary.md",
  "docs/sources.md",
  "docs/sphere-ticket-purchase-card.md",
  "docs/smartphone-setup.md",
  "docs/sos-quick-card.md",
  "docs/tag-team-registration.md",
  "docs/today-command.md",
  "docs/tourism-and-food.md",
  "docs/travel-support-playbook.md",
  "docs/trip-guide.md",
  "docs/trip-status-dashboard.md",
  "docs/update-map.md"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(CORE_ASSETS);
      await Promise.allSettled(EXTRA_ASSETS.map((asset) => cache.add(asset)));
      await self.skipWaiting();
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

const isNavigationRequest = (request) => request.mode === "navigate";

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, copy);
        });
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(event.request, { ignoreSearch: true });
        if (cached) return cached;
        if (isNavigationRequest(event.request)) {
          return caches.match("offline.html");
        }
        return Response.error();
      })
  );
});
