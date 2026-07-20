// SupportKit for D365 F&O — Environment Guardian content script
// Injects a coloured strip and label so PROD, UAT and sandbox are
// unmistakable at a glance. All rules are user-defined and stored
// locally via chrome.storage.sync. Nothing is read from the page
// beyond the URL; nothing is transmitted anywhere.

// ── Session trail (per-tab navigation history) ─────────────────
// Records the sequence of pages visited in this tab. Stored in
// sessionStorage so it clears when the tab closes and never
// crosses tab boundaries. Uses URL polling (every 1.5s) rather
// than history-method hooking so it reliably catches every real
// navigation regardless of how D365 triggers it.
const SK_TRAIL_KEY = "sk_session_trail";
const SK_TRAIL_MAX = 10;
let skLastUrl = "";

function skReadTrail() {
  try { return JSON.parse(sessionStorage.getItem(SK_TRAIL_KEY) || "[]"); }
  catch { return []; }
}

function skTopFormName() {
  const nodes = document.querySelectorAll("[data-dyn-form-name]");
  const names = [...nodes].map(n => n.getAttribute("data-dyn-form-name")).filter(Boolean);
  return names.length ? names[names.length - 1] : null;
}

function skCheckAndRecord() {
  try {
    if (!location.host.endsWith(".dynamics.com")) return;
    if (location.href === skLastUrl) return;   // no change
    skLastUrl = location.href;

    const url = new URL(location.href);
    const mi = url.searchParams.get("mi") || null;
    const cmp = url.searchParams.get("cmp") || null;
    const form = skTopFormName();

    // Skip if there's genuinely nothing to record (before D365 has loaded any form)
    if (!mi && !form) return;

    const trail = skReadTrail();
    const last = trail[trail.length - 1];
    if (last && last.mi === mi && last.cmp === cmp && last.form === form) return;

    const step = { t: Date.now(), mi, cmp, form, title: (document.title || "").slice(0, 80) };
    trail.push(step);
    while (trail.length > SK_TRAIL_MAX) trail.shift();
    sessionStorage.setItem(SK_TRAIL_KEY, JSON.stringify(trail));
    console.log("[SupportKit] trail step recorded:", step);
  } catch (e) { console.warn("[SupportKit] trail error:", e); }
}

// Poll every 1.5s — cheap, robust, catches every navigation regardless
// of how D365 triggers it. Also record on initial load once DOM is ready.
setInterval(skCheckAndRecord, 1500);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => setTimeout(skCheckAndRecord, 500));
} else {
  setTimeout(skCheckAndRecord, 500);
}

// Respond to popup requests for live page context (form names + trail).
// D365 F&O marks form containers with data-dyn-form-name attributes.
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === "SK_GET_PAGE_CONTEXT") {
    // Force a fresh record before responding so the current page is
    // always in the trail when the popup opens
    skCheckAndRecord();
    const names = [...document.querySelectorAll("[data-dyn-form-name]")]
      .map(el => el.getAttribute("data-dyn-form-name"))
      .filter(Boolean);
    const unique = [...new Set(names)];
    sendResponse({
      formNames: unique,
      topForm: unique.length ? unique[unique.length - 1] : null,
      title: document.title || null,
      trail: skReadTrail(),
    });
  }
  return true;
});

(async function () {
  const stored = await chrome.storage.sync.get(["environments", "bannerEnabled"]);
  if (stored.bannerEnabled === false) return;
  const rules = stored.environments || [];
  if (!rules.length) return;

  const url = location.href.toLowerCase();
  const rule = rules.find(r => r.match && url.includes(r.match.toLowerCase()));
  if (!rule) return;

  const color = rule.color || "#8a97a8";
  const isProd = !!rule.production;

  // Top strip
  const strip = document.createElement("div");
  strip.id = "sk-env-strip";
  strip.style.cssText = [
    "position:fixed", "top:0", "left:0", "right:0",
    `height:${isProd ? 4 : 3}px`,
    `background:${color}`,
    "z-index:2147483647", "pointer-events:none",
  ].join(";");

  // Corner badge
  const badge = document.createElement("div");
  badge.id = "sk-env-badge";
  badge.textContent = isProd ? `\u26A0 ${rule.label}` : rule.label;
  badge.style.cssText = [
    "position:fixed", "bottom:10px", "right:10px",
    `background:${color}`, "color:#0d1117",
    "font:600 10px/1 ui-monospace,Consolas,monospace",
    "letter-spacing:.5px", "text-transform:uppercase",
    "padding:5px 9px", "border-radius:3px",
    "z-index:2147483647", "pointer-events:none",
    "box-shadow:0 1px 6px rgba(0,0,0,.35)",
    "opacity:.92",
  ].join(";");

  const attach = () => {
    if (!document.getElementById("sk-env-strip")) document.documentElement.appendChild(strip);
    if (!document.getElementById("sk-env-badge")) document.documentElement.appendChild(badge);
  };
  attach();

  // D365 is a SPA — re-attach if the DOM is rebuilt
  new MutationObserver(attach).observe(document.documentElement, { childList: true });
})();
