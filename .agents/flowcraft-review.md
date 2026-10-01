# Flow Craft Consistency & Quality Review

**Date:** Review performed across UC-01 through UC-08  
**Scope:** `index.html`, `data/flowcraft.json`, `css/main.css`, `js/main.js`, `flowcraft/*.html` (all 8 pages)

---

## Summary

The overall implementation is solid and well-structured. The majority of checks pass. Key issues to fix are: (1) UC-07's card has two `fc-tech-tag` elements without `data-filter` attributes, which silently breaks the filter for those tags; (2) a `jira-smart-values` tag appears on UC-01's card but has no filter button; (3) significant CSS duplication exists across the 8 detail pages — the same ~15 rule-sets are re-declared in every inline `<style>` block; (4) UC-06's card uses different section-label text ("Pattern" / "Why it matters") compared to the "Problem" / "Automation" pattern used by all other cards. No security issues were found.

---

## Check 1 — Card Visual Structure

**Status: WARN**

The expected structure is: `fc-card > fc-card-header > [fc-card-number + fc-card-tech-tags] > fc-card-title > fc-card-body > fc-card-section*2 > fc-card-footer > fc-view-btn`.

**UC-01 through UC-05, UC-08:** All follow the expected structure exactly. Two `fc-card-section` elements, both with `fc-card-section-label` ("Problem" / "Automation").

**UC-06 (Jira to Power Automate Integration):** Structural deviation — the two `fc-card-section` labels are "Pattern" and "Why it matters" instead of "Problem" and "Automation". The structure itself (number of elements, nesting) is correct, but the label content differs from the other 7 cards.

**UC-07 (Slack Leave Planner):** Has an extra element — a `<div class="fc-card-category fc-card-category--collab">` inserted between `fc-card-header` and `fc-card-title`. This is intentional by design (Collaboration Automation badge), but it means UC-07 does not match the strict expected structure. The category element appears after the header but before the title, which is a minor departure.

**Recommendation:** Either standardise UC-06 to use "Problem" and "Automation" labels, or accept the deviation if the alternative framing is intentional. The UC-07 category badge deviation is deliberate and acceptable, but should be documented as a known structural variant.

---

## Check 2 — View Use Case Links

**Status: PASS**

All 8 `fc-view-btn` onclick URLs verified:

| Card | onclick URL | File exists? |
|------|-------------|-------------|
| UC-01 | `flowcraft/sprint-summary.html` | ✅ Yes |
| UC-02 | `flowcraft/multi-squad-routing.html` | ✅ Yes |
| UC-03 | `flowcraft/rollout-notification.html` | ✅ Yes |
| UC-04 | `flowcraft/bug-alert.html` | ✅ Yes |
| UC-05 | `flowcraft/adaptive-cards.html` | ✅ Yes |
| UC-06 | `flowcraft/jira-powerautomate-integration.html` | ✅ Yes |
| UC-07 | `flowcraft/slack-leave-planner.html` | ✅ Yes |
| UC-08 | `flowcraft/sprint-review-reporting.html` | ✅ Yes |

All links are correct and all target files exist.

---

## Check 3 — UC IDs Sequential

**Status: PASS**

UC-01 through UC-08 appear in order in `index.html`. Each `fc-card-number` span matches the expected sequence.

Detail page `fc-uc-id` values verified:

| File | Expected ID | Actual `fc-uc-id` |
|------|-------------|-------------------|
| sprint-summary.html | UC-01 | ✅ UC-01 |
| multi-squad-routing.html | UC-02 | ✅ UC-02 |
| rollout-notification.html | UC-03 | ✅ UC-03 |
| bug-alert.html | UC-04 | ✅ UC-04 |
| adaptive-cards.html | UC-05 | ✅ UC-05 |
| jira-powerautomate-integration.html | UC-06 | ✅ UC-06 |
| slack-leave-planner.html | UC-07 | ✅ UC-07 |
| sprint-review-reporting.html | UC-08 | ✅ UC-08 |

No mismatches.

---

## Check 4 — Technology Tags

