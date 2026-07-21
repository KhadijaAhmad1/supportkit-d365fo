# SupportKit for D365 F&O

**A toolkit for support engineers working on Microsoft Dynamics 365 Finance & Operations.**

One-click ticket context capture. An environment guardian that stops you touching the wrong tenant. Fast table browser and OData access. Written by a D365 support engineer who got tired of doing all of this by hand.

![Manifest V3](https://img.shields.io/badge/Manifest-V3-2266E3) ![Chrome](https://img.shields.io/badge/Chrome-supported-2266E3) ![Edge](https://img.shields.io/badge/Edge-supported-2266E3) ![Privacy](https://img.shields.io/badge/data%20collected-none-2266E3) ![Licence](https://img.shields.io/badge/licence-MIT-blue)

---

## The problem

Every D365 F&O support engineer runs the same loop several dozen times a week. Triage. Investigate. Document. Resolve. The platform gives you almost nothing to help with any of it.

Working out where a user's problem lives (which environment, legal entity, form and table) takes several clicks and a good memory for URL syntax. Touching the wrong environment is a career-limiting mistake, and yet PROD, UAT and sandbox look pixel-for-pixel identical in the browser. Writing up a ticket means copying the URL by hand, typing the environment name, noting the legal entity, taking a screenshot, and pasting all of that into Jira or ServiceNow. Every time. Opening the table browser means remembering `?mi=SysTableBrowser&tableName=...` and building the URL yourself.

Other extensions exist, but they serve developers. Class runners. Form openers. Nav bar colouring. Nothing serves the support workflow itself. That is the gap SupportKit fills.

## What it does

### Ticket Snapshot, the headline feature

One click gathers what a ticket needs:

```
── D365 F&O Support Context ──────────────
Environment : UAT
Host        : contoso-uat.sandbox.operations.dynamics.com
Legal entity: GBRK
Menu item   : SalesTableListPage
Form name   : SalesTable
URL         : https://contoso-uat.sandbox.operations.dynamics.com/?cmp=GBRK&mi=SalesTableListPage
Captured    : 2026-07-20 09:41:02 UTC

User's journey (last 4 steps in this tab):
  1. 09:38:14  DefaultDashboard
  2. 09:39:47  SalesTableListPage (form: SalesTable)
  3. 09:40:31  SalesTableListPage (form: SalesTable)
  4. 09:41:02  SalesTableListPage (form: SalesTable)  [current]

Notes:
Sales order SO-004512 won't post. Error shows up after clicking
Confirm. User: J. Smith. Only happens in GBRK.
──────────────────────────────────────────
```

The block gets copied to your clipboard and a screenshot of the page downloads to your Downloads folder. Paste both into your ticketing system. What used to be five minutes of copy-paste is five seconds.

### Environment Guardian

You define the rules. If the URL contains `-prod`, label it PRODUCTION in red. If it contains `sandbox`, call it SANDBOX in green. SupportKit paints a coloured strip along the top of any matching page and pins a badge in the corner. Production environments pulse so you notice them. You stop wondering which tab is safe to touch.

### Session trail

Every navigation you make inside a D365 tab gets recorded in that tab's own session storage, which clears when you close the tab. Form name, menu item, legal entity, timestamp. The Snapshot tab shows the last ten steps as a numbered timeline. By default the trail gets included in your ticket snapshot. When a user reports "it broke and I don't remember what I did," you now have the exact sequence of clicks that led there.

### Table browser without the URL gymnastics

Search 120+ standard tables grouped by module. Each has a short plain-English description. Click one and it opens in `SysTableBrowser` in the current environment and legal entity. Add your own custom or ISV tables in Options. A raw input handles anything not on the list.

### Support shortcuts

One-click access to the lookups support engineers reach for daily. The `SysTableIdView` table for resolving `RefTableId` and `RefRecId` values. Batch jobs. The outgoing email queue. Security role assignments. The attachments register. Add unlimited shortcuts of your own to any menu item.

### OData peek

Type a public entity name, choose `$top` and cross-company, and the JSON opens in a new tab. Fastest sanity check there is when you're debugging an integration.

### Deep link builder

Build a clean `?cmp=&mi=` link to any form and send it to a user. So "go to Accounts receivable, then All customers, then..." becomes a single click for them.

## Installation

**From the store** (recommended): search "SupportKit for D365 F&O" on the Chrome Web Store or Edge Add-ons.

**From source:**

1. Download or clone this repository
2. Open `chrome://extensions` (or `edge://extensions`)
3. Enable Developer mode
4. Click Load unpacked and select the folder

Open Options and define your environments. Thirty seconds of setup that pays back on the first ticket.

**If the session trail looks empty after installing or updating:** toggle the extension off and on in `chrome://extensions`, then close and reopen your D365 tab. Content scripts don't always reinject into tabs that were already open before install.

## Privacy

SupportKit was built to pass strict corporate IT review. Nothing about your data leaves your browser.

- No analytics, no telemetry, no tracking of any kind
- No external network calls. The source contains zero `fetch` or XHR code
- Nothing gets read from page content beyond form name attributes and the tab URL
- Settings live in your browser's own extension storage
- Permissions are minimal: `storage`, `activeTab`, and host access to `*.dynamics.com` only

See [PRIVACY.md](PRIVACY.md) for the full policy.

## Compatibility

Google Chrome and Microsoft Edge (Manifest V3). Dynamics 365 Finance & Operations, Supply Chain Management and Commerce HQ. Any environment hosted on `*.dynamics.com`.

Table browser access needs the right permission in your environment. SupportKit opens standard D365 URLs. It never bypasses security.

## Roadmap

- Snapshot templates per ticketing system (Jira, ServiceNow, Azure DevOps markdown)
- Label and EDT lookup helpers
- Optional bring-your-own-key AI ticket summariser. Takes your rough notes plus the captured context and journey and turns them into a structured Jira or ServiceNow description. Kept optional and BYO-key so the current zero-external-calls default stays intact.

Suggestions and issues are welcome. This tool grows from real support-desk pain.

## Author

Built by Khadija. AI Innovation Lead working with D365 F&O in production. Got tired of assembling ticket context by hand and did something about it.

## Licence

MIT. Free for personal and commercial use. See [LICENSE](LICENSE).
