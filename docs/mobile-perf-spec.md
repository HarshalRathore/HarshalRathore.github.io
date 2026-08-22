# Career Archipelago — Mobile Responsiveness + WebGL Performance Specification

*Definitive technical spec for the Harshal Rathore portfolio. Companion to `webgl-inspiration-brief.md` (research: budgets drawn from Bruno Simon / Lusion / Weisdevice / Breton case studies) and `taste-board.md` (Breton bundle inspection).*

**Status legend — every number is tagged:**
- **[S]** = sourced directly from research (`webgl-inspiration-brief.md` §4 budgets, `taste-board.md` §1.2 bundle facts, documented case-study numbers).
- **[P]** = proposed by this spec (derived from the sourced bands, to be validated in the build; if a [P] target cannot be met, the build must report back rather than silently exceed it).

**Scope note:** Vite + React + React Three Fiber + drei + @react-three/postprocessing, static GitHub Pages deploy, single-page scroll journey, floating-island dioramas (DRACO GLB + InstancedMesh foliage + KTX2 textures), waypoint camera hops (orbital arcs for hero + contact), scroll-driven day/night (golden hour → dusk → blue hour, taste-board §5), sky dome shader + god-ray haze + dust motes, film grain + vignette post stack, Gravity Garden physics toy (Rapier, ~20–30 bodies), cursor-parallax tilt, serif preloader counter ("0% Initializing").

**Bloom decision (LOCKED — Variant A only): no bloom.** Breton's shipped bundle — the direct reference — runs ACESFilmic tonemapping + grain + vignette **with no bloom pass** [S, taste-board §1.2]. Cheapest post stack, zero mobile risk, and the "filmic grade over flash" restraint IS the brand [S, taste-board §1.3]. All tiers ship this variant; the former Variant B (desktop-only UnrealBloomPass) is **retired, not a build switch** — do not implement or spec it.

---

## 1. Quality Tiers

Four tiers, auto-selected at startup from capability probe; user can override in a small settings menu (never hidden). Tier detection is a **preset, not live auto-scaling** — the pattern Bruno documents [S §4.4]. Live-scaling only happens **within** a tier via the DPR ladder (§1.6).