**Status: WARN**

**Filter buttons present in `fc-filter-bar`:**
- `all`
- `jira-automation`
- `webhook`
- `power-automate`
- `ms-teams`
- `json`
- `routing-logic`
- `adaptive-cards`
- `slack`

**Tags used on cards via `data-filter` on `fc-tech-tag` elements:**

| UC | `data-filter` values used |
|----|---------------------------|
| UC-01 | `jira-automation`, `jira-smart-values`, `webhook`, `power-automate`, `ms-teams`, `json` |
| UC-02 | `jira-automation`, `webhook`, `power-automate`, `routing-logic`, `ms-teams`, `json` |
| UC-03 | `jira-automation`, `webhook`, `power-automate`, `adaptive-cards`, `ms-teams`, `json` |
| UC-04 | `jira-automation`, `webhook`, `power-automate`, `ms-teams`, `json` |
| UC-05 | `power-automate`, `adaptive-cards`, `ms-teams`, `json`, `webhook` |
| UC-06 | `jira-automation`, `webhook`, `power-automate`, `json` |
| UC-07 | `slack` (only one `fc-tech-tag` has `data-filter`) |
| UC-08 | `jira-automation` (only one `fc-tech-tag` has `data-filter`) |

**Issue 1 — `jira-smart-values` has no filter button:**
UC-01's card has `<span class="fc-tech-tag" data-filter="jira-smart-values">Jira Smart Values</span>`. This `data-filter="jira-smart-values"` value has no corresponding filter button in the `fc-filter-bar`. Clicking a `jira-smart-values` filter button is impossible — the tag is visually rendered but is not reachable via the filter UI. This is a cosmetic inconsistency (the tag is visible on the card but unfiltered) rather than a functional break.

**Issue 2 — UC-07's "Workflow Builder" and "Scheduled Automation" tags have no `data-filter`:**
```html
<span class="fc-tech-tag">Workflow Builder</span>
<span class="fc-tech-tag">Scheduled Automation</span>
```
These two `fc-tech-tag` spans have no `data-filter` attribute. They render as visual tags but are not usable for filtering.

**Issue 3 — UC-08's "Jira Query" and "Dashboard / Reporting" tags have no `data-filter`:**
```html
<span class="fc-tech-tag">Jira Query</span>
<span class="fc-tech-tag">Dashboard / Reporting</span>
```
Same as above — visual only, not filterable.

**Issue 4 — UC-08's `data-tags` on the card element is `"jira-automation json"` but `json` has no `fc-tech-tag` with `data-filter="json"` on this card.** The card-level `data-tags` correctly lists `json` for filter matching, but no visible tech tag displays it.

**Filter buttons with no cards using them:** None — every filter button value (`jira-automation`, `webhook`, `power-automate`, `ms-teams`, `json`, `routing-logic`, `adaptive-cards`, `slack`) is used by at least one card's `data-tags`.

**Recommendations:**
- Either add filter buttons for `jira-smart-values`, or remove `data-filter` from that tag (make it display-only like the UC-07/08 tags).
- Consider whether "Workflow Builder" and "Scheduled Automation" should be added to the `fc-filter-bar` if Slack-only filtering is ever needed beyond the `slack` tag.
- Add a visible `<span class="fc-tech-tag" data-filter="json">JSON</span>` to UC-08's card header for completeness.

---

## Check 5 — Filter JavaScript

**Status: PASS with WARN**

The filter JS (inline `<script>` at the bottom of `index.html`) uses:
```js
card.dataset.tags.includes(filter)
```

This is a **string includes check**, not an array/set membership check. For example, if `filter` is `"json"`, this would match a card whose `data-tags` contains `"json"` but also (hypothetically) match one containing `"morejson"` or `"json-extra"`. In the current tag set, all values are unique enough that no false positives occur (e.g. `"jira-automation"` does not contain `"jira"` as a standalone substring at risk of collision with another `"jira-*"` value appearing mid-string).

