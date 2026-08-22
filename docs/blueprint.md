# CAREER ARCHIPELAGO — Master Blueprint v1.0
**Personal developer portfolio of Harshal Rathore · Three.js · frontend-only · no budget**
*Status: DRAFT FOR FINAL SIGN-OFF · Grilling session complete 2026-08-22 · Zero code written by design*

Companion docs: `profile-dossier.md` · `webgl-inspiration-brief.md` · `digital-footprint.md` · `taste-board.md` · `mobile-perf-spec.md`

---

## 1. VISION

A single-page, scroll-driven cinematic WebGL portfolio: the visitor travels an archipelago of floating islands — each island a chapter of Harshal's career — while the world's light evolves from golden hour through dusk into starlit night. Contemplative, Breton-grade craft; award-tier polish; zero gimmick slop; fully mobile-responsive.

**Audiences (priority order):** recruiters/hiring managers · freelance clients · dev community peers.
**Success definition:** a stranger lingers >90 seconds, pokes Gravity Garden, remembers "the floating-island guy," and can find GitHub/email within one glance at any moment.
**Experiment dial:** 8/10 — bold, memorable, tactile; disciplined enough that content still reads.

---

## 2. NARRATIVE & STRUCTURE

Single continuous scroll journey. Scroll position = time-of-day + camera waypoint index.

| # | Island | Content | Light stage | Camera move |
|---|--------|---------|-------------|-------------|
| 1 | **Arrival Shore** | Name, title ("Full-Stack Engineer · Azure-certified"), scroll hint | Golden hour | Orbital arc intro |
| 2 | **Open Source Ridge** | Twin monuments: harshal-mcp-proxy (17★) + code-intel-mcp (10★) | Golden→dusk blend | Straight hop |
| 3 | **Monument Valley** | Repeato platform, TCS analytics dashboard (+25% retrieval), Lossy Compression (91.67%), Skin Zen (ResNet-101) | Dusk magic hour | Hop with lateral drift |
| 4 | **Outpost** | TCS role (Jan 2025–), B.Tech AI&DS '24, Azure cert | Deep dusk | Straight hop |
| 5 | **Hackathon Peaks** | SIH 2022 national finalist (Dell), Sprint Hacks 2.0 runner-up, Witty Hacks 4.0 win | Dusk→blue blend | Ascending hop |
| 6 | **Writing Grove** | 3 carried-over posts: Linked Lists, Git for Beginners, Linux SHELL Guide | Blue hour | Descending hop |
| 7 | **Lighthouse** | Contact CTA + socials + résumé PDF | Starlit night w/ first dawn glow | Orbital arc finale |

Project deep-dives = fullscreen overlay takeovers (DOM), never separate pages. **Coverage: all 6 projects** (harshal-mcp-proxy, code-intel-mcp, Repeato, TCS dashboard, Lossy Compression, Skin Zen) share one uniform overlay template. Visuals are typographic/stat-led (big numbers, metric callouts) — no product screenshots required. Writing Grove posts live at real routes `/writing/*` (light-polish carry-overs), deep-linked from the island's overlays.

## 3. INTERACTION MODEL

- **Backbone:** scroll-bound camera dolly between fixed waypoints; eased hops; orbital arcs at hero + finale only (Q15-c).
- **Toy:** **Gravity Garden** — Rapier physics playground scoped to Monument Valley's edge: ~20–30 grabbable debris bodies, throw/tumble, tap-and-hold on touch. Lazy-loads Rapier only when approached.
- **Ambience:** sky dome shader carrying day-night cycle; god-ray haze + dust motes; cursor-parallax tilt (very low amplitude); grain+vignette post pass (single combined pass).
- **Signature mascot:** **Dusty**, a wispy cloud-spirit drifting beside the camera (Q23). Reacts per section; naps during night palette; curious in Gravity Garden. Also favicon/404/brand thread.
- **Easter eggs:** hidden clickable crystals across islands (counter + chime + achievement toast) + ONE additional secret (Konami code = reversible night-palette override). Restraint (Q24).
- **Keyboard support:** prev/next-waypoint hop keys ship (required for a11y ≥90).
- **Preloader:** serif logotype + real-weighted progress % + whimsical status lines ("CONJURING GRAVITY…", "POLLENATING THE GRASS…" — Breton-inspired, our own copy). Honest loading; target <2.5 s critical path.
- **Sound (Q20):** muted by default, corner toggle. ~8 mono Ogg files ≤8 MB total: wind loop, birds, waterfall, campfire/night, crystal chime, achievement, UI swap/click. Layered ambience like Breton's 17-file set but leaner.

