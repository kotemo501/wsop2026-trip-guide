const params = new URLSearchParams(window.location.search);
const docName = params.get("doc") || "pocket-itinerary.md";
const content = document.querySelector("[data-reader-content]");
const label = document.querySelector("[data-doc-label]");
const copyButton = document.querySelector("[data-copy-link]");
const printButton = document.querySelector("[data-print-doc]");
const toc = document.querySelector("[data-reader-toc]");
const related = document.querySelector("[data-reader-related]");
const safeDocPattern = /^[a-z0-9-]+\.md$/i;

const relatedDocs = {
  "today-command.md": ["pocket-itinerary.md", "daily-concierge.md", "sos-quick-card.md", "condition-care-card.md"],
  "sos-quick-card.md": ["travel-support-playbook.md", "private-info-handbook.md", "safety-wallet.md", "today-command.md"],
  "grand-canyon.md": ["confirmed-bookings.md", "onsite-navigation-card.md", "daily-briefings.md", "paper-backup-card.md"],
  "confirmed-bookings.md": ["grand-canyon.md", "pocket-itinerary.md", "private-info-handbook.md", "travel-support-playbook.md"],
  "sphere-ticket-purchase-card.md": ["final-day-sphere.md", "final-day-luggage-airport-card.md", "confirmation-intake-form.md", "update-map.md"],
  "final-day-sphere.md": ["sphere-ticket-purchase-card.md", "final-day-luggage-airport-card.md", "pocket-itinerary.md", "sos-quick-card.md"],
  "final-day-luggage-airport-card.md": ["final-day-sphere.md", "onsite-navigation-card.md", "paper-backup-card.md", "departure-readiness.md"],
  "tag-team-registration.md": ["poker-plan.md", "daily-briefings.md", "today-command.md", "decision-control.md"],
  "pocket-itinerary.md": ["today-command.md", "daily-concierge.md", "confirmed-bookings.md", "sos-quick-card.md"],
  "daily-concierge.md": ["today-command.md", "pocket-itinerary.md", "condition-care-card.md", "daily-money-card.md"],
  "fun-mission-card.md": ["daily-concierge.md", "free-day-plan.md", "tourism-and-food.md", "condition-care-card.md"],
  "tourism-and-food.md": ["fun-mission-card.md", "free-day-plan.md", "daily-money-card.md", "condition-care-card.md"],
  "go-no-go-check.md": ["departure-readiness.md", "final-travel-packet.md", "private-info-handbook.md", "confirmation-intake-form.md"],
  "trip-status-dashboard.md": ["concierge-handoff.md", "decision-control.md", "go-no-go-check.md", "sphere-ticket-purchase-card.md"],
  "confirmation-intake-form.md": ["update-map.md", "publish-checklist.md", "trip-status-dashboard.md", "private-info-handbook.md"],
  "private-info-handbook.md": ["publish-checklist.md", "safety-wallet.md", "final-travel-packet.md", "confirmation-intake-form.md"],
  "share-summary.md": ["friend-quickstart.md", "final-briefing.md", "today-command.md", "sos-quick-card.md"],
  "friend-quickstart.md": ["share-summary.md", "final-briefing.md", "smartphone-setup.md", "private-info-handbook.md"],
  "final-briefing.md": ["concierge-handoff.md", "share-summary.md", "trip-status-dashboard.md", "go-no-go-check.md"],
  "concierge-handoff.md": ["final-briefing.md", "trip-status-dashboard.md", "daily-concierge.md", "sos-quick-card.md"],
  "smartphone-setup.md": ["friend-quickstart.md", "pocket-itinerary.md", "sos-quick-card.md", "private-info-handbook.md"],
};

const defaultRelatedDocs = ["today-command.md", "pocket-itinerary.md", "sos-quick-card.md", "trip-status-dashboard.md"];