**Confirmed correct matches:**
- UC-01 `data-tags="jira-automation jira-smart-values webhook power-automate ms-teams json"` — all filter values match correctly.
- UC-07 `data-tags="slack"` — only `slack` filter or `all` will show this card. Correct.
- UC-08 `data-tags="jira-automation json"` — will show for `jira-automation`, `json`, or `all`. Correct.

**Alignment of card `data-tags` with visible `fc-tech-tag[data-filter]` values:**
- UC-01: `data-tags` lists `jira-smart-values` but this tag has no filter button (noted in Check 4) — not a functional break.
- UC-07: `data-tags="slack"`. The card also has two `fc-tech-tag` elements without `data-filter` ("Workflow Builder", "Scheduled Automation"). These extra tags do not affect filtering since `data-tags` is the authority — but the card would not appear under a hypothetical "workflow-builder" filter.
- UC-08: `data-tags="jira-automation json"`. No visible JSON tag displayed in header (as noted in Check 4).

The filter logic itself is correct. The secondary concern is the `String.includes` approach: it works correctly for the current tag values and is a common lightweight pattern for small data sets.

---

## Check 6 — Responsive CSS

**Status: PASS**

Breakpoints found in `index.html`'s inline `<style>`:

| Breakpoint | Targets |
|------------|---------|
| `@media (max-width: 768px)` | `.header`, `.nav-container`, `.nav-menu`, `.hero-section`, `.hero-name`, `.cert-grid`, `.section`, `.section-title`, `.about-card`, `.contact-card`, `.interest-grid` |
| `@media (max-width: 900px)` | `.portfolio-master-grid` → `repeat(2, 1fr)` |
| `@media (max-width: 540px)` | `.portfolio-master-grid` → `1fr` |

The `fc-card-grid` uses `grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))`. This is intrinsically responsive — on a `320px` wide screen it collapses to a single column automatically without an explicit media query.

The `portfolio-master-grid` has explicit breakpoints at 900px and 540px, covering tablet and mobile well.

`css/main.css` (detail pages) has one breakpoint: `@media (max-width: 600px)` covering the detail header padding and title font size. Each detail page also includes an inline `@media (max-width: 600px)` covering its component-specific styles.

**Coverage assessment:**
- Mobile (≤540px): Covered — portfolio grid collapses to 1 column, FC card grid auto-adjusts, detail pages adjust padding.
- Tablet (≤900px): Covered — portfolio grid at 2 columns. FC card grid auto-adjusts via `auto-fill`.
- Desktop: Default styles apply.

No gaps identified.

---

## Check 7 — Detail Page Layout Consistency

**Status: PASS with WARN**

Checked each page for: (a) `fc-detail-header` with `fc-back-link` and `fc-uc-id`, (b) `../css/main.css` link, (c) `../js/main.js` script, (d) `fc-detail-hero` with `fc-detail-title` and `fc-detail-tags`, (e) ≥5 `fc-detail-section` elements, (f) section h2 headings matching the required sections.

| File | (a) Header | (b) CSS | (c) JS | (d) Hero | (e) ≥5 Sections | Notes |
|------|-----------|---------|--------|----------|-----------------|-------|
| sprint-summary.html | ✅ | ✅ | ✅ | ✅ | ✅ 8 sections | All required sections present |
| multi-squad-routing.html | ✅ | ✅ | ✅ | ✅ | ✅ 9 sections | All required sections present |
| rollout-notification.html | ✅ | ✅ | ✅ | ✅ | ✅ 9 sections | All required sections present |
| bug-alert.html | ✅ | ✅ | ✅ | ✅ | ✅ 10 sections | All required sections present |
| adaptive-cards.html | ✅ | ✅ | ✅ | ✅ | ✅ 9 sections | All required sections present |
| jira-powerautomate-integration.html | ✅ | ✅ | ✅ | ✅ | ✅ 9 sections | All required sections present |
| slack-leave-planner.html | ✅ | ✅ | ✅ | ✅ | ✅ 9 sections | Has `uc-category-banner` above h1 |
| sprint-review-reporting.html | ✅ | ✅ | ✅ | ✅ | ✅ 9 sections | All required sections present |

