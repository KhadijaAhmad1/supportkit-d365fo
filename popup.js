// SupportKit for D365 F&O — popup logic
// All processing happens locally. Nothing is transmitted anywhere.

let ctx = { url: null, host: null, cmp: null, mi: null, base: null, isD365: false, envRule: null };
let settings = { environments: [], customTables: [], shortcuts: [], bannerEnabled: true };

const $ = (id) => document.getElementById(id);

// ── Init ────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  await loadSettings();
  await readActiveTab();
  renderContext();
  renderTables("");
  renderShortcuts();
  wireEvents();
});

async function loadSettings() {
  const stored = await chrome.storage.sync.get(["environments", "customTables", "shortcuts", "bannerEnabled"]);
  settings.environments = stored.environments || [];
  settings.customTables = stored.customTables || [];
  settings.shortcuts = stored.shortcuts || [];
  settings.bannerEnabled = stored.bannerEnabled !== false;
}

async function readActiveTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url) return;
    const u = new URL(tab.url);
    ctx.url = tab.url;
    ctx.host = u.host;
    ctx.base = u.origin;
    ctx.cmp = u.searchParams.get("cmp");
    ctx.mi = u.searchParams.get("mi");
    ctx.isD365 = u.host.endsWith(".dynamics.com");
    ctx.tabId = tab.id;
    ctx.envRule = matchEnvironment(tab.url);

    // Ask the content script for live page context (form names from DOM)
    if (ctx.isD365 && tab.id != null) {
      try {
        const page = await chrome.tabs.sendMessage(tab.id, { type: "SK_GET_PAGE_CONTEXT" });
        if (page) {
          ctx.formNames = page.formNames || [];
          ctx.topForm = page.topForm || null;
        }
      } catch (e) { /* content script not ready on this tab */ }
    }
  } catch (e) { /* restricted page */ }
}

function matchEnvironment(url) {
  for (const rule of settings.environments) {
    if (rule.match && url.toLowerCase().includes(rule.match.toLowerCase())) return rule;
  }
  return null;
}

// ── Context tab ────────────────────────────────────────────────
function renderContext() {
  if (!ctx.isD365) $("notD365").classList.remove("hidden");

  const envName = ctx.envRule ? ctx.envRule.label
    : (ctx.isD365 ? "Unlabelled — set up in Options" : "—");

  setCopy("ctxEnv", envName, !!ctx.envRule || ctx.isD365);
  setCopy("ctxHost", ctx.host || "—", !!ctx.host);
  setCopy("ctxCmp", ctx.cmp || "not in URL", !!ctx.cmp);
  setCopy("ctxMi", ctx.mi || "not in URL", !!ctx.mi);
  setCopy("ctxForm", ctx.topForm || "not detected", !!ctx.topForm);
  if (ctx.topForm && ctx.formNames && ctx.formNames.length > 1) {
    $("ctxForm").textContent = `${ctx.topForm}  (+${ctx.formNames.length - 1} more)`;
    $("ctxForm").title = "Copy — all forms on page: " + ctx.formNames.join(", ");
  }
  setCopy("ctxUrl", ctx.url || "—", !!ctx.url);

  const badge = $("envBadge");
  if (ctx.envRule) {
    badge.textContent = ctx.envRule.label;
    badge.style.background = ctx.envRule.color || "#8a97a8";
    badge.classList.remove("hidden");
    if (ctx.envRule.production) badge.classList.add("prod");
  }

  if (ctx.cmp) $("dlCmp").value = ctx.cmp;
  updateDeepLinkPreview();
}

function setCopy(id, text, copyable) {
  const el = $(id);
  el.textContent = text;
  if (copyable) el.addEventListener("click", () => copyText(text));
  else el.style.cursor = "default";
}