## 4. VISUAL LANGUAGE (locked from taste-board)

- **Art direction consequence of Zhangjiajie pick:** islands are VERTICAL — tall rocky spires crowned with forest canopies, layered mist bands, hanging vines. Roraima-style cliff mass below some islands.
- **Day-night shader palettes (taste-board §5):** Golden Hour A (#6FA4C9/#FFB36B/#F4DFB6 haze) → Dusk B (#3D4C8C/#B56E8F/#EF9B5E) → Blue Hour C (#0F1F42/#2B4E7E/#5E8CB4). Fog color = palette haze; ink text #2B2726→#0A1122 tracks stage.
- **Accent (single, constant):** ember amber `#E8A05C` — CTAs, Dusty's core glow, interactive highlights.
- **Post:** ACESFilmic tone mapping + film grain + vignette. **BLOOM: NONE** (Q19 — follow the award-winner).
- **Type pairing (LOCKED): Fraunces × General Sans.** Serif = display/H1-H2, grotesk = body/UI; monospace micro-labels (coordinates, section numbers) as texture.
- **Copy voice:** playful-but-grounded, first-person humble-sharp. OSS-forward positioning (Q13): "engineer who ships AI tooling AND full-stack depth." Hero headline locked verbatim: **"Full-Stack Engineer · Azure-certified"**. Location: **nowhere on site — résumé PDF only** (user override). Experience copy uses dates, never year-counts ("Since Jan 2025"). Languages listed: English only. Personal texture limited to one microline in the Lighthouse overlay.
- **UI chrome:** hairline HUD (Breton restraint) — top-left logotype, bottom-right sound toggle, bottom-left crystal counter, minimal section dots.

## 5. TECH STACK

Vite · React 18 · TypeScript strict · @react-three/fiber · drei · postprocessing · @react-three/rapier (lazy) · Tailwind (DOM overlay) · lenis-style smooth scroll bound to camera timeline · static deploy → GitHub Pages (replaces harshalrathore.github.io).

Architecture: one persistent WebGL canvas + DOM overlay layer (14islands progressive-enhancement doctrine). Sections = React components; 3D islands = lazy-mounted scene chunks keyed to scroll progress. State: zustand (quality tier, current waypoint, sound, crystals).

**Repo & shipping:** source repo **PUBLIC from day one, MIT licensed**. Deploy: static GitHub Pages replacing harshalrathore.github.io (old URLs die — accepted; Pages can't redirect). Analytics: **none at v1**.

**Perf cut-precedence (agreed):** if gates fail late, degrade decorations in order — orbital arcs → Dusty reactive behaviors → god-rays/dust motes → Gravity Garden body-count shrinks → garden off last. Content islands never degrade.

## 6. ASSET PLAN (zero-budget, quality-through-iteration)

| Need | Source | License |
|---|---|---|
| Rock spire base meshes | Quaternius low-poly nature packs / Poly Haven CC0 | CC0 |
| Trees/foliage/grass | Kenney nature kit + custom InstancedMesh cards | CC0 |
| Hero spire silhouette | Kitbash from CC0 rocks OR hand-modeled in Blender (free) | self-made |
| Dusty mascot | Hand-built: layered soft-particle sprites (no GLB needed) | self-made |
| Textures | Poly Haven CC0 / ambientCG | CC0 |
| Audio | freesound.org CC0 search + Kenney audio packs | CC0 |
| Fonts | Google Fonts OFL / Fontshare free-commercial | free |

Pipeline: DRACO-compress every GLB · KTX2/Basis ETC1S textures · instanced foliage (≤12k instances/island, ≤3 draw calls/island species) · atlas small props. Quality bar enforced by iteration loop against Breton screenshots, not money.

## 7. PERFORMANCE & MOBILE

Authoritative numbers live in `mobile-perf-spec.md`. Headlines:
- 4 tiers (Desktop High/Laptop/Mobile Std/Mobile Low) with adaptive DPR ladder 1.0→0.75→0.6→0.45 at sustained >22 ms.
- Initial payload ≤6 MB; shell ≤250 KB gz; site ≤30 MB; GLBs: hero ≤3.5 MB, others ≤1.8 MB.
- Portrait framing ×1.3 distance, FOV 55°; min-h-[100dvh] everywhere; safe-area insets on HUD.
- Grain+vignette survive all tiers; geometry/particles scale down instead.
- Gates: iPhone-class ≥45 FPS hero · budget Android ≥30 · TTI ≤4.5 s Fast 3G · heap growth ≤10%.

## 8. CONTENT MAP (source-tagged facts from dossier)

Links row (final): github.com/harshalrathore · linkedin.com/in/harshal-rathore/ · x.com/dusty_donkeyy *(ships only after user live-verifies; auto-drop if dead)* · mailto harshalrathore2014@gmail.com **+ click-to-copy button** (zero recruiter friction, accepted spam exposure).
**NEVER shown:** Kaggle link (dropped — unverifiable) · phone number (site-omitted; résumé PDF only) · dustyoncloud9.space (excluded from portfolio for now, user directive; its public lockdown is a separate action item) · suspended @Harshalrathore_ · old-site crosaffic injected script dies with the rebuild.

**Content truths (locked copy rules):**
- Repeato = **Harshal's own personal product, built solo** — owner/builder voice; never employment/client/TCS-engagement framing.
- Experience: **dates speak, no year-counts** — "Since Jan 2025" (freelance May–Jul 2023 may appear as its own dated entry).
- Education: **CGPA 8.0 · Samrat Ashok Technological Institute (S.A.T.I.), Vidisha** (conflicts resolved: CAL Institute = outdated name; 8.2 was mid-degree).
- No photos/avatar/human figure anywhere — Dusty + world carry identity.
- Résumé PDF: regenerated fresh from dossier during build phase (single-page hybrid; **phone + location live here only** — neither appears on the site).

## 9. ACCEPTANCE GATES (definition of done)

1. All 7 islands traversable by scroll on desktop Chrome + iPhone-class Safari emulation; both orientations.
2. Perf gates §7 pass on test matrix (measured via DevTools emulation — Fast 3G + CPU throttle — plus Lighthouse CI and stats-overlay accounting; real-device smoke test whenever hardware is accessible, logged but non-blocking).
3. Gravity Garden: grab/throw works mouse + touch; Rapier absent from initial bundle.
4. Day-night cycle visibly progresses golden→night across full scroll; ink text AA-legible at every stage.
5. Preloader shows honest weighted %; never stalls >5 s without visible change.
6. Sound: silent by default; toggle persists; no autoplay policy violations.
7. Crystals findable (≥5), counter + chime work; Konami secret works.
8. Lighthouse CTA + socials + PDF all live and correct (link audit re-run).
9. Lighthouse (tool) a11y ≥90, best-practices ≥95; reduced-motion query honored.
10. Old github.io replaced; no trace of crosaffic script.

## 10. OUT OF SCOPE (v1, parked deliberately)

Blog post UI redesign (posts render simple/clean for now) · custom domain · backend/contact form (mailto only) · WebGPU path · i18n · analytics (none at v1 — parked entirely, not just "beyond basic") · dustyoncloud9.space integration (excluded for now per user; revisit post-v1).

---

*End of blueprint. Every locked line traces to a user decision recorded in `decisions-addendum.md` (v1.1) or an [S]-tagged research fact. No launch date — acceptance gates define done.*