**Section heading coverage against requirements:**

- **UC-05** required: Challenge, Solution, Architecture, Dynamic Data Mapping, Adaptive Card Concept, Example Output, Reusability, Technology, Value.  
  Actual h2 headings: "The Challenge", "Solution", "Adaptive Card Concept", "Architecture", "Dynamic Data Mapping", "Example Output", "Reusability", "Technologies Used", "Value".  
  All required sections present. ✅

- **UC-06** required: (technical deep-dive, no fixed section list specified).  
  Actual: "Objective", "Core Concepts", "Architecture", "Integration Layers", "How It Works", "JSON Payload Example", "How the Receiving Flow Interprets the Payload", "Why This Architecture Is Reusable", "Technologies Used", "Security Note". Well covered. ✅

- **UC-07** required: Problem, Goal, Workflow, Architecture, How It Works, Information Captured, Automation Benefits, Limitations, Technology.  
  Actual h2: "Problem", "Goal", "Workflow", "Architecture", "How It Looks in Slack", "Information Captured", "Automation Benefits", "Limitations", "Technologies Used". All present. ✅

- **UC-08** required: Challenge, Objective, Architecture, Data Collection, Metrics, Reporting Approach, Stakeholder Value, Technology, Lessons Learned.  
  Actual h2: "Challenge", "Objective", "Architecture", "Data Collection", "Metrics", "Reporting Approach", "Stakeholder Value", "Technologies Used", "Lessons Learned". All present. ✅

No pages are missing required elements.

---

## Check 8 — Back Link

**Status: PASS**

All 8 detail pages have:
```html
<a href="../index.html#flow-craft" class="fc-back-link">← Back to Flow Craft</a>
```
Every `fc-back-link` href is exactly `../index.html#flow-craft`. No deviations found.

---

## Check 9 — Duplicate CSS

**Status: FAIL (significant duplication)**

### Between `index.html` inline styles and `css/main.css`

`css/main.css` contains the shared detail-page styles. `index.html` contains its own large inline `<style>` block for the index page layout (FC cards, filter bar, portfolio grid, hero, etc.) — this is intentional and correct, as `main.css` is detail-page only and not linked from `index.html`. No problematic duplication between these two files.

### Across the 8 `flowcraft/*.html` inline `<style>` blocks (major issue)

The following CSS component rule-sets are **duplicated verbatim or near-verbatim across multiple detail pages**. Each page has its own inline `<style>` block that re-declares these rules, even though all pages already link to `css/main.css`:

| Rule-set / component | Pages containing it |
|----------------------|---------------------|
| `.arch-diagram`, `.arch-node`, `.arch-node--trigger/process/transport/platform/output`, `.arch-arrow` | UC-01, UC-02, UC-03, UC-04, UC-05, UC-06, UC-07, UC-08 — **all 8 pages** |
| `.tech-stack-grid`, `.tech-stack-item`, `.tech-stack-name`, `.tech-stack-role` | UC-01, UC-02, UC-03, UC-04, UC-05, UC-06, UC-07, UC-08 — **all 8 pages** |
| `.steps-list`, `.step-item`, `.step-number`, `.step-text` | UC-01, UC-02, UC-03, UC-04, UC-05, UC-06, UC-07, UC-08 — **all 8 pages** |
| `.value-grid`, `.value-item`, `.value-icon`, `.value-label`, `.value-desc` | UC-01, UC-02, UC-03, UC-04, UC-05, UC-06, UC-07, UC-08 — **all 8 pages** |
| `.arch-node--decision` (additional node variant) | UC-02 only |
| `.arch-branch-row`, `.arch-branch-col`, `.arch-branch-node`, `.arch-branch-output`, `.arch-branch-arrow`, `.arch-branch-connector` | UC-02, UC-06 — 2 pages |
| `.security-note` (yellow callout) | UC-03, UC-04, UC-06 — 3 pages |
| `@media (max-width: 600px) { .tech-stack-item { flex-direction: column; } .tech-stack-name { min-width: unset; } }` | UC-01, UC-02, UC-03, UC-04, UC-05, UC-06, UC-07, UC-08 — **all 8 pages** |

