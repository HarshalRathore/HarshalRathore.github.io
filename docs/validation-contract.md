# Validation Contract — Career Archipelago
**Goal:** Ship the seven-island Three.js portfolio defined in blueprint v1.1, passing every acceptance gate.
**Covers:** Slices SCF · JRN · SKY · HERO · ISL · GDN · DUST · FX · PRE · SND · HUD · EGG · OVL · WRT · MOB · A11Y · SHP
**Generated before implementation of:** any production code. Ground truth alongside blueprint.md v1.1 + decisions-addendum.md.
**Checker vocabulary:** `scrutiny-critic` = verifiable without the live app (unit tests, static checks, build output inspection, bundle analysis). `helper` = requires the running app (browser interaction, measured sessions, rendered DOM).

---

## SCF: Scaffold & CI Foundation
**In scope:** Vite+React+TS+R3F skeleton deployed to Pages replacing legacy content; lint/type/test/Lighthouse CI; MIT; README.
**Out of scope:** any real scene content.

[SCF-C-001] Fresh clone → install → build succeeds with zero TypeScript errors
  When: `npm ci && npm run build` runs in CI
  Expect: exit code 0; deploy artifact produced
  Checker: scrutiny-critic
[SCF-C-002] License file is MIT and README names the project
  When: repo root inspected
  Expect: LICENSE contains MIT grant; README non-empty
  Checker: scrutiny-critic
[SCF-H-001] Site serves over HTTPS from the Pages URL
  When: GET the Pages URL
  Expect: HTTP 200, HTML shell renders, no legacy Hugo content or injected scripts present
  Checker: helper
[SCF-E-001] Legacy injected script absent
  When: fetched HTML/JS searched for the known injected domain string
  Expect: zero occurrences
  Checker: scrutiny-critic

## JRN: Journey Spine (store, scroll, camera, keyboard)
**In scope:** Journey Store pure functions; scroll↔waypoint mapping; camera hops; keyboard prev/next; reduced-motion flag.
**Out of scope:** island visuals themselves.

[JRN-C-001] Scroll fraction maps monotonically to waypoint index 1→7
  When: store fed scrollProgress values 0, .16, .33, .5, .66, .83, 1
  Expect: activeWaypoint equals 1,2,3,4,5,6,7 respectively; never regresses for increasing input
  Checker: scrutiny-critic
[JRN-C-002] Light stage blend interpolates golden→dusk→blue across journey
  When: store queried at progress 0 / .5 / 1
  Expect: returned blend is pure-A, A-B mix, pure-C respectively; values continuous between samples
  Checker: scrutiny-critic
[JRN-C-003] Reduced-motion input zeroes drift/tilt factors
  When: prefers-reduced-motion true
  Expect: parallax and drift outputs are exactly 0 regardless of pointer/scroll deltas
  Checker: scrutiny-critic
[JRN-H-001] Full keyboard traversal reaches every island
  When: Tab to canvas, press Next repeatedly through 6 presses
  Expect: each press animates camera to next waypoint; 7 distinct sections reachable; focus visible
  Checker: helper
[JRN-E-001] Rapid scroll thrash cannot strand camera between waypoints
  When: scroll jumped end↔start 10× fast
  Expect: camera settles at correct waypoint within easing window; console error-free
  Checker: helper

## SKY: Day-Night Cycle
**In scope:** sky dome shader palettes A/B/C, fog/exposure tracking, ink color legibility swap.
[SKY-C-001] Palette endpoints exact
  When: shader uniforms sampled at stage 0 / .5 / 1
  Expect: hex-equivalent values match taste-board Golden/Dusk/Blue sets within ΔE tolerance 2
  Checker: scrutiny-critic
[SKY-H-001] Ink text AA-legible at every stage
  When: journey scrolled through all 7 stops, screenshot sampled
  Expect: computed contrast of body text vs backdrop ≥4.5:1 at each stop
  Checker: helper

## HERO: Arrival Shore island
**In scope:** hero spire asset, instanced foliage, orbital intro arc, title lockup.
[HERO-C-001] Hero GLB within size budget
  When: build artifact inspected
  Expect: hero model ≤3.5 MB, DRACO-compressed
  Checker: scrutiny-critic
