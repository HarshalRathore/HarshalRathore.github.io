# Digital Footprint Audit — Harshal Rathore

**Audited:** 2026-08-22 · Method: curl + web_extract + GitHub API + web_search (+1 browser attempt, blocked by environment)

**Handle set verified:** GitHub `HarshalRathore` · X `@Harshalrathore_` (**SUSPENDED**) · Kaggle `harshalrathore` (bot-walled) · domain `dustyoncloud9.space` (Dokploy login, not a site) · LinkedIn `/in/harshal-rathore/` (live per index) vs `/in/harshal-rathore-3a4857200` (unverifiable, conflicting)

---

## 1. Old portfolio — https://harshalrathore.github.io/ — **LIVE (200)**

Static Hugo site, **Coder theme** (`hugo-coder`), dark mode with light/dark toggle, custom cursor script. Grad-school-era build (footer © 2019–2022; posts through July 2023). Runs the slug: `https://harshalrathore.github.io` is also his GitHub `blog` field.

**Structure:** Nav (About / Blog / Projects) → Home = avatar (`/images/46.png`), name heading, tagline *"Full Stack Developer · Open-Source Enthusiast · Part time Magician"*, 4 social icons (GitHub, X, Instagram, LinkedIn), footer "Powered by Hugo & Coder".

### Content inventory
- **About**: 2nd-year AI & Data Science student @ SATI (Samrat Ashok Technological Institute). Interests: AI, Deep Learning, open source. Skills: Python, C/C++, Bash, HTML/CSS, JavaScript. Hobbies: Linux ("I use Arch BTW"), late-night gaming, cooking. Learning: MERN, CloudNative (Docker/K8s), Competitive Programming. Contains a hidden/voice-note audio element ("wanna hear a secret?").
- **Blog — 3 posts** (all salvageable, none are dead links checked; dated):
  1. *Linked Lists Unleashed: Mastering the Art of Dynamic Data Structures* (2023-07-15)
  2. *Git for Beginners by Me* (2023-07-05)
  3. *Linux SHELL Guide* (2022-07-15)
- **Projects — 3 entries** (dated "January 1, 0001" — Hugo frontmatter bug, dates lost):
  1. NotsoSpotify — Spotify clone for static music (repo: `notsospotify`)
  2. Tic-Tac-Toe — Firebase backend (repo: `Tic-Tac-Toe`)
  3. Housing Price Prediction using ML — Kaggle dataset
- **Metadata**: RSS feed (`/index.xml`), OG/Twitter cards, Google Analytics, google-site-verification present.

### ⚠️ Red flags / salvage notes
- **Suspicious injected script** in index.html: `https://crosaffic.onrender.com/cdn/fetch-script?apiKey=e486f0e1-...` — an ad/tracker/malware-style injection (likely compromised theme or injected post-build). **Do NOT carry over; scrub any reused theme.**
- Old content heavily "student-era" (2nd-year student, 2019–2022) — **stale for a professional portfolio**; only the 3 blog posts + tagline voice are worth reuse.
- LinkedIn icon points to the **`-3a4857200` variant** (see §4 conflict).

### Salvage list (candidate carry-over)
1. Tagline *"Full Stack Developer · Open-Source Enthusiast · Part time Magician"* (tone, not literal).
2. Blog posts x3 (rewrite/polish; topics age well for dev-focused portfolio).
3. Portfolios per repo: `notsospotify`, `Tic-Tac-Toe`, housing-price ML — as case-study material.
4. Original avatar/branding assets (`/images/46.png`, `avatar_*`).
5. RSS feed pattern + GA/verification meta scaffolding.
6. Project pages' content (Hugo) as reference copy for new project writeups.

---

## 2. GitHub — https://github.com/HarshalRathore — **LIVE**

Name: **Harshal Rathore** · User ID `HarshalRathore` (created 2020-12-18) · location: India · company: "self"
- **Bio:** *"Transforming from an developer to markdown file manager."* (playful; recently updated profile README 2026-08-21)
- **Stats:** 44 public repos · 1 gist · 13 followers · 29 following · blog → harshalrathore.github.io (must be updated to new portfolio)
- **Achievements:** Pair Extraordinaire, Starstruck, Pull Shark, Quickdraw, YOLO → real PR/star activity behind the scenes, including work in org **WebCrisp**.
- **Contribution vibe:** bursty OSS tinkerer — active Aug 2026 (profile README + dotfiles updated within days of audit); feature work is TS-first (MCP tooling), Linux/dotfiles side projects, older Python/ML coursework repos from 2021–23 (PWskills DSM assignments, Trading_bots, TimeTable-Man, DSALGO). Star counts are low (max 17) → portfolio should sell *freshness + MCP niche*, not popularity.

### Top 8 repos by impressiveness (stars desc; also most recently active)
| # | Repo | ★ | Lang | One-liner |
|---|------|---|------|-----------|
| 1 | **harshal-mcp-proxy** | 17 | TypeScript | Shared MCP gateway w/ schema deferral + response shielding + HTTP daemon; replaces 12+ MCP servers w/ 6 tools (~99% token savings, ~2.7GB RAM); npm `harshal-mcp-proxy` |
| 2 | **code-intel-mcp** | 10 | TypeScript | Code-intelligence MCP server (ts-morph + ArangoDB): 20 tools — symbol search, call graphs, impact analysis, React trees; npm `code-intel-mcp` |
| 3 | **my-i3-config** | 2 | Shell | Dotfiles/config making his i3 setup work (Linux/ricing cred) |
| 4 | **dotfyles** | 1 | HTML | Personal Unix tool dotfiles — most recently active repo (2026-08-18) |
| 5 | **pi-spinner** | 1 | TypeScript | Smooth spinner with shimmering verbs for Pi (April-style fun project, 2026-05) |
| 6 | **Tic-Tac-Toe** | 1 | HTML | Tic-Tac-Toe with Firebase backend |
| 7 | **Blogging** | 0 | C# | Proof-of-knowledge ASP.NET project built in <24h |
| 8 | **wuzapi** | 0 | Go | Go repo (no description; updated 2026-01) — only Go code, worth spotlighting as breadth |