**Estimated total duplicate lines:** The four universally-duplicated sets (arch diagram, tech stack, steps, value grid) collectively run to approximately 80–100 lines of CSS each time they appear. Across 8 pages, this represents around 640–800 redundant lines of inline CSS.

**Root cause:** When UC-01 was built, these component styles were placed inline. Each subsequent page copied the same styles rather than moving shared rules to `css/main.css`.

**Recommendation:** Move the universally-duplicated rules (`.arch-diagram`, `.tech-stack-grid`, `.steps-list`, `.value-grid`, and their child selectors) into `css/main.css`. This is the correct home — it is already linked by all detail pages. Page-specific styles (e.g. `.routing-block` in UC-02, `.slack-mock` in UC-07, `.mapping-table` in UC-05) should remain inline or move to per-page stylesheets. See item 16 for the change impact.

---

## Check 10 — Duplicate JavaScript

**Status: PASS**

`js/main.js` contains only a single IIFE with a `console.log` placeholder. It defines no functions and has no logic.

`index.html`'s inline `<script>` block contains two IIFEs:
1. Portfolio tile click/expand logic
2. Flow Craft filter bar logic

There is no overlap between `js/main.js` and `index.html`'s script. No duplicate function definitions exist.

The detail pages each include `<script src="../js/main.js"></script>`, which loads the placeholder only. No duplicate JS across pages.

---

## Check 11 — Security

**Status: PASS**

Scanned all files for: real webhook URLs (containing `outlook.office`, `prod`, `live`, real GUIDs, non-placeholder domains), credential patterns, real Jira project keys, real employee names, internal company identifiers.

**Findings:**

- **No real webhook URLs found.** The only webhook URL used as an example in `jira-powerautomate-integration.html` is `https://example.invalid/browse/PROJ-0000` (a Jira issue link example, not a webhook) and `https://example.invalid/webhook` is referenced in prose. Both use `example.invalid` as required.
- **No real Power Automate trigger URLs found.** The security note in UC-06 instructs not to expose them, and none appear in code or examples.
- **No real API keys, Bearer tokens, or credential strings found.**
- **No real Jira project keys.** All examples use `PROJ-1234`, `PROJ-5678`, `PROJ-0001`–`PROJ-0004`, and `PROJ-0000` — all using the generic `PROJ-` prefix with fictional numbers.
- **No real employee names.** Placeholders used: "Team Member Name", "Team Member", "Unassigned", "Squad Name".
- **No internal company identifiers, tenant IDs, or organisational information found.**
- **About section in `index.html`** contains numbers (90%, 70%, 60%) — these are in the personal `About Me > Measurable Impact` section, not in Flow Craft pages. They are personal claims about the author's own work, not automation-generated benefits invented for the Flow Craft use cases. Not a Flow Craft concern.

---

## Check 12 — Invented Benefits

**Status: PASS**

Scanned all 8 `flowcraft/*.html` files for quantified claims (percentages, numeric time savings, specific improvement figures).

**No quantified benefit claims found in any Flow Craft detail page.** All value statements are qualitative:
- "Eliminates manual effort every sprint" (UC-01)
- "Less time spent before the review pulling numbers from Jira manually" (UC-08)
- "The workflow runs on schedule — no one needs to remember to ask" (UC-07)

No phrases such as "50% faster", "saves 2 hours per sprint", "3x improvement" were found. The requirement to avoid invented quantified benefits has been respected.

---

## Check 13 — Terminology Consistency

**Status: PASS with minor WARN**

Searched across all `flowcraft/*.html` and `index.html` for terminology inconsistencies.

**No occurrences of disallowed forms found:**
- `Jira automation` (lowercase 'a') — not found; always "Jira Automation" ✅
- `powerautomate` — not found ✅
- `MSTeams` or `ms teams` — not found ✅
- `slack workflow builder` (all lowercase) — not found; always "Slack Workflow Builder" ✅
- `web hook` (two words) — not found ✅