const docTitles = {
  "budget.md": "予算・概算",
  "condition-care-card.md": "体力・休憩カード",
  "concierge-handoff.md": "コンシェルジュ台帳",
  "confirmation-intake-form.md": "確定情報フォーム",
  "confirmation-sheet.md": "確認シート",
  "confirmed-bookings.md": "予約済み一覧",
  "daily-briefings.md": "毎朝ブリーフィング",
  "daily-concierge.md": "日別コンシェルジュ",
  "daily-money-card.md": "毎朝マネーカード",
  "decision-control.md": "判断メモ",
  "departure-arrival.md": "出発・到着導線",
  "departure-readiness.md": "出発前最終チェック",
  "final-briefing.md": "公開用 最終案内",
  "final-day-luggage-airport-card.md": "最終日 荷物・空港",
  "final-day-sphere.md": "Sphere + 最終日",
  "final-travel-packet.md": "最終トラベルパケット",
  "flight-baggage.md": "飛行機・荷物FAQ",
  "free-day-plan.md": "フリー日プラン",
  "friend-quickstart.md": "友人向け最初の10分",
  "fun-mission-card.md": "旅のミッション",
  "gitlab-issues.md": "Issueたたき台",
  "gitlab-pages-guide.md": "GitLab Pages公開ガイド",
  "go-no-go-check.md": "GO/NO-GO判定",
  "grand-canyon.md": "Grand Canyon詳細",
  "grand-canyon-reservation-manual.md": "Grand Canyon予約手順",
  "money-logistics.md": "現金・カード運用",
  "onsite-navigation-card.md": "現地移動カード",
  "options.md": "調査メモ",
  "paper-backup-card.md": "紙の控えカード",
  "pocket-itinerary.md": "ポケット旅程表",
  "poker-plan.md": "ポーカー計画",
  "predeparture-countdown.md": "出発前カウントダウン",
  "private-info-handbook.md": "非公開情報の持ち方",
  "publish-checklist.md": "公開前チェック",
  "safety-wallet.md": "財布・カード安全",
  "schedule.md": "日別スケジュール",
  "share-message-templates.md": "共有メッセージ集",
  "share-summary.md": "共有用1枚サマリー",
  "smartphone-setup.md": "スマホセットアップ",
  "sos-quick-card.md": "60秒SOSカード",
  "sources.md": "参照元",
  "sphere-ticket-purchase-card.md": "Sphere購入カード",
  "tag-team-registration.md": "Tag Team登録",
  "today-command.md": "今日の司令室",
  "tourism-and-food.md": "観光・食事方針",
  "travel-support-playbook.md": "困った時の手順",
  "trip-status-dashboard.md": "旅の現在地",
  "update-map.md": "更新マップ",
};

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const resolveDocLink = (href) => {
  if (/^(https?:|mailto:|tel:)/i.test(href)) {
    return href;
  }
  if (href.endsWith(".md") || href.includes(".md#")) {
    const [file, hash = ""] = href.split("#");
    const target = file.split("/").pop();
    return `reader.html?doc=${encodeURIComponent(target)}${hash ? `#${hash}` : ""}`;
  }
  return href;
};

const inlineMarkdown = (value) => {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => {
    const safeHref = escapeHtml(resolveDocLink(href.trim()));
    const external = /^(https?:|mailto:|tel:)/i.test(href.trim());
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${safeHref}"${attrs}>${inlineMarkdown(text)}</a>`;
  });
  return html;
};

const isTableDivider = (line) => /^\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
const isTableRow = (line) => line.trim().startsWith("|") && line.includes("|");

const tableCells = (line) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => inlineMarkdown(cell.trim()));

const renderTable = (lines) => {
  const head = tableCells(lines[0]);
  const rows = lines.slice(2).map(tableCells);
  const thead = `<thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${rows
    .map(
      (row) =>
        `<tr>${row
          .map((cell, index) => `<td data-label="${escapeHtml(head[index] || "")}">${cell}</td>`)
          .join("")}</tr>`,
    )
    .join("")}</tbody>`;
  return `<div class="table-wrap"><table>${thead}${tbody}</table></div>`;
};

const slugCounts = new Map();

const slugify = (value) => {
  const base = value
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[^;]+;/g, "")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "") || "section";
  const count = slugCounts.get(base) || 0;
  slugCounts.set(base, count + 1);
  return count ? `${base}-${count + 1}` : base;
};

const listItemHtml = (item) => {
  const task = /^\[([ xX])\]\s+(.+)$/.exec(item);
  if (!task) {
    return `<li>${inlineMarkdown(item)}</li>`;
  }
  const checked = task[1].toLowerCase() === "x" ? " checked" : "";
  return `<li class="is-task"><input type="checkbox" disabled${checked}><span>${inlineMarkdown(task[2])}</span></li>`;
};

const flushParagraph = (buffer, output) => {
  if (!buffer.length) return;
  output.push(`<p>${inlineMarkdown(buffer.join(" "))}</p>`);
  buffer.length = 0;
};

const flushList = (state, output) => {
  if (!state.items.length) return;
  output.push(`<${state.type}>${state.items.map(listItemHtml).join("")}</${state.type}>`);
  state.items = [];
  state.type = null;
};