function buildContextBlock(notes) {
  const lines = [
    "── D365 F&O Support Context ──────────────",
    `Environment : ${ctx.envRule ? ctx.envRule.label : (ctx.host || "unknown")}${ctx.envRule && ctx.envRule.production ? "  ⚠ PRODUCTION" : ""}`,
    `Host        : ${ctx.host || "-"}`,
    `Legal entity: ${ctx.cmp || "-"}`,
    `Menu item   : ${ctx.mi || "-"}`,
    `Form name   : ${ctx.topForm || "-"}`,
    `URL         : ${ctx.url || "-"}`,
    `Captured    : ${new Date().toISOString().replace("T", " ").slice(0, 19)} UTC`,
  ];
  if (notes && notes.trim()) lines.push("", "Notes:", notes.trim());
  lines.push("──────────────────────────────────────────");
  return lines.join("\n");
}

// ── Deep link builder ──────────────────────────────────────────
function buildDeepLink() {
  if (!ctx.base) return "";
  const mi = $("dlMi").value.trim();
  const cmp = $("dlCmp").value.trim();
  if (!mi) return "";
  const p = new URLSearchParams();
  if (cmp) p.set("cmp", cmp);
  p.set("mi", mi);
  return `${ctx.base}/?${p.toString()}`;
}
function updateDeepLinkPreview() { $("dlPreview").textContent = buildDeepLink(); }

// ── Tables tab ─────────────────────────────────────────────────
function allTables() {
  const custom = settings.customTables.map(t => ({ n: t.n, d: t.d || "Custom table", m: "My tables" }));
  return [...custom, ...SK_TABLES];
}

function renderTables(query) {
  const box = $("tblResults");
  const q = query.trim().toLowerCase();
  let list = allTables();
  if (q) {
    list = list.filter(t =>
      t.n.toLowerCase().includes(q) || t.d.toLowerCase().includes(q) || t.m.toLowerCase().includes(q));
  }
  if (!list.length) {
    box.innerHTML = `<p class="no-results">No match. Use the raw box below to open any table by exact name.</p>`;
    return;
  }
  const groups = {};
  for (const t of list.slice(0, 60)) (groups[t.m] ||= []).push(t);

  box.innerHTML = "";
  for (const [mod, items] of Object.entries(groups)) {
    const h = document.createElement("div");
    h.className = "tbl-group"; h.textContent = mod;
    box.appendChild(h);
    for (const t of items) {
      const b = document.createElement("button");
      b.className = "tbl-item";
      b.innerHTML = `<span class="tn">${esc(t.n)}</span><span class="td">${esc(t.d)}</span>`;
      b.addEventListener("click", () => openTableBrowser(t.n));
      box.appendChild(b);
    }
  }
}

function openTableBrowser(tableName) {
  if (!ctx.base) { toast("Open a D365 tab first"); return; }
  const p = new URLSearchParams();
  if (ctx.cmp) p.set("cmp", ctx.cmp);
  p.set("mi", "SysTableBrowser");
  p.set("tableName", tableName);
  chrome.tabs.create({ url: `${ctx.base}/?${p.toString()}` });
}

// ── Data tab ───────────────────────────────────────────────────
function buildODataUrl() {
  if (!ctx.base) return "";
  const entity = $("odEntity").value.trim();
  if (!entity) return "";
  const top = Math.max(1, Math.min(1000, parseInt($("odTop").value || "10", 10)));
  const cross = $("odCross").checked;
  let url = `${ctx.base}/data/${entity}?$top=${top}`;
  if (cross) url += `&cross-company=true`;
  return url;
}