| Parameter | Desktop High | Laptop | Mobile Standard | Mobile Low |
|---|---|---|---|---|
| **Device class** | Discrete/desktop GPU, `deviceMemory ≥ 8` [P], `(pointer: fine)` [P], `hardwareConcurrency ≥ 8` [P] | Integrated GPU laptop (Iris/UHD-class), `deviceMemory 4–8` [P], or touch-primary with viewport ≥ 1024 CSS px [P] | Touch-primary phone, `deviceMemory ≥ 4` [P], Apple A13+/Snapdragon 7xx-class+ [S — build-to profile is Snapdragon 7xx-era] | Touch-primary budget phone: `deviceMemory ≤ 2` [P] OR `hardwareConcurrency ≤ 4` [P] OR A12/Snapdragon 6xx-or-older [P]; also forced by `Save-Data` [P] |
| **DPR cap** | `min(dpr, 2)` [S], render scale 1.0 | `min(dpr, 2)` [S] as base, ladder floor descends | `min(dpr, 1.75)` [S — "consider 1.5–1.75 on mobile"] | `min(dpr, 1.5)` [S band] |
| **Target draw calls / frame** | ≤ 150 [S — "≤ 150 on desktop mid"] | ≤ 120 [P — between sourced desktop and mobile bands] | ≤ 80 [P — inside sourced 60–100 mobile band] | ≤ 60 [S — mobile band floor] |
| **Triangle budget, total loaded** | ≤ 600k [P] | ≤ 450k [P] | ≤ 300k [S — "≤ 300–500k tris mobile"] | ≤ 180k [P] |
| **Triangle budget, visible** | ≤ 400k [P] | ≤ 300k [P] | ≤ 200k [P] | ≤ 120k [P] |
| **Per-object detail** | Hero 10–60k [S]; props 0.5–8k [S] | same band [S] | hero ≤ 25k, props ≤ 4k [P — tighten within sourced band] | hero ≤ 12k, props ≤ 2k [P] |
| **Texture memory (VRAM)** | ≤ 150 MB [P — inside sourced 100–200 MB desktop band] | ≤ 100 MB [S — desktop band floor] | ≤ 48 MB [P — inside sourced 32–64 MB mobile band] | ≤ 24 MB target, 32 MB hard cap [P target / S band floor] |
| **Particle budget (all systems)** | ≤ 4,500 [P] | ≤ 3,000 [P] | ≤ 1,400 [P] | ≤ 700 [P] |
| **Points systems** | ≤ 2 per scene [P — "1–2 Points systems instead of 50 emitters" [S-ish]] | ≤ 2 [P] | ≤ 2 [P] | ≤ 1 (merge dust+god-ray) [P] |
| **Post-FX stack** | ACES [S] + grain + vignette (combined pass @ 0.5× res) [task; P for res] + bloom (Variant B only, @ 0.5×) [S] + optional SMAA [P] | Same, no SMAA [P] | ACES + **single combined grain+vignette pass at render resolution** (no bloom) [S: "disable below quality tier 2"] | ACES + single combined pass; grain tile 256 px, vignette only if perf allows [P] |
| **Cloud density multiplier** | 1.0 [P] | 0.85 [P] | 0.6 [P] | 0.35 [P] |
| **Dust-mote density multiplier** | 1.0 [P] | 0.75 [P] | 0.5 [P] | 0.25 [P] |
| **Foliage density multiplier** | 1.0 [P] | 0.85 [P] | 0.6 [P] | 0.4 [P] |
| **Shadow** | 1 casting light [S: "1 on mobile, 2 on desktop"]; 2048 map [P] | 1 light, 1024 map [P] | 1 light, 512 map [P] | 0 real shadows — baked AO + blob shadows only [S: "fake the rest"] |
| **FSAA** | `antialias:false`, rely on res + grain; SMAA optional [S: "FSAA off on mobile" + P for desktop] | `antialias:false` [S] | `antialias:false` [S] | `antialias:false` [S] |

**Index budget:** all geometries use 16-bit indices unless a mesh truly exceeds 65,535 verts [S]. Morph targets ≤ 3–4 active [S].

### 1.6 Adaptive DPR downscale ladder (applies within every tier)

Implemented as a render-scale ladder inside the already-capped DPR (cap × scale). Frame-time monitor: rolling average of last 120 rAF frames (~2 s) [P].

| Step | Render scale (× DPR cap) | Trigger |
|---|---|---|
| 4 | 1.0 | default [S ladder: "1.0 → 0.75 → 0.6 → 0.45"] |
| 3 | 0.75 | sustained > 22 ms avg frame time (~< 45 FPS) for **1.0 s** [S: "if > 22 ms for ~1 s, step down"] |
| 2 | 0.6 | still > 22 ms sustained [S] |
| 1 | 0.45 | still > 22 ms sustained [S] — hard floor; never below [P] |

- **Step up** only after **5.0 s** of sustained frame time ≤ 18 ms (≥ ~55 FPS) [S: "re-evaluate up only after ~5 s stable" + P for the 18 ms / 55 FPS threshold]. Hysteresis prevents oscillation [P].
- When ladder is at step 1 on Mobile Low, additionally drop particle density to 0.5× tier budget [P].
- Ladder resets on `resize` / `devicePixelRatio` change; DPR itself never re-queried mid-session except on zoom [P].
- **Pause loop when invisible:** `visibilitychange` (tab hide → cancel rAF + suspend audio [S]) and `IntersectionObserver` on the canvas (offscreen → stop rendering) [S — Weisdevice/Bruno pattern]. Resume restores previous ladder step — no re-measure warm-up [P].
- Raycasting throttled to **30 FPS**, `firstHitOnly` [S — Weisdevice].

---

## 2. Asset Pipeline Budgets

### 2.1 GLB (DRACO, quantization-heavy) [S — pipeline choice]

