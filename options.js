// SupportKit for D365 F&O — options logic

const $ = (id) => document.getElementById(id);
const tbody = (id) => $(id).querySelector("tbody");

document.addEventListener("DOMContentLoaded", async () => {
  const s = await chrome.storage.sync.get(["environments", "customTables", "shortcuts", "bannerEnabled"]);
  (s.environments || defaultEnvs()).forEach(addEnvRow);
  (s.customTables || []).forEach(addTblRow);
  (s.shortcuts || []).forEach(addScRow);
  $("bannerEnabled").checked = s.bannerEnabled !== false;

  $("addEnv").addEventListener("click", () => addEnvRow({ match: "", label: "", color: "#3ddc97", production: false }));
  $("addTbl").addEventListener("click", () => addTblRow({ n: "", d: "" }));
  $("addSc").addEventListener("click", () => addScRow({ label: "", mi: "" }));
  $("save").addEventListener("click", saveAll);
});

function defaultEnvs() {
  return [
    { match: "-prod", label: "PRODUCTION", color: "#ff5d5d", production: true },
    { match: "-uat", label: "UAT", color: "#ffb84d", production: false },
    { match: "sandbox", label: "SANDBOX", color: "#3ddc97", production: false },
  ];
}

function mkInput(value, placeholder) {
  const i = document.createElement("input");
  i.type = "text"; i.value = value || ""; i.placeholder = placeholder || "";
  return i;
}
function mkDel(tr) {
  const b = document.createElement("button");
  b.className = "del"; b.textContent = "✕"; b.title = "Remove";
  b.addEventListener("click", () => tr.remove());
  return b;
}
function td(el) { const c = document.createElement("td"); c.appendChild(el); return c; }

function addEnvRow(r) {
  const tr = document.createElement("tr");
  const match = mkInput(r.match, "e.g. contoso-prod");
  const label = mkInput(r.label, "e.g. PRODUCTION");
  const color = document.createElement("input");
  color.type = "color"; color.value = r.color || "#3ddc97";
  const prod = document.createElement("input");
  prod.type = "checkbox"; prod.checked = !!r.production;
  tr.append(td(match), td(label), td(color), td(prod), td(mkDel(tr)));
  tr.dataset.kind = "env";
  tbody("envTable").appendChild(tr);
}

function addTblRow(r) {
  const tr = document.createElement("tr");
  tr.append(td(mkInput(r.n, "e.g. MyCustomTable")), td(mkInput(r.d, "What it holds")), td(mkDel(tr)));
  tr.dataset.kind = "tbl";
  tbody("tblTable").appendChild(tr);
}

function addScRow(r) {
  const tr = document.createElement("tr");
  tr.append(td(mkInput(r.label, "e.g. All sales orders")), td(mkInput(r.mi, "e.g. SalesTableListPage")), td(mkDel(tr)));
  tr.dataset.kind = "sc";
  tbody("scTable").appendChild(tr);
}

async function saveAll() {
  const environments = [...tbody("envTable").rows].map(tr => {
    const [m, l, c, p] = tr.querySelectorAll("input");
    return { match: m.value.trim(), label: l.value.trim() || "ENV", color: c.value, production: p.checked };
  }).filter(r => r.match);

  const customTables = [...tbody("tblTable").rows].map(tr => {
    const [n, d] = tr.querySelectorAll("input");
    return { n: n.value.trim(), d: d.value.trim() };
  }).filter(r => r.n);

  const shortcuts = [...tbody("scTable").rows].map(tr => {
    const [l, mi] = tr.querySelectorAll("input");
    return { label: l.value.trim() || mi.value.trim(), mi: mi.value.trim() };
  }).filter(r => r.mi);

  await chrome.storage.sync.set({
    environments, customTables, shortcuts,
    bannerEnabled: $("bannerEnabled").checked,
  });

  $("status").textContent = "Saved";
  setTimeout(() => $("status").textContent = "", 1600);
}