const markdownToHtml = (markdown) => {
  slugCounts.clear();
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const output = [];
  const paragraph = [];
  const list = { type: null, items: [] };
  let index = 0;
  let codeBlock = null;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      flushParagraph(paragraph, output);
      flushList(list, output);
      if (codeBlock) {
        output.push(`<pre><code>${escapeHtml(codeBlock.join("\n"))}</code></pre>`);
        codeBlock = null;
      } else {
        codeBlock = [];
      }
      index += 1;
      continue;
    }

    if (codeBlock) {
      codeBlock.push(line);
      index += 1;
      continue;
    }

    if (!trimmed) {
      flushParagraph(paragraph, output);
      flushList(list, output);
      index += 1;
      continue;
    }

    if (isTableRow(line) && lines[index + 1] && isTableDivider(lines[index + 1])) {
      flushParagraph(paragraph, output);
      flushList(list, output);
      const tableLines = [line, lines[index + 1]];
      index += 2;
      while (index < lines.length && isTableRow(lines[index])) {
        tableLines.push(lines[index]);
        index += 1;
      }
      output.push(renderTable(tableLines));
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed);
    if (heading) {
      flushParagraph(paragraph, output);
      flushList(list, output);
      const level = heading[1].length;
      const headingHtml = inlineMarkdown(heading[2]);
      const id = slugify(heading[2]);
      output.push(`<h${level} id="${id}">${headingHtml}</h${level}>`);
      index += 1;
      continue;
    }

    const unordered = /^[-*]\s+(.+)$/.exec(trimmed);
    const ordered = /^\d+\.\s+(.+)$/.exec(trimmed);
    if (unordered || ordered) {
      flushParagraph(paragraph, output);
      const type = unordered ? "ul" : "ol";
      if (list.type && list.type !== type) {
        flushList(list, output);
      }
      list.type = type;
      list.items.push((unordered || ordered)[1]);
      index += 1;
      continue;
    }

    flushList(list, output);
    paragraph.push(trimmed);
    index += 1;
  }

  flushParagraph(paragraph, output);
  flushList(list, output);
  if (codeBlock) {
    output.push(`<pre><code>${escapeHtml(codeBlock.join("\n"))}</code></pre>`);
  }
  return output.join("\n");
};

const renderToc = () => {
  if (!toc) return;
  const headings = [...content.querySelectorAll("h2")].slice(0, 12);
  if (!headings.length) {
    toc.hidden = true;
    toc.innerHTML = "";
    return;
  }
  toc.innerHTML = headings.map((heading) => `<a href="#${heading.id}">${escapeHtml(heading.textContent)}</a>`).join("");
  toc.hidden = false;
};

const renderRelated = () => {
  if (!related) return;
  const docs = relatedDocs[docName] || defaultRelatedDocs.filter((item) => item !== docName);
  if (!docs.length) {
    related.hidden = true;
    related.innerHTML = "";
    return;
  }
  related.innerHTML = [
    "<span>Next</span>",
    "<h2>次に開く</h2>",
    '<div class="reader-related-grid">',
    ...docs.map((item) => `<a href="reader.html?doc=${encodeURIComponent(item)}"><b>${escapeHtml(docTitles[item] || item.replace(".md", ""))}</b><small>次に確認する</small></a>`),
    "</div>",
  ].join("");
  related.hidden = false;
};

const scrollToHashTarget = () => {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;
  window.requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  });
};

const showError = (message) => {
  content.innerHTML = `<div class="reader-error"><h1>資料を開けません</h1><p>${escapeHtml(message)}</p></div>`;
};

const loadDoc = async () => {
  if (!safeDocPattern.test(docName)) {
    showError("指定された資料名が公開用の形式ではありません。");
    return;
  }

  try {
    const response = await fetch(docName, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const markdown = await response.text();
    content.innerHTML = markdownToHtml(markdown);
    const title = content.querySelector("h1")?.textContent || docName;
    document.title = `${title} | WSOP 2026 Trip Guide`;
    label.textContent = docName;
    renderToc();
    renderRelated();
    scrollToHashTarget();
  } catch (error) {
    showError(`資料 ${docName} の読み込みに失敗しました。${error.message}`);
  }
};

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copyButton.textContent = "コピー済";
    window.setTimeout(() => {
      copyButton.textContent = "リンク";
    }, 1400);
  } catch {
    copyButton.textContent = "URL欄";
  }
});

printButton?.addEventListener("click", () => {
  window.print();
});

loadDoc();