**Minor inconsistency found:**
- "Adaptive Card" (singular) vs "Adaptive Cards" (plural): Both forms are used across pages, but this reflects correct contextual usage — "an Adaptive Card" (one instance) vs "Adaptive Cards" (the technology/framework). This is not an error.
- `flowcraft.json` uses `"json payload"` (lowercase in a quoted string context) within prose — not found.
- UC-05's page title says "Dynamic Microsoft Teams Adaptive Cards" which matches the use case name. ✅
- UC-04 uses "Smart Values" rather than "Jira Smart Values" in its hero tags and `Technologies Used` section. UC-01 uses "Jira Smart Values". The `flowcraft.json` entry for UC-04 uses "Smart Values" (without "Jira" prefix). This is a minor inconsistency: UC-01 calls it "Jira Smart Values", UC-04 calls it "Smart Values", UC-06 calls it "Smart Values". Standardise to "Jira Smart Values" across all for consistency.

---

## Check 14 — Accessibility

**Status: WARN**

### Architecture diagrams (`role="img"` + `aria-label`)
All `arch-diagram` elements in every detail page have:
```html
<div class="arch-diagram" role="img" aria-label="...descriptive label...">
```
All 8 pages implement this correctly. ✅

### Card buttons (`fc-view-btn`)
All 8 cards have `aria-label` on the button:
```html
<button class="fc-view-btn" ... aria-label="View use case: [Title]">View Use Case →</button>
```
✅

### Alert/card mock-ups in detail pages
- UC-03 (`ac-preview`): `role="img"` with `aria-label` ✅
- UC-04 (`alert-preview`): `role="img"` with `aria-label` ✅
- UC-05 (`ac-preview` x2): `role="img"` with `aria-label` ✅
- UC-07 (`slack-mock`): `role="img"` with `aria-label` ✅
- UC-08 (`report-preview`): `role="img"` with `aria-label` ✅

### Mock-up buttons (inside previews)
Buttons inside `.ac-preview`, `.alert-preview`, `.slack-mock`, and `.report-preview` use `cursor: default` and are presentational. However, they are standard `<button>` elements with visible text ("View in Jira", "Acknowledge", "Submit", etc.) — they have visible text content. No `aria-label` is needed since text is present. ✅

### Navigation
`<nav aria-label="Primary navigation">` in `index.html`. ✅  
Filter bar: `<div class="fc-filter-bar" role="group" aria-label="Filter use cases by technology">`. ✅  
`.brand-logo` has `aria-label="Go to Home section"`. ✅

### Filter buttons
Filter buttons use `class="fc-tag"` with `data-filter="..."`. They have visible text content but no explicit `aria-label`. The button text matches the filter value (e.g. "Jira Automation", "Webhook") — visible text labels are present and adequate. ✅