[HERO-H-001] Intro arc completes and title reads
  When: fresh load, wait for intro
  Expect: name + "Full-Stack Engineer · Azure-certified" visible; camera settles without manual input
  Checker: helper

## ISL: Islands 2–7 content progression
**In scope:** remaining six islands matching §2 roster order, content assignment correct.
[ISL-C-001] Roster order preserved in scene graph
  When: waypoint metadata inspected
  Expect: sequence equals Shore, OSS Ridge, Monument Valley, Outpost, Hackathon Peaks, Writing Grove, Lighthouse
  Checker: scrutiny-critic
[ISL-C-002] Per-island budgets hold
  When: artifacts inspected
  Expect: each non-hero island ≤1.8 MB; foliage instanced ≤12k instances/island
  Checker: scrutiny-critic
[ISL-H-001] Each island displays its correct chapter content
  When: visiting each waypoint
  Expect: headings/facts match content module entries for that island (spot-check all 7)
  Checker: helper

## GDN: Gravity Garden toy
**In scope:** lazy Rapier chunk, grab/throw, touch tap-and-hold, body-count scaling by tier.
[GDN-C-001] Physics engine absent from initial bundle
  When: initial JS chunks inspected
  Expect: no rapier module in entry/critical chunks; loads only on garden approach
  Checker: scrutiny-critic
[GDN-H-001] Mouse grab-and-throw works
  When: drag a debris body and release
  Expect: body follows pointer while held, tumbles ballistically on release, collides with others
  Checker: helper
[GDN-H-002] Touch equivalent works
  When: long-press drag on emulated touch device
  Expect: same behavior without page-scroll hijack
  Checker: helper
[GDN-E-001] Low tier reduces body count
  When: Mobile-Low tier forced
  Expect: active bodies ≤ configured low-tier cap; garden still functional
  Checker: helper

## DUST: Dusty mascot
[DUST-C-001] No photo/human imagery anywhere — Dusty is abstract particles
  When: asset manifest reviewed
  Expect: zero photographic assets; mascot built from sprite/particle system
  Checker: scrutiny-critic
[DUST-H-001] Section reactions fire
  When: journey traversed
  Expect: observable behavior change at ≥3 distinct sections incl. night nap and garden curiosity
  Checker: helper

## FX: Ambience & post
[FX-C-001] Post stack composition exact
  When: composer passes listed at runtime
  Expect: exactly ACES tonemapping + combined grain/vignette; zero bloom pass on ALL tiers
  Checker: scrutiny-critic
[FX-H-001] Grain/vignette survive Mobile-Low
  When: lowest tier forced, screenshot inspected
  Expect: grain texture visibly present
  Checker: helper

## PRE: Preloader
[PRE-C-001] Progress is real, weighted, monotonic
  When: instrumented cold load
  Expect: displayed % tracks actual weighted asset bytes; never regresses; reaches 100 only at completion
  Checker: scrutiny-critic
[PRE-H-001] Stall guard
  When: throttled Fast-3G load
  Expect: visible status/percent change at least every 5 s until done; whimsical line shown
  Checker: helper

## SND: Sound design
[SND-C-001] Audio budget respected
  When: assets audited
  Expect: ≤8 files, mono Ogg, total ≤8 MB, all license-clean CC0 with attribution sheet
  Checker: scrutiny-critic
[SND-H-001] Silent by default; toggle persists
  When: first visit loads → toggle on → reload
  Expect: zero audio before opt-in; state survives reload; no console autoplay violations
  Checker: helper

## HUD: Chrome & CTAs
[HUD-H-001] Persistent nav affordances present at every waypoint
  When: journey traversed
  Expect: logotype, section dots, sound toggle, crystal counter visible throughout; safe-area padded on notched emulation
  Checker: helper
[HUD-H-002] Click-to-copy email
  When: copy button clicked
  Expect: clipboard contains harshalrathore2014@gmail.com with confirmation feedback
  Checker: helper

