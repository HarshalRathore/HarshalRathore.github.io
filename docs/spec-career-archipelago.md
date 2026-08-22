# SPEC — Career Archipelago: Three.js Developer Portfolio
*Canonical local copy · published to github.com/HarshalRathore/HarshalRathore.github.io · Source of truth: blueprint.md v1.1 + decisions-addendum.md*

## Problem Statement

Harshal's current portfolio (harshalrathore.github.io) is a stale student-era Hugo site carrying an injected third-party script, dead social links, and none of his current, genuinely impressive work — two starred MCP/AI-tooling repos, a solo-owned commerce platform, Azure certification, hackathon finals. Recruiters, freelance clients, and developer peers who search his name find a site that actively undersells him. He needs a single page that makes strangers stay, explore, and remember him — and he has no budget for premium anything.

## Solution

A single-page, scroll-driven cinematic WebGL portfolio built with React Three Fiber: the visitor travels an archipelago of seven floating islands — each island one chapter of his career — while the world's light evolves from golden hour through dusk into starlit night. Contemplative camera choreography (award-winner Jordan Breton's documented pattern), one hands-on physics toy, one brand mascot (Dusty, a cloud-spirit), film-grade post-processing without bloom, honest loading, optional ambient sound, hidden crystals, and a Konami secret. Fully responsive across four device quality tiers. Frontend-only; static hosting on GitHub Pages; repository public under MIT from day one.

## User Stories

1. As a recruiter, I want to grasp who Harshal is within five seconds of landing, so that I decide to keep reading instead of bouncing.
2. As a recruiter, I want a downloadable résumé PDF, so that I can file him in my hiring pipeline.
3. As a recruiter, I want one-click email contact (with copy-to-clipboard), so that reaching him costs me nothing.
4. As a recruiter, I want work experience stated with dates and never inflated year-counts, so that I can trust the seniority signal.
5. As a recruiter on a phone, I want the same journey my desktop colleagues see, so that device choice never hides information.
6. As a potential freelance client, I want shipped open-source projects presented with stars and concrete metrics up front, so that I can judge delivery capability instantly.
7. As a freelance client, I want every flagship project to open a consistent deep-dive (problem, stack, metrics, outcome), so that I can compare projects fairly.
8. As a developer peer, I want the site's source public and MIT-licensed, so that I can study how the experience was built.
9. As a developer peer, I want easter eggs and a physics playground worth discovering, so that exploration feels rewarded, not gimmicked.
10. As a mid-range phone visitor, I want quality automatically tuned to my device, so that the experience stays smooth without me touching settings.
11. As a low-end phone visitor, I want graceful degradation that keeps the film look while cutting geometry, so that the site never becomes a slideshow.
12. As a keyboard-only user, I want waypoint hop keys, so that I can traverse the whole journey without mouse or touch.
13. As a visitor with vestibular sensitivity, I want motion reduced when my OS requests it, so that the site doesn't make me ill.
14. As a sound-averse visitor, I want silence by default with a persistent mute-state toggle, so that audio never ambushes me twice.
15. As a curious visitor, I want the loader to show honest weighted progress with charming status lines, so that the wait feels authored, not broken.
16. As a returning visitor, I want my sound preference and crystal discoveries remembered, so that revisits feel personal.
17. As any visitor, I want body text legible at every time-of-day lighting stage, so that atmosphere never defeats content.
18. As an impatient visitor on slow 3G, I want the hero interactive within a few seconds, so that I don't abandon the tab.
19. As a reader, I want the three archived blog posts served at clean permanent routes, so that I can read and share them.
20. As a social-media referrer, I want every outbound link live and intentional, so that I never hit a suspended account or private dashboard.
21. As Harshal the maintainer, I want all site content sourced from one typed content module, so that updating a fact never means touching scene code.
22. As Harshal the maintainer, I want CI gates that fail loudly on regressions, so that quality survives future edits without my vigilance.
23. As Harshal the maintainer, I want zero analytics, so that my visitors are never tracked and my privacy posture is simple.

## Implementation Decisions

