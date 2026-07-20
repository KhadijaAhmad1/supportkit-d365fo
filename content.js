// SupportKit for D365 F&O — Environment Guardian content script
// Injects a coloured strip and label so PROD, UAT and sandbox are
// unmistakable at a glance. All rules are user-defined and stored
// locally via chrome.storage.sync. Nothing is read from the page
// beyond the URL; nothing is transmitted anywhere.

// Respond to popup requests for live page context (form names).
// D365 F&O marks form containers with data-dyn-form-name attributes.
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === "SK_GET_PAGE_CONTEXT") {
    const names = [...document.querySelectorAll("[data-dyn-form-name]")]
      .map(el => el.getAttribute("data-dyn-form-name"))
      .filter(Boolean);
    const unique = [...new Set(names)];
    sendResponse({
      formNames: unique,
      topForm: unique.length ? unique[unique.length - 1] : null,
      title: document.title || null,
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
