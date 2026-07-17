# SupportKit for D365 F&O

**The support engineer's toolkit for Microsoft Dynamics 365 Finance & Operations.**

One-click ticket context capture. An unmistakable environment guardian. Instant table browser and OData access. Built by a D365 support engineer, for D365 support teams everywhere.

![Manifest V3](https://img.shields.io/badge/Manifest-V3-3ddc97) ![Chrome](https://img.shields.io/badge/Chrome-supported-3ddc97) ![Edge](https://img.shields.io/badge/Edge-supported-3ddc97) ![Privacy](https://img.shields.io/badge/data%20collected-none-3ddc97) ![Licence](https://img.shields.io/badge/licence-MIT-blue)

---

## The problem

Every D365 F&O support engineer runs the same loop dozens of times a week: **triage, investigate, document, resolve.** The platform gives almost no help with any of it.

- Working out *where* a user's problem lives — which environment, legal entity, form and table — takes several clicks and a good memory for URL syntax.
- Touching the wrong environment is a career-limiting mistake, yet PROD, UAT and sandbox look pixel-for-pixel identical.
- Writing up a ticket means manually copying the URL, typing the environment name, noting the legal entity, taking a screenshot, and pasting it all into Jira, ServiceNow, Zendesk or an email — over and over.
- Opening the table browser means memorising `?mi=SysTableBrowser&tableName=...` and rebuilding it by hand.

Existing extensions serve **developers** — class runners, form openers, nav bar colouring. Nothing serves the support workflow itself. SupportKit fills that gap.

## What it does

### 📋 Ticket Snapshot — the headline feature
One click gathers everything a ticket needs:

```
── D365 F&O Support Context ──────────────
Environment : UAT
Host        : contoso-uat.sandbox.operations.dynamics.com
Legal entity: GBRK
Menu item   : SalesTableListPage
URL         : https://contoso-uat.sandbox.operations.dynamics.com/?cmp=GBRK&mi=SalesTableListPage
Captured    : 2026-07-16 09:41:02 UTC

Notes:
Sales order SO-004512 will not post. Error appears after
clicking Confirm. User: J. Smith, affects GBRK only.
──────────────────────────────────────────
```

The formatted block is copied to your clipboard and a screenshot of the page is downloaded — paste both straight into your ticketing system. What used to take five minutes takes five seconds.

### 🛡 Environment Guardian
Define your own rules: *if the URL contains `-prod`, label it PRODUCTION in red.* SupportKit paints a coloured strip along the top of every matching page and pins a badge in the corner. Production environments pulse. You will never again wonder which tab is safe to touch.

### 🗂 Table Browser, without the URL gymnastics
Fuzzy-search 120+ curated standard tables — grouped by module, each with a plain-English description — and open any of them in `SysTableBrowser` in one click, in the correct environment and legal entity. Add your own custom and ISV tables in Options. A raw input handles anything not on the list.

### 🔍 Support shortcuts
Curated one-click access to the lookups support engineers reach for daily: the table ID ↔ name view (`SysTableIdView`) for tracing `RefTableId`/`RefRecId` references, batch jobs, the outgoing email queue, security role assignments and the attachments register. Add unlimited shortcuts of your own to any menu item.

### 🌐 OData peek
Type a public entity name, choose `$top` and cross-company, and open the JSON straight in a new tab — the fastest sanity check there is when debugging an integration.

### 🔗 Deep link builder
Build a clean `?cmp=&mi=` link to any form and send it to a user, so "go to Accounts receivable, then…" becomes a single click for them.

## Installation

**From the store** *(recommended)* — search "SupportKit for D365 F&O" on the Chrome Web Store or Edge Add-ons.

**From source:**
1. Download or clone this repository
2. Open `chrome://extensions` (or `edge://extensions`)
3. Enable **Developer mode**
4. Click **Load unpacked** and select the folder

Then open **Options** and define your environments — thirty seconds of setup that pays back on the first ticket.

## Privacy — genuinely none of your data is touched

SupportKit was designed to pass the strictest corporate IT review:

- **No analytics, no telemetry, no tracking of any kind**
- **No external network calls** — the extension contains zero `fetch`/XHR code
- **Nothing is read from page content** — only the tab URL is parsed
- Settings live in your browser's own extension storage
- Permissions are minimal: `storage`, `activeTab`, and host access to `*.dynamics.com` only

See [PRIVACY.md](PRIVACY.md) for the full policy.

## Compatibility

- Google Chrome and Microsoft Edge (Manifest V3)
- Dynamics 365 Finance & Operations, Supply Chain Management and Commerce HQ — any environment hosted on `*.dynamics.com`
- Table browser access requires the corresponding permission in your environment; SupportKit opens standard D365 URLs and never bypasses security

## Roadmap

- Record-level deep links (`&q=` support)
- Session trail — retrace the forms you visited during an investigation
- Snapshot templates per ticketing system (Jira, ServiceNow, Azure DevOps markdown)
- Label / EDT lookup helpers

Suggestions and issues are very welcome — this tool grows from real support-desk pain.

## Author

Built by **Khadija** — Dev Support Engineer & AI Innovation Lead working with D365 F&O in production, who got tired of assembling ticket context by hand.

## Licence

MIT — free for personal and commercial use. See [LICENSE](LICENSE).
