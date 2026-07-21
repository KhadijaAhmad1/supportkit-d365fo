# Chrome Web Store and Edge Add-ons Listing Copy

---

## Name
SupportKit for D365 F&O

## Short description (132 characters max)
The support engineer's toolkit for Dynamics 365 F&O: one-click ticket context capture, environment guardian, table and OData tools.

## Category
Workflow & Planning (Chrome) / Productivity (Edge)

## Detailed description

SupportKit is a toolkit built for people who support Dynamics 365 Finance and Operations day to day. It grew out of a simple problem: every ticket needs the same handful of details, environment, legal entity, form, menu item, and getting them by hand takes longer than it should.

The core feature is Ticket Snapshot. One click copies a clean, formatted block of context to your clipboard and downloads a screenshot of the page. Paste both into Jira, ServiceNow, Zendesk, or an email and the ticket is already half written.

SupportKit also tracks the last few pages visited in a tab, so if a user reports something broke but can't say what they clicked, you have the actual sequence of steps that led there. An Environment Guardian paints a coloured strip and badge on the page so production, UAT, sandbox and Trial are never confused for one another. A searchable list of over 120 standard tables opens straight into SysTableBrowser, and an OData panel lets you peek at any entity's data without leaving the browser.

Nothing here reaches outside your browser. There's no analytics, no tracking, and no external network calls in the code at all. Settings live in your own browser storage.

Not affiliated with or endorsed by Microsoft.

TICKET SNAPSHOT
One click copies a formatted context block to your clipboard. Environment, host, legal entity, menu item, full URL, timestamp and your notes. A screenshot of the page downloads at the same time. Paste both straight into Jira, ServiceNow, Zendesk or an email. Ticket documentation drops from minutes to seconds.

ENVIRONMENT GUARDIAN
Define your own rules such as "URL contains -prod → PRODUCTION, red". SupportKit paints a coloured strip along the top of every matching page and pins a badge in the corner. Production pulses. No more touching the wrong environment.

TABLE BROWSER WITHOUT URL GYMNASTICS
Fuzzy-search over 120 curated standard tables grouped by module, each with a plain-English description, and open any of them in SysTableBrowser in the correct environment and legal entity with one click. Add your own custom and ISV tables.

SUPPORT SHORTCUTS
One-click access to the lookups support teams use daily. Table ID to name resolution for tracing RefTableId and RefRecId references, batch jobs, the outgoing email queue, security role assignments and the attachments register. Add unlimited custom shortcuts to any menu item.

ODATA PEEK
Type a public entity name, set $top and cross-company, and open the JSON in a new tab. The fastest integration sanity check there is.

DEEP LINK BUILDER
Build a clean link to any form and send it to a user, so "navigate to..." becomes a single click for them.

PRIVACY FIRST
No analytics, no telemetry, no external network calls, no page content read. Only the tab URL is parsed, locally. Settings stay in your own browser storage. Minimal permissions. Designed to pass corporate IT review.

Works with Dynamics 365 Finance & Operations, Supply Chain Management and Commerce HQ on any *.dynamics.com environment, in Chrome and Edge.

Not affiliated with or endorsed by Microsoft.

## Screenshots to prepare (1280x800)
1. Context tab over a D365 environment, values visible
2. Ticket Snapshot preview with copied block and downloaded screenshot
3. Environment Guardian showing a red PRODUCTION strip and badge on a D365 page
4. Tables tab mid-search ("purch") showing grouped results
5. Options page with three environments configured

## Privacy practices declarations
- Single purpose: productivity tooling for D365 F&O support workflows
- Data collected: none
- Permissions justification:
  - storage: persist user settings
  - activeTab: read current tab URL and capture screenshot on explicit user action
  - host *.dynamics.com: display environment indicator on D365 pages
