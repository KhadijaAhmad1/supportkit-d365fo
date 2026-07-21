# Privacy Policy for SupportKit for D365 F&O

**Effective date: July 2026**

SupportKit collects no data. This policy exists because extension stores require one, and because users deserve clarity.

## What the extension accesses

- **The URL of the active tab**, only when you open the popup or when a page on `*.dynamics.com` loads. The URL is parsed locally to display environment, legal entity and menu item information.
- **A screenshot of the visible tab**, only when you explicitly click "Capture ticket snapshot". The image is saved directly to your own downloads folder and is never transmitted.
- **Your settings** (environment rules, custom tables, shortcuts), stored in your browser's extension sync storage under your own browser profile.

## What the extension does NOT do

- No analytics, telemetry, usage tracking or crash reporting
- No external network requests of any kind. The source contains no fetch or XHR code
- No reading of page content, form data, or business data
- No cookies, no fingerprinting, no identifiers
- No data sold, shared, or transferred to anyone, ever

## Permissions explained

| Permission | Why |
| `storage` | Save your settings in your own browser |
| `activeTab` | Read the current tab URL and capture a screenshot when you ask |
| `https://*.dynamics.com/*` | Show the environment guardian strip on D365 pages |

## Contact

Questions about this policy can be raised via the repository issues page.