### Color contrast concerns (WARN)
The following combinations may present contrast issues and require manual verification:
1. `.arch-node--process`: text `#1e3a5f` on background `#eff6ff`. This is a dark navy on very light blue. Likely passes 4.5:1 but should be verified.
2. `.fc-tech-tag` on detail pages: `color: var(--color-text-muted)` (#334155) on `background: var(--color-white)` (#ffffff). Contrast ratio ~8.5:1. ✅
3. `.arch-node--transport`: text `#713f12` on `#fefce8`. Light yellow background — verify contrast.
4. `.arch-node--output`: white text on `#1d4ed8`. Estimated ~4.8:1. Should be verified precisely.
5. UC-07's `.slack-mock`: text in `.slack-field-input` uses `color: #94a3b8` (placeholder-style grey) on white. This is a stylistic choice representing placeholder text; if screen readers encounter it, it reads as regular text and contrast (~3.0:1) is below the 4.5:1 threshold. Since this is a mock-up (role="img"), this is less of a concern but worth noting.

### Form elements
No live form elements exist on any page (all form-like elements are CSS mock-ups). ✅

### `img` elements
`index.html` hero image: `<img src="assets/laxman-prasad-kuppili.jpg" alt="Laxman Prasad Kuppili" class="hero-avatar">`. Has `alt` text. ✅

---

## Check 15 — Other Sections Intact

**Status: PASS**

Verified all sections outside Flow Craft in `index.html` are intact:

| Section ID | Key element found | Status |
|------------|-------------------|--------|
| `#home` | `<section id="home" class="hero-section">` with `.hero-name`, `.hero-profile-header`, `.hero-actions` | ✅ |
| `#about` | `<section id="about" class="section section-alt">` with 7 `article.about-block` elements | ✅ |
| `#areas-of-interest` | `<section id="areas-of-interest" class="section">` with 4 `article.interest-card` elements | ✅ |
| `#portfolio` | `<section id="portfolio" class="section">` with `.portfolio-master-grid` (4 tiles) and 4 sub-sections | ✅ |
| `#flow-craft` | `<section id="flow-craft" class="section section-alt">` with filter bar and 8 UC cards | ✅ |
| `#applied-ai` | `<section id="applied-ai" class="section">` with `.coming-soon-card` | ✅ |
| `#toolkit` | `<section id="toolkit" class="section section-alt">` with `.coming-soon-card` | ✅ |
| `#contact` | `<section id="contact" class="section section-alt">` with `.contact-card`, LinkedIn and GitHub links | ✅ |

Navigation links in `<header>` and `<footer>` all reference these section IDs correctly. No outside-Flow-Craft content was altered.

---

## Check 16 — JSON vs Hardcoded Analysis

**Status: ANALYSIS (no change made, awaiting approval)**

### Current implementation

`data/flowcraft.json` is a data file containing all 8 use cases. Each entry includes: `id`, `title`, `file`, `tags` (array), `problem`, `automation`, `technology` (array), and optionally `category`.

`index.html` contains all 8 UC cards hardcoded in HTML. Each card duplicates the following fields from `flowcraft.json`:

| Field in JSON | Corresponding element in card HTML |
|---|---|
| `title` | `<h3 class="fc-card-title">` |
| `tags` (array) | `data-tags` attribute on `<article>` AND `data-filter` on each `<span class="fc-tech-tag">` |
| `problem` | First `fc-card-section > fc-card-text` |
| `automation` | Second `fc-card-section > fc-card-text` |
| `file` | `onclick="window.location.href='...'` in `fc-view-btn` |
| `id` | Implicitly in `fc-card-number` (UC-01 etc.) |
| `category` | `fc-card-category` element (UC-07 only) |

### Duplication count

For each use case, **7 data fields** are duplicated across JSON and HTML. With 8 use cases:
- **56 field-level duplications** total between `flowcraft.json` and `index.html`.

If a single use case's **title** changed, it would need to be updated in:
1. `data/flowcraft.json` → `title` field
2. `index.html` → `<h3 class="fc-card-title">` text
3. `index.html` → `aria-label` on `fc-view-btn` (references the title)
4. The detail page `<title>` element (e.g. "UC-01 Automated Sprint Completion Summary | Flow Craft")
5. The detail page `<h1 class="fc-detail-title">` text
6. The detail page `<meta name="description">` content

**That is 6 places for a title change** — 2 in `index.html` (card title + button aria-label), 3 in the detail page (page title, h1, meta description), and 1 in `flowcraft.json`.

If a **tag** changed (e.g. renaming `ms-teams` to `microsoft-teams`):
1. `data/flowcraft.json` → `tags` array
2. `index.html` → `data-tags` attribute on the card `<article>`
3. `index.html` → `data-filter` attribute on the relevant `<span class="fc-tech-tag">`
4. `index.html` → the filter button `data-filter` in `fc-filter-bar`

**That is 4 places for a tag rename** (and if multiple cards use the tag, multiply by that count).

### Benefits of JSON-driven rendering

1. **Single source of truth:** UC titles, tags, problem statements, and links would exist only in `flowcraft.json`. A card change requires one edit.
2. **Structural consistency enforced:** A JS renderer applying one template guarantees all 8 cards have identical structure — no per-card structural drift is possible.
3. **Filter logic simplification:** `data-tags` can be generated directly from the JSON `tags` array, ensuring it always matches the visible `fc-tech-tag` elements.
4. **Easier to add new UCs:** Adding UC-09 requires only a new JSON entry — no HTML authoring needed for the index card.

### Risks

1. **JavaScript dependency:** The page currently renders with zero JavaScript required (cards are static HTML). JSON-driven rendering requires JS to load and render the cards. If JS fails or is blocked, the Flow Craft section shows nothing.
2. **FOUC (Flash of Unstyled/Uncontent):** Cards would render after JS executes rather than at first HTML paint.
3. **Complexity increase:** Requires a `fetch()` call or embedded JSON, plus a template renderer. Introduces a potential single point of failure.
4. **Detail pages are not affected:** The JSON-driven approach only applies to the index cards — the 8 detail HTML pages would remain unchanged.
5. **`flowcraft.json` does not currently store UC-specific section content:** The problem text in the JSON is a shorter summary; the full card text in `index.html` sometimes differs slightly. Reconciling these before switching would require care.

### Files that would change

- `index.html` — remove 8 hardcoded `<article class="fc-card">` blocks; add a JS renderer using `flowcraft.json`
- `data/flowcraft.json` — no structural changes needed; may need minor content alignment with card text
- `js/main.js` — extend to include the card renderer (currently a placeholder)

**Awaiting approval before making this architectural change.**

---

## Prioritised Fix List

### Priority 1 — Functional / Filter Bugs

1. **[P1] UC-07 tags missing `data-filter`** — "Workflow Builder" and "Scheduled Automation" `fc-tech-tag` elements have no `data-filter` attribute. These are inert. If filtering by these technologies is ever desired, add `data-filter` values and corresponding filter buttons, or remove the tags from the card if they are display-only. Currently harmless but inconsistent with how other tags work.

2. **[P1] UC-08 tags missing `data-filter`** — "Jira Query" and "Dashboard / Reporting" have no `data-filter`. Same issue as UC-07. Additionally, the card shows only `jira-automation` as a filterable tech tag but the `data-tags` attribute includes `json` with no corresponding visible tag in the header.

3. **[P1] `jira-smart-values` filter tag has no button** — UC-01 uses `data-filter="jira-smart-values"` but there is no filter button for it. Either add a "Jira Smart Values" filter button to `fc-filter-bar`, or remove `data-filter` from that tag (keep it as a display-only tag like the UC-07/08 tags).

### Priority 2 — Consistency

4. **[P2] UC-06 card section labels deviate** — Uses "Pattern" and "Why it matters" instead of "Problem" and "Automation". Decide whether to standardise or explicitly mark UC-06 as a different format (it is a technical reference entry, not a problem/solution use case).

5. **[P2] "Smart Values" vs "Jira Smart Values"** — Standardise to "Jira Smart Values" across UC-01, UC-04, UC-06 hero tags and `Technologies Used` sections, and in `flowcraft.json`.

### Priority 3 — Code Quality

6. **[P3] CSS duplication across detail pages** — Move `.arch-diagram`, `.arch-node` variants, `.arch-arrow`, `.tech-stack-grid`, `.tech-stack-item`, `.steps-list`, `.step-item`, `.value-grid`, `.value-item`, and their `@media (max-width: 600px)` overrides into `css/main.css`. This eliminates approximately 640–800 lines of redundant inline CSS. Page-specific components (`.routing-block`, `.slack-mock`, `.mapping-table`, `.report-preview`, etc.) stay inline.

### Priority 4 — Accessibility

7. **[P4] Verify colour contrast** — Manually verify contrast ratios for: `.arch-node--transport` (#713f12 on #fefce8), `.arch-node--process` (#1e3a5f on #eff6ff), and `.arch-node--output` (white on #1d4ed8). Use a contrast checking tool. If any fail 4.5:1, darken the text or deepen the background.

### Awaiting Decision

8. **[DECISION] JSON-driven rendering** — See Check 16. Benefits and risks outlined. Awaiting approval to proceed or defer.