## EGG: Crystals + Konami
[EGG-C-001] Exactly one extra secret implemented
  When: codebase searched for hidden interactions beyond crystals
  Expect: Konami night-override found and reversible; no other undocumented secrets
  Checker: scrutiny-critic
[EGG-H-001] Crystal economy works
  When: ≥5 crystals clicked across islands
  Expect: count increments, chime plays (if enabled), achievement toast fires; persists on reload
  Checker: helper

## OVL: Project overlays
[OVL-C-001] Uniform template, zero screenshots
  When: six overlay definitions reviewed
  Expect: identical schema fields (problem/stack/metrics/outcome/link); image references = none
  Checker: scrutiny-critic
[OVL-H-001] All six open/close cleanly with correct facts
  When: each monument activated
  Expect: overlay opens with matching project data; ESC/back closes; background scroll locks
  Checker: helper
[OVL-E-001] Repeato voice rule upheld
  When: Repeato overlay copy reviewed
  Expect: ownership phrasing ("built/built solo/my product"), no employment/client/TCS framing
  Checker: scrutiny-critic

## WRT: Writing routes
[WRT-H-001] Three legacy posts live at clean routes
  When: /writing/* URLs fetched
  Expect: Linked Lists, Git for Beginners, SHELL Guide render fully readable; deep-link from Grove works
  Checker: helper

## MOB: Mobile & performance hardening
[MOB-C-001] Payload ceilings enforced
  When: production build analyzed
  Expect: initial payload ≤6 MB; shell gzip ≤250 KB; total dist ≤30 MB
  Checker: scrutiny-critic
[MOB-C-002] Tier presets + DPR ladder implemented per spec
  When: store unit-tested with probe inputs
  Expect: 4 tiers selectable; DPR steps 1.0→0.75→0.6→0.45 on sustained >22 ms; recovery only after 5 s stable
  Checker: scrutiny-critic
[MOB-H-001] Emulated device gates pass
  When: iPhone-class + SD7xx + SD6xx emulation profiles run full journey
  Expect: ≥45/≥40/≥30 FPS respective heroes; draw calls within tier caps; no heap growth >10%
  Checker: helper
[MOB-E-001] Portrait reframing
  When: portrait viewport forced
  Expect: ×1.3 distance multiplier applied; islands framed fully; FOV 55°
  Checker: helper

## A11Y: Accessibility
[A11Y-C-001] Reduced-motion media query honored globally
[A11Y-H-001] Lighthouse accessibility ≥90, best-practices ≥95 on shipped URL
  When: Lighthouse CI run
  Expect: thresholds met
  Checker: helper
[A11Y-H-002] Focus management across overlays
  When: overlay opened/closed via keyboard
  Expect: focus trapped while open, returns to trigger on close
  Checker: helper

## SHP: Final ship gate
[SHP-C-001] Link audit re-run clean
  When: audit script executes
  Expect: every outbound link resolves or is intentionally absent per decisions-addendum (no Kaggle, no dusty domain, no suspended X)
  Checker: scrutiny-critic
[SHP-H-001] Résumé PDF current and linked
  When: Lighthouse CTA clicked
  Expect: PDF downloads, matches dossier-resolved facts (CGPA 8.0, SATI, dates-not-counts)
  Checker: helper
[SHP-E-001] Conditional X slot behaves
  Given: X verdict unresolved at build time
  When: social row rendered
  Expect: X link omitted unless user-verified flag set — never renders a dead/unverified link
  Checker: scrutiny-critic

---

## Gaps That Need Resolution
- [GAP-001] X @dusty_donkeyy live-verification pending (user homework). Contract assumes conditional inclusion; SHP-E-001 enforces safety either way.
- [GAP-002] No physical iOS/Android hardware available in-session; gates rely on DevTools emulation per LOCKED protocol. Accepted risk, revisit when hardware accessible.
- [GAP-003] Exact whimsical loader status lines are copywritten during build; contract requires existence + charm bar, not verbatim strings.

## Contract Summary
Total assertions: 38 · Critic: 17 · Helper: 19 · Edge: 6 (some dual-tagged) · Slices: 17 · Unresolved gaps: 3