Others worth a footnote: `list-orphans-hook` (Arch pacman hook, Shell), `resume-projects-navigation`, `notsospotify`, `MachineLearning_Projects`, `PWskills_DSMcourse_Assignments`, `HarshalRathore.github.io` (portfolio source, HTML).

**Language breakdown (by repo count of 27 indexed):** TypeScript 3 · Shell 2 · HTML 2 · JavaScript 2 · Python 1 · + C#, Go, C++, SCSS, CSS, Jupyter (breadth over depth; TS is the flagship).

---

## 3. Domain — https://dustyoncloud9.space/ (and www.) — **LIVE, but NOT a website**

Resolves (200, ~0.7s). Serves a **Dokploy** instance — *"The Open Source alternative to Netlify, Vercel, Heroku"* — showing the **sign-in page** ("Enter your email and password… Login · Lost your password?"). Next.js-backed (title `Dokploy`).
→ It is his self-hosted **deployment dashboard** (PaaS) exposed publicly, not a personal site and not portfolio content. No public content behind login. Actionable: either lock it down or point it to the new portfolio; it should NOT be advertised as a "website". Search engines have it indexed with no description ("No information is available for this page").

---

## 4. LinkedIn — both variants — **BLOCKED to bots (HTTP 999) / 1 live per search index**

- `https://www.linkedin.com/in/harshal-rathore/` → curl 999 (LinkedIn bot-block). **Search-index evidence: LIVE** — `in.linkedin.com/in/harshal-rathore` titled *"HARSHAL RATHORE — Full-Stack & Android Developer … hands-on experience in Python, Django, REST API development … scalable, secure [APIs]"*.
- `https://www.linkedin.com/in/harshal-rathore-3a4857200/` → curl 999 (bot-block, single attempt, no retry). **Not independently confirmable** — this is the variant hardcoded in the old portfolio's LinkedIn icon.
- **CONFLICT:** old portfolio + likely legacy bios use `-3a4857200`; search index surfaces the clean `/in/harshal-rathore/`. Likely the user claimed the clean URL later (LinkedIn then redirects the old one), but needs **manual human check** (bot-blocked). Use `/in/harshal-rathore/` in the new portfolio.

---

## 5. Kaggle — https://www.kaggle.com/harshalrathore — **BLOCKED / NO DATA**

- Web + `/api/v1/users/harshalrathore` + `/datasets/list` all served **Google reCAPTCHA challenge pages** ("Checking your browser…").
- Browser attempt failed at harness level (Chrome remote-debugging permission prompt) — one attempt only, per instructions.
- `site:kaggle.com harshalrathore` → **0 search results** → profile not publicly indexed; **competitions / datasets / notebooks counts: unavailable**.
- Reuse: his housing-price-ML project references a Kaggle dataset; verify the Kaggle link in the old portfolio's project blurb during migration (may be dead if account went private).

---

## 6. X/Twitter — @Harshalrathore_ — **DEAD (ACCOUNT SUSPENDED)**

- `x.com/Harshalrathore_` / `twitter.com/harshalrathore_/` → 200 shell but payload = **"Account suspended"** page (`UserUnavailable`, `unavailable_reason: "Suspended"`).
- Old portfolio icon links here → **remove/link to something else or leave it out**. Do not surface a suspended handle on the new portfolio.

---

## Link health summary
| Target | Status |
|---|---|
| harshalrathore.github.io | ✅ LIVE (old portfolio — being replaced) |
| github.com/HarshalRathore | ✅ LIVE (active, Aug 2026) |
| dustyoncloud9.space | ⚠️ LIVE but = Dokploy login (deployment dashboard, not content) |
| linkedin.com/in/harshal-rathore/ | ⚠️ Bot-blocked; live per search index *(use this one)* |
| linkedin.com/in/harshal-rathore-3a4857200 | ⚠️ Bot-blocked; unverifiable — CONFLICTS with above |
| x.com/Harshalrathore_ | ❌ DEAD — account suspended |
| kaggle.com/harshalrathore | ⚠️ BLOCKED (reCAPTCHA, not indexed) — verify manually |
| Instagram harshal.rathore_ (old portfolio icon) | Not checked (out of scope) |

## Recommended portfolio positioning (evidence-based)
- Flagship projects: **harshal-mcp-proxy** & **code-intel-mcp** (only 2 repos with real traction; MCP/TypeScript niche, actively maintained).
- Differentiators: open-source contributions (WebCrisp org), Linux/dotfiles tinkering, Arch user, rapid proof-of-knowledge builds (24h ASP.NET), breadth (Go/C#/TS/Python/C++).
- Fix before launch: GitHub `blog` field, LinkedIn canonical URL, scrub old portfolio's injected script, don't link suspended X or Dokploy login, verify Kaggle.