Pipeline: Blender export → glTF with DRACO (quantization) → KTX2 external textures → `meshopt`/manual merge. Bake AO + normals into the base-color texture ["baked lighting replaces runtime shadow maps — the cheapest expensive look" S]; **no runtime lightmaps needed given 1-light policy (§1) [P].**

| Asset | Cap (DRACO + gz) | Tier notes |
|---|---|---|
| Hero island GLB | ≤ 3.5 MB [P — inside sourced "3–8 MB per hero model" band; keep low since hero is critical path] | same file all tiers [P] |
| Other island GLBs (4 × ~) | ≤ 1.8 MB each [P] | same file all tiers [P] |
| Foliage species GLBs (shared, ~6) | ≤ 250 KB each [P] | shared across islands [P] |
| Physics toy bodies (Gravity Garden) | ≤ 400 KB [P] | primitives only ["keep primitive colliders" S-ish] |
| **Total GLB budget** | **≤ 12 MB** [P — under the sourced "≤ 20 MB worst-case total scene" ceiling] | |

Per-island merge rule: merge all static geometry into **1–3 meshes per island, grouped by material** [S: "merge geometries per material"]; islands built in Blender as one export per island [P]. Palette/shared-material trick (Bruno's UV-indexed palette texture) where islands share material identity [S].

### 2.2 Textures — KTX2 / Basis

- Format: **KTX2 all assets** [S]. **ETC1S** for every asset on every tier [S: "ETC1S for mobile compat"]; **UASTC** (zstd-supercompressed) optional quality set shipped **only for the hero island** and fetched at runtime **only on Desktop High + Laptop**, post-first-interaction [P]; ETC1S is the single-shipped default [P]. (One default variant keeps the static GitHub Pages deploy simple; the UASTC hero set is a progressive enhancement, not a second build.)
- All textures **power-of-two**, mipmaps generated, `LinearMipmapLinearFilter` [S]. Albedo in sRGB; data maps (AO/R/M) linear [P — standard rendering practice].
- **No PNG/JPG in the 3D path** [S]. Render-target textures (baked previews) 1:1 with their canvas [S].
- 2048² KTX2/BC7 ≈ 5–8 MB [S] — use as sanity check when estimating VRAM.

**Max resolutions (per tier):**

| Asset | Desktop High | Laptop | Mobile Std | Mobile Low |
|---|---|---|---|---|
| Hero island base color (baked AO+N) | 2048 [P] | 2048 [P] | 1024 [P] | 1024 [P] |
| Other island base color | 1024 [P] | 1024 [P] | 1024 [P] | 512 [P] |
| Foliage atlas | 1024 [P] | 1024 [P] | 1024 [P] | 512 [P] |
| Rocks / props / physics bodies | 512 [P] | 512 [P] | 512 [P] | 256 [P] |
| Sky dome (procedural gradient) | 0–256 [P] | 0 [P] | 0 [P] | 0 [P] |
| Grain tile (POT, noise only) | 512 [P] | 512 [P] | 512 [P] | 256 [P] |

**Atlas strategy:**
- **One shared foliage atlas** (1024², 8×8 region grid → 64 regions, ~ up to 6 species × up to 8 variation regions each) [P]. All trees/grass/herbs sample this one texture → one material → merged/instanced draws stay on one material [S-compatible].
- Island textures kept **per-island** (not mega-atlased) so islands can be streamed independently (§3) [P]. Total unique KTX2 assets ≤ ~35 [P].
- Runtime color variation via **palette-texture / UV-indexed color** technique, not extra materials [S — Bruno].

**VRAM accounting check when building:** sum (W×H×4 bytes ≈ ETC1S ~0.5–1 bpp) must satisfy §1 per-tier caps; four 1024² ETC1S textures ≈ ~2–4 MB [P derived from S "2048² ≈ 5–8 MB"].

### 2.3 Foliage instancing rules

- One `InstancedMesh` per species; all foliage in ≤ 3 instanced draw calls per island [P]. Instancing: 10k–100k instances ≈ 1 draw call [S] — we stay an order of magnitude under.
- Grass blade = 3-cross-plane, ≤ 6 tris [P]. Foliage shader uses a wind uniform (scroll-driven time), no per-instance animation state [P].

| Rule | Cap |
|---|---|
| Instances per species | grass ≤ 8,000 · trees ≤ 300 · bushes/herbs ≤ 2,000 · flowers ≤ 1,500 [P] |
| **Total instances per island** | **≤ 12,000** [P] (hero island may reach this; others ≤ 6,000 [P]) |
| Species per island | ≤ 6 [P] |
| Instanced draw calls per island | ≤ 3 [P] |
| Density applied | §1 foliage multiplier — instance counts *computed* at init from tier; never spawned-then-hidden [P] |

### 2.4 Audio (8 files, reduced from Breton's 17 [S — taste-board §1.2 lists 17 files])

8-file lineup [task]: `wind-loop`, `birds-loop`, `water-loop`, `campfire-loop`, `dusk-ambience`, `night-ambience`, `transition-sfx`, `interact-sfx` (one file each; names illustrative) [P]. AudioContext-driven (no Howler — matches Breton's bundle [S]), init on first user gesture (autoplay policy [S]), pause on `visibilitychange` [S], mandatory mute toggle [S-ish], WebAudio `PannerNode` spatialization [P].

| Rule | Value |
|---|---|
| Ambient loop duration | 8–12 s seamless loop [P] |
| Per-file cap | loops ≤ 2 MB; SFX ≤ 150 KB [P] |
| Format | Ogg Vorbis, 44.1 kHz **mono**, ~96–112 kbps [P] |
| **Total audio budget** | **≤ 8 MB** [P]; target ≤ 6 MB [P] |
| Mobile Standard | all 8 files, but dusk/night ambient = lower priority in queue [P] |
| Mobile Low | **3 core loops only** (wind, water, birds) + interact SFX; zero other audio [P] |

---

## 3. Loading Strategy

### 3.1 Preloader — progress tied to real asset loads

Serif counter "0% Initializing" [task] driven by **weighted real progress** of fetched/decoded assets (never fake tween to 100) [P]:

| Stage | Weight | Real signal |
|---|---|---|
| Document + shell JS evaluated | 10% [P] | `DOMContentLoaded` + first chunk executed |
| Fonts (2 families, woff2 subset) | 5% [P] | `document.fonts.ready` |
| **Hero island GLB (DRACO decode)** | 30% [P] | loader `progress` events + decode completion |
| Hero island KTX2 textures (transcoder-ready) | 25% [P] | texture `onLoad` ×N |
| Core audio (wind, water, birds) | 10% [P] | decodecomplete |
| Sky/cloud/god-ray shader warm + first rendered frame | 20% [P] | first `requestAnimationFrame` with scene mounted |

- "0% Initializing" renders immediately (≤ first paint); counter last-updates at 100% exactly when the first frame with the hero island visible commits [P].
- **Stall watchdogs (locked): visible-progress watchdog at 5 s** — if weighted % hasn't advanced, surface a status change/animation beat; **hard "Enter anyway" affordance at 12 s** fades the preloader and streams the hero in place [P] — 14islands doctrine: content is never held hostage by WebGL [S].
- Hero island assets start fetching **in parallel with the shell** (`<link rel="preload">` hints / early fetch) [P].

### 3.2 Critical-path ordering

1. Shell JS (code-split 3D) → fonts → **hero island GLB + hero KTX2 (ETC1S)** → scene boot → hero visible [P].
2. Contact island = second priority (it's the goal of the journey; ~1 viewport preload) [P].
3. Every other island lazy-loaded via `import()` chunk + asset prefetch triggered by `IntersectionObserver` when its section is **2 viewport-heights away** [P; render-pause pattern S]; prefetch during idle via `requestIdleCallback` when within viewport budget [S-ish].
4. Rapier WASM (~0.7 MB gz [P]) + Gravity Garden chunk load **only when the garden section is 1 viewport-heigh away** [P].
5. Day/night palettes (taste-board §5) are shader uniforms — no asset cost [P].
6. Render loop starts cold for hero (first viewport is the heavy one — "start cold" anti-pattern avoided by preloading hero GLB during idle before interaction on mobile [S]).

### 3.3 Payload targets (static GitHub Pages)

| Metric | Target |
|---|---|
| Shell JS (first chunk: React + R3F + drei + postprocessing) | ≤ 250 KB gz [P — inside sourced "300–500 KB gz" shell band; lower because remainder is lazy] |
| **Total JS (all chunks incl. Rapier)** | **≤ 450 KB gz** [S band 300–500 KB gz] |
| **Initial critical payload (shell + fonts + hero GLB + hero KTX2 + core audio)** | **≤ 6 MB** [P] — hard target §6 gate |
| First-paint (preloader "0%") | < 1.0 s on simulated Fast 3G [P] |
| **Total site (JS + GLB + KTX2 + audio + fonts)** | **≤ 30 MB** [P] — under sourced "≤ 20 MB worst-case scene" for 3D alone, plus media; only ~⅓ downloads on first visit [P] |
| Compression | Brotli `.br` + gzip `.gz` precompressed at build, served with hashed immutable filenames [P; br/gz advice S] |
| GitHub Pages | 1 GB soft limit — site fits with 30× headroom [P] |

---

## 4. Interaction Adaptation

### 4.1 Pointer vs touch mapping

| Intent | Pointer (fine) | Touch |
|---|---|---|
| Camera hop trigger | click / scroll-past threshold [P] | tap / scroll — same thresholds [P] |
| Orbital arc scrub (hero, contact) | drag (pointer) [P] | one-finger drag, same lerp+damping [S-ish — Breton's "Touch & move to look around"] |
| Prop hover feedback | raycast @ 30 FPS [S], hover state [P] | no hover — tap shows same state as hover [P] |
| Gravity Garden | pointer-drag on body → fling with drag velocity [P] | **tap-and-hold ≥ 300 ms** = grip a body; hold+drag to aim; release = fling with throw velocity [P]; plus a "Reset" tap target [P] |
| Cursor-parallax tilt | active, amplitude 1.0, throttled to raycast tick [P] | touch-parallax from finger position, amplitude 0.5×; **disabled entirely on Mobile Low** [task] |
| Raycast | 30 FPS [S], `firstHitOnly` [S] | same; skip entirely when no interactive prop under finger [P] |

Physics body caps by tier (Rapier, primitives): Desktop High 30 · Laptop 30 · Mobile Standard 24 · Mobile Low 16 [P — within "≤ a few hundred bodies on mobile" sourced ceiling; task scene is 20–30].

### 4.2 Reduced-motion (`prefers-reduced-motion: reduce`)

- Camera hops become **instant snap cuts or 300 ms crossfades** — no orbital arcs [P].
- Day/night scroll timeline freezes at golden hour palette (taste-board Palette A) [P]; **no god-ray shimmer, no dust motion, no cloud advection, no water ripple** — static shader state [P].
- Cursor parallax off; scroll-drift easing linearized [P].
- DPR ladder still active (frame rate is an accessibility concern too) [P].
- Content/scroll/UI fully functional [P].

### 4.3 Reduced data (`Save-Data` header / `navigator.connection.saveData`)

- Force Mobile Low profile [P].
- **Skip all audio** (no fetch, no decode) [P].
- Never fetch the UASTC hero set; ETC1S-only [P].
- Non-hero islands load only when within 1 viewport [P].
- Informational "Data saver mode" label optional [P].

### 4.4 General

- Render pause offscreen/tab-hidden [S]; audio pause [S]; resume without re-measuring ladder (§1.6) [P].
- WebGL2 unavailable / GPU blocklisted → graceful 2D/CSS poster scene with real HTML content (14islands progressive enhancement [S]); never a blank screen [P].

---

## 5. Responsive Layout Rules

### 5.1 DOM/UI overlay

- One persistent full-viewport WebGL canvas behind **real HTML/CSS content** — 14islands doctrine [S]: content is DOM, WebGL enhances; SEO + accessibility preserved.
- Overlay root `pointer-events:none`; interactive widgets (nav dots, captions, buttons, mute) opt back in [P]. Never overlay the center of a waypoint composition on mobile [P].
- **Height discipline: every full-viewport section uses `min-h-[100dvh]` — never `h-screen`** [task]. Fallback stack: `min-height:100vh` (legacy) then `min-height:100dvh` (dynamic URL-bar-safe) [P]. Scroll-driven camera timeline must compute progress from actual `scrollHeight`/`scrollY`, not a fixed viewport constant [P].
- Breakpoints (Tailwind): `base < 640` · `sm 640` · `md 768` · `lg 1024` · `xl 1280` [P]. Behavior:
  - `< 640`: nav dots cluster → bottom-right, smaller hit targets ≥ 44×44 px [P]; section captions below the island (title/copy remain fully readable); HUD (progress %, mute) collapses to icon-only [P].
  - `640–1024 (tablet portrait)`: captions overlap bottom 20% of viewport, gradient scrim behind text [P].
  - `≥ 1024`: captions side-docked, orbital arcs full sweep [P].
- Preloader counter stays full-viewport at all sizes [P]. Serif scale: `clamp(2.5rem, 8vw, 7rem)` [P].

### 5.2 Camera framing — portrait vs landscape

Composition is tuned per waypoint with a **framing distance multiplier** relative to the landscape reference [P]:

| Aspect | Framing distance multiplier | FOV | Notes |
|---|---|---|---|
| Landscape (`aspect ≥ 0.75`) | 1.0× [P] | 45° [P] (desktop), 50° [P] (mobile) | reference framing |
| Portrait (`aspect < 0.75`) | **1.3×** [P] — camera pulls back so island clears top/bottom with margins | 55° [P] | island vertical scale 0.9× [P]; keeps the diorama + sky gradient + god-ray in frame |
| Orbital arc radius (hero + contact hops) | portrait 1.25× [P] | — | arc sweeps are flatter (elevation clamped [P]) so the island doesn't clip the safe-area edges |

- Waypoint look-at targets and arc endpoints are defined in **normalized viewport space** (fraction of width/height) so they recompute on resize/orientation change without retuning [P].
- On `resize`/rotation: tween framing to the new multiplier over 400–600 ms [P]; the scroll timeline re-normalizes (§5.1).

### 5.3 Safe-area insets

- `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` [P] + iOS: `min-height:100dvh` accepted with inset padding [P].
- All HUD/overlay padding uses `env(safe-area-inset-*)` with fallback 12 px [P]; nav dots offset by `inset-bottom + 12 px` [P]; bottom-anchored captions pad by `inset-bottom + 16 px` [P].
- Camera framing accounts for insets only via the portrait multiplier — no special-case offsets [P].
- Orientation lock: none; both orientations must pass §6 [P].

---

## 6. Test Matrix + Acceptance Gates

**Baseline devices [LOCKED PROTOCOL — no physical test devices available]:** gates are measured via **DevTools emulation** (Fast 3G ~1.6 Mbps / 750 ms RTT; CPU 4×/6× throttle for mobile tiers) + **Lighthouse CI** (mobile mid-tier 4G preset) + live stats-overlay accounting (draw calls, VRAM estimate) [P]. Emulation profile targets: iPhone-class (A15-class, DPR 3 → capped per §1) · Snapdragon 7xx-class mid-range · Snapdragon 6xx-class budget [S profiles]. **Honest caveat:** emulation cannot reproduce thermal throttling or OEM webview jank — run a one-time real-device smoke test whenever an iPhone/budget Android is accessible; log results as advisory, **non-blocking** for launch. WebPageTest optional for external corroboration [P].

### 6.1 Performance gates (must all pass)

| # | Gate | Target |
|---|---|---|
| G1 | Hero scene FPS (iPhone-class / Snapdragon 7xx) | **sustained ≥ 45 FPS** (avg frame ≤ 22 ms) over a 30 s scripted scroll through hero + first waypoint; ≤ 3 dropped-frame runs > 250 ms [task-set; 22 ms threshold S] |
| G2 | Hero FPS, budget Android (Mobile Low) | ≥ 30 FPS sustained [P] |
| G3 | Hero FPS, MacBook / Windows laptop | ≥ 55 FPS sustained; zero scripted-scroll hitches [P] |
| G4 | **TTI (Fast 3G, emulated)** | **≤ 4.5 s** [P] — defined: first rendered frame + preloader at 100% + scroll input responsive + hero title tappable; on 4G ≤ 2.0 s [P] |
| G5 | First paint ("0% Initializing") on Fast 3G | < 1.0 s [P] |
| G6 | Draw calls per tier | ≤ §1 table (verified live with stats overlay) [S/P] |
| G7 | VRAM | ≤ §1 table (estimated via texture accountant; `gl.MAX_TEXTURE_SIZE` sanity check) [P] |
| G8 | Physics island (20–30 bodies) | ≥ 45 FPS mid-range Android with 24 bodies active + user flinging [P]; Rapier chunk must not run on main thread > 4 ms/frame avg [P] |
| G9 | Memory stability | heap growth ≤ 10% over 3 min including garden interactions + all waypoints toured; no Safari tab crash on Mobile Standard [P] |
| G10 | Orientation + resize | portrait and landscape both pass G1 on mobile; no re-layout/weberror on rotation (framing tween §5.2) [P] |
| G11 | Scroll through all waypoints | full journey scrolled at constant velocity: no frame-time spike > 30 ms after assets of that section have streamed [P] |
| G12 | Reduced-motion + Save-Data | sites render correctly and are fully usable (static sky, no audio) [P] |
| G13 | Lighthouse | Mobile (mid-tier 4G): LCP < 2.5 s, CLS = 0, TBT < 200 ms [P]; Performance score ≥ 85 mobile / ≥ 90 desktop [P] |

### 6.2 Acceptance protocol

1. Every PR touching scene/shaders/assets re-runs G1, G3, G4, G6, G7 (stage: `npm run analyze`-style budget check in CI failing the build on over-budget assets) [P].
2. Tuning a tier's budget upward is a named change with a recorded measurement, not a silent edit [P].
3. Ship-blocker = any failed gate on the **primary emulation profile** for that tier (iPhone-class for Mobile Standard, Snapdragon 6xx-class for Low); real-device results are advisory, not blockers.

---

## 7. Budget Summary (one-glance table)

| Budget | Value | Tag |
|---|---|---|
| Draw calls mobile / desktop | ≤ 60–100 / ≤ 150 | [S] |
| Tris mobile total | ≤ 300k | [S] |
| VRAM mobile | ≤ 48 MB standard / 24–32 MB low | [P]/[S] |
| DPR cap mobile | 1.5–1.75 | [S] |
| Ladder | 1.0 → 0.75 → 0.6 → 0.45 @ >22 ms sustained ~1 s; up after 5 s | [S]+[P] |
| GLB per island | hero ≤ 3.5 MB, others ≤ 1.8 MB; total ≤ 12 MB | [P]/[S ceiling] |
| Textures | KTX2 ETC1S everywhere; UASTC hero-only on high tiers; POT + mipmaps | [S]+[P] |
| Foliage instances | ≤ 12k/island, ≤ 3 instanced calls | [P] |
| Audio | 8 files, mono Ogg, loops ≤ 2 MB, total ≤ 8 MB | [P] |
| Initial payload | ≤ 6 MB; shell ≤ 250 KB gz; TTI ≤ 4.5 s Fast 3G | [P] |
| Total site | ≤ 30 MB | [P] |
| Physics bodies | 30 / 24 / 16 by tier | [P] |
| Portrait framing | 1.3× distance, FOV 55° vs 45° landscape | [P] |
| Post | grain+vignette combined pass; desktop @ 0.5× res; mobile @ render res; no bloom (Variant A) | [S]+[P] |