- Stack: Vite, React 18, TypeScript strict, @react-three/fiber, drei, postprocessing, Tailwind for DOM overlay; @react-three/rapier loaded lazily only near the physics toy; zustand for state.
- Architecture: one persistent WebGL canvas beneath a DOM overlay layer (progressive-enhancement doctrine). Seven scroll sections drive a single Journey Store whose pure functions map scroll progress to active waypoint, light-stage blend, and garden activation. Camera, sky, islands, mascot, HUD are renderers of that store.
- Test seam: the Journey Store is the single logical unit-test seam. All visual/perf qualities are verified through acceptance gates (stats overlay accounting, DevTools network/CPU emulation, Lighthouse CI), not component tests.
- Narrative structure: seven islands in fixed order — Arrival Shore (hero), Open Source Ridge (twin MCP monuments), Monument Valley (four flagship projects), Outpost (experience/education), Hackathon Peaks (three achievements), Writing Grove (three posts), Lighthouse (contact). Project deep-dives are fullscreen DOM overlays sharing one typographic/stat-led template; no product screenshots anywhere. Writing posts live at real routes under a /writing prefix, deep-linked from their island.
- Visual language: Zhangjiajie-derived vertical islands (rocky spires, forest crowns, layered mist); three-palette day-night shader cycle (Golden Hour → Dusk → Blue Hour, exact hexes in taste-board); single constant ember-amber accent (#E8A05C); ACES tone mapping with combined grain+vignette pass and NO bloom ever; Fraunces display serif × General Sans grotesk with monospace micro-labels.
- Copy rules: hero headline verbatim "Full-Stack Engineer · Azure-certified"; dates-not-year-counts; English-only languages; no photos/avatar/human figures (Dusty and the world carry identity); Repeato voiced as Harshal's solo personal product; education CGPA 8.0 at S.A.T.I. Vidisha; location and phone appear nowhere on the site — résumé PDF only.
- Links: GitHub, LinkedIn (/in/harshal-rathore/), email with click-to-copy always; X (@dusty_donkeyy) ships only after live verification; Kaggle dropped; dustyoncloud9.space and the suspended old X account never referenced.
- Interaction model: eased waypoint camera hops with orbital arcs at hero and finale; cursor-parallax tilt at very low amplitude; Gravity Garden physics toy (~20–30 bodies) scoped beside Monument Valley; ≥5 hidden crystals with counter/chime/toast plus one Konami-code reversible night-palette override; keyboard prev/next waypoint hopping; preloader shows real weighted asset progress with whimsical status lines.
- Sound: eight or fewer mono Ogg files, muted by default, corner toggle persisted in storage, full browser autoplay-policy compliance.
- Performance: four quality tiers preset by capability probe with a visible settings override; adaptive DPR ladder inside each tier; initial payload ≤6 MB with shell ≤250 KB gzip; hero GLB ≤3.5 MB, other islands ≤1.8 MB; KTX2-compressed textures; instanced foliage ≤12k instances/island; total site ≤30 MB; degradation precedence fixed (orbital arcs → Dusty behaviors → god-rays/dust → garden bodies → garden off; content islands never degrade).
- Asset sourcing: exclusively free/CC0 (Quaternius, Kenney nature kits, Poly Haven, ambientCG, freesound CC0) plus self-made Blender kitbash and hand-built particle-sprite Dusty; DRACO compression on every GLB.
- Repository: public from day one, MIT licensed, replaces the legacy Hugo content entirely (legacy URLs intentionally die; the legacy injected third-party script disappears with them). Analytics: none at v1. Deployment: static GitHub Pages via CI.

## Testing Decisions

- Good tests assert external behavior only — store outputs given inputs, rendered text/links/ARIA on overlays, observable FPS/draw-call/payload numbers — never internal implementation details.
- Unit level: Journey Store logic (scroll→waypoint/light/garden mapping, tier selection, crystal accumulation, reduced-motion flag propagation) tested as pure functions with a standard Vite-native runner; this is the repo's founding test pattern since no prior art exists.
- Live-app level (helper checks): overlay content correctness against the content module, /writing/* routes resolve with expected posts, sound toggle persists across reload, click-to-copy writes the right address, keyboard hops move waypoints.
- Gate level (already locked in mobile-perf-spec): DevTools Fast-3G/CPU-throttle emulation profiles for iPhone-class, mid and budget Snapdragon classes; Lighthouse CI with accessibility ≥90 and best-practices ≥95 thresholds; live stats-overlay accounting for draw calls, triangle and VRAM budgets; heap growth ≤10% across a full journey traversal; TTI ≤4.5 s on Fast 3G. Real-device smoke tests happen whenever hardware is accessible and are logged but non-blocking.
- The preloader must never stall beyond five seconds without visible progress change — asserted by scripted load profiling, not eyeballing.

## Out of Scope

Blog UI redesign beyond clean readability · custom domain · backend/contact form (mailto only) · WebGPU renderer path · internationalization · analytics of any kind at v1 · dustyoncloud9.space integration (parked; its server lockdown is a separate ops action) · water/cloud-mascot shader features beyond the specified ambience · any paid asset, service, or API · photos or human imagery of any kind.

## Further Notes

Companion documents carry the evidence chain: profile-dossier (every fact source-tagged), webgl-inspiration-brief (exemplar techniques + budgets), digital-footprint (link liveness audit), taste-board (Breton bundle inspection + palette/type derivation), mobile-perf-spec (authoritative tier numbers), decisions-addendum (all 25 grilling decisions + v1.1 user overrides). Quality bar: iterate against captured screenshots of the FWA-winning reference until parity of feel, not features. One open item gates final ship: live verification of the X handle.