function renderShortcuts() {
  const box = $("shortcutList");
  const builtIn = [
    { label: "Table ID ↔ name lookup", mi: "SysTableBrowser", table: "SysTableIdView", hint: "SysTableIdView" },
    { label: "Batch jobs (raw)", mi: "SysTableBrowser", table: "BatchJob", hint: "BatchJob" },
    { label: "Outgoing email queue (raw)", mi: "SysTableBrowser", table: "SysOutgoingEmailTable", hint: "SysOutgoingEmailTable" },
    { label: "User ↔ role assignments (raw)", mi: "SysTableBrowser", table: "SecurityUserRole", hint: "SecurityUserRole" },
    { label: "Attachments register (raw)", mi: "SysTableBrowser", table: "DocuRef", hint: "DocuRef" },
  ];
  const custom = settings.shortcuts.map(s => ({ label: s.label, mi: s.mi, hint: s.mi }));
  box.innerHTML = "";
  for (const s of [...builtIn, ...custom]) {
    const b = document.createElement("button");
    b.className = "shortcut";
    b.innerHTML = `<span class="sn">${esc(s.label)}</span><span class="sm">${esc(s.hint)}</span>`;
    b.addEventListener("click", () => {
      if (!ctx.base) { toast("Open a D365 tab first"); return; }
      const p = new URLSearchParams();
      if (ctx.cmp) p.set("cmp", ctx.cmp);
      p.set("mi", s.mi);
      if (s.table) p.set("tableName", s.table);
      chrome.tabs.create({ url: `${ctx.base}/?${p.toString()}` });
    });
    box.appendChild(b);
  }
}

// ── Snapshot tab ───────────────────────────────────────────────
async function captureSnapshot() {
  const status = $("snapStatus");
  const block = buildContextBlock($("snapNotes").value);

  try {
    await copyText(block, true);
    $("snapPreview").textContent = block;
    $("snapPreview").classList.remove("hidden");

    if (ctx.isD365 && ctx.tabId != null) {
      const dataUrl = await chrome.tabs.captureVisibleTab(null, { format: "png" });
      const a = document.createElement("a");
      const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
      const envPart = ctx.envRule ? ctx.envRule.label.replace(/\s+/g, "_") : "d365";
      a.href = dataUrl;
      a.download = `supportkit_${envPart}_${stamp}.png`;
      a.click();
      status.textContent = "Context copied to clipboard. Screenshot downloaded. Paste both into your ticket.";
    } else {
      status.textContent = "Context copied to clipboard. Screenshot skipped — not a D365 tab.";
    }
  } catch (e) {
    status.textContent = "Context copied. Screenshot failed: " + e.message;
  }
}

// ── Utilities ──────────────────────────────────────────────────
async function copyText(text, silent) {
  await navigator.clipboard.writeText(text);
  if (!silent) toast("Copied");
}

let toastTimer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add("hidden"), 1200);
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ── Events ─────────────────────────────────────────────────────
function wireEvents() {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      $("tab-" + tab.dataset.tab).classList.add("active");
    });
  });

  $("copyAllContext").addEventListener("click", () => copyText(buildContextBlock()));
  $("dlMi").addEventListener("input", updateDeepLinkPreview);
  $("dlCmp").addEventListener("input", updateDeepLinkPreview);
  $("dlCopy").addEventListener("click", () => {
    const link = buildDeepLink();
    if (link) copyText(link); else toast("Enter a menu item");
  });
  $("dlOpen").addEventListener("click", () => {
    const link = buildDeepLink();
    if (link) chrome.tabs.create({ url: link }); else toast("Enter a menu item");
  });

  $("tblSearch").addEventListener("input", e => renderTables(e.target.value));
  $("tblRawOpen").addEventListener("click", () => {
    const t = $("tblRaw").value.trim();
    if (t) openTableBrowser(t); else toast("Type a table name");
  });
  $("tblRaw").addEventListener("keydown", e => {
    if (e.key === "Enter") $("tblRawOpen").click();
  });

  const odUpdate = () => $("odPreview").textContent = buildODataUrl();
  ["odEntity", "odTop"].forEach(id => $(id).addEventListener("input", odUpdate));
  $("odCross").addEventListener("change", odUpdate);
  $("odOpen").addEventListener("click", () => {
    const url = buildODataUrl();
    if (url) chrome.tabs.create({ url }); else toast("Enter an entity name");
  });

  $("snapCapture").addEventListener("click", captureSnapshot);
  $("openOptions").addEventListener("click", e => { e.preventDefault(); chrome.runtime.openOptionsPage(); });
}
