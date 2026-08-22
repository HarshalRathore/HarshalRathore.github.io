# WebGL / Three.js Portfolio — Intelligence Brief

*Compiled for the personal developer-portfolio project (Three.js, frontend-only, mobile-first). Research + catalog only — no code.*
*Sources: Awwwards case studies, studio write-ups, developer interviews/blogs, dev-community roundups (see Sources). Confidence tags: **[C]** = documented by the maker/press · **[O]** = observed in the live site / widely reported · **[N/A]** = not documented, best practice inferred.*

---

## 0. TL;DR — What to steal from whom

| # | Exemplar | Killer idea to borrow |
|---|----------|----------------------|
| 1 | **Bruno Simon** (bruno-simon.com) | The entire site is an open-world *video game*: free-roam driving + secrets + achievements. Content arrives through play, not pages. 100% open-source (folio-2019 / folio-2025) — the best tutorial in existence. |
| 2 | **Lusion** (lusion.co) | "Pretend it's not a website": a single continuous scroll-slide that walks you through scenes like a film, with R&D-grade FX (cloth sim, vertex animation, cursor light, volumetric glow). |
| 3 | **14islands** (14islands.com) | **Progressive enhancement as the mobile strategy**: one persistent global WebGL canvas, normal HTML/CSS on top, WebGL opts-in per component. Accessible AND award-tier. |
| 4 | **Samuel Honigstein / Samsy** (samsy.ninja) | First-person WebGPU city as a résumé — walking through your own career as 3D space. Proves a dev can ship a *game-like* portfolio alone. |
| 5 | **Jordan Breton** (jordan-breton.com) | A "contemplative island": slow, The-Witness-style camera hops between fixed vantage points. Diorama storytelling with zero traditional UI. |

**The 8 highest-impact techniques for a personal dev portfolio (ranked by wow-per-effort):**

1. **Scroll-bound camera dolly** — one camera rig, one timeline, infinite narrative power (Bruno 2019's projects-section camera tween; Bilal; Equinox; Monolith).
2. **Raycast hover distortion / displacement** — the single cheapest "premium" interaction (Weisdevice does raycasting at 30 FPS to stay cheap; Robin Mastromarino's GSAP displacement slider).
3. **Particle text / particle systems** — one `Points` draw call reads as "advanced" instantly (sakura petals loader on ameen-abdullah.dev; Bruno's wind lines).
4. **Instanced object fields (grass / trees / constellation)** — 100k objects, 1-5 draw calls (Bruno's 78,400 single-triangle grass blades).
5. **Shader gradient backdrops & scroll-painted colors** — the 2019 Bruno floor trick (2×2 texture, UV-interpolated colors) — 20 lines of shader, whole-site identity.
6. **GLB mascot with baked expressions** — a low-poly character with DRACO + baked AO/normals doubles as the "about me" (WoraWork, Aimee's papercraft world, Thibault's spaceman).
7. **Bloom/grain/vignette post stack at half resolution** — removes the "plain WebGL" smell; half-res on mobile keeps it free.
8. **Adaptive DPR + quality ladder + paused rendering offscreen** — the invisible award-winner (Bruno's mobile preset; Weisdevice pauses the render loop on project pages).

---

## 1. Developer Portfolios (the primary study set)

### 1.1 Bruno Simon — bruno-simon.com **[C, exhaustive documentation]**
*(2019 version: 2019.bruno-simon.com · playground = the site itself + open-source repos folio-2019 (4.7k★) & folio-2025 (1.7k★), MIT, Blender files included. He also ships experiments: infinite-world, my-room-in-3d.)*

- **Signature concept:** "Drive around my résumé." A physics sandbox island you explore in a red car; the information *is* the world.
- **Hero scene (2025):** stylized island (Blender-built) with grass, birch/oak/cherry trees, water, weather — rain/snow/seasons, wind, lightning. Real-time **day/night cycle shared by all visitors**.
- **Navigation:** free-roam car driving (WASD/arrows + touch), no scroll; 2019 forced a **camera tween above the car when entering the projects section** (scroll→camera blend). 3D-only UI: clicks, keyboard, touch gestures, **gamepad**.
- **Standout techniques:** physics (2019: cannon.js primitives; 2025: **Rapier**); ~**78,400 single-triangle grass blades, looped so the ground always looks full**; instancing for trees/foliage/benches/lanterns/bowling pins/bricks; SDF-textured leaf planes that shrink in front of the car; **palette-texture technique** (all scene colors in one texture, UV-indexed) to merge geometries; wind systems; multiplayer-lite (Whispers, global cookie counter, daily circuit leaderboard); achievements + unlockable car skins; spatialized sound (Howler.js), CC0 music.
- **Palette/lighting/materials:** bright, saturated stylized nature; low-poly PBR-ish materials; heavy use of color palette texture instead of vertex colors.
- **Typography:** playful hand-written vibe — **Amatic SC & Nunito** (documented on his site); minimal HTML text, most labeling exists in-world.
- **Mobile:** auto **lower-quality preset** — disables water blur + depth-of-field, reduces shadow-map resolution.
- **Performance notes:** DRACO (quantization-heavy) for models; **ETC1S/UASTC GPU-compressed textures**; frustum culling; merged geometries; **TSL shaders → runs WebGL *and* WebGPU automatically** (better perf on WebGPU).
- **Why study:** the gold standard; MIT code you can read like a textbook; devlogs on YouTube document every decision.

### 1.2 Samuel Honigstein “Samsy” — samsy.ninja **[C]**
- **Signature concept:** "Your career as a cyberpunk city you walk through." First-person WebGPU exploration (he co-maintains Three.js Journey with Bruno; also wrote the VAO optimization for Bruno's 2019 site).
- **Hero scene:** neon-lit cityscape, holographic interfaces, Japanese-inspired signage, first-person controls.
- **Navigation:** free-roam first-person (WASD/look), point-of-interest hotspots.
- **Standout techniques:** **WebGPU renderer** (claims 120+ FPS), neon volumetric-style lighting, HUD-as-UI baked into the 3D.
- **Palette/lighting:** dark city, cyan/pink/magenta neon, emissive materials, fog.
- **Typography:** embedded holographic/scifi type in-world; minimal overlay.
- **Mobile:** [N/A] — but per Bruno's case study, heavy scenes get quality presets; treat as desktop-first showcase.
- **Performance:** WebGPU + TSL; expect adaptive quality for mobile (not documented).

### 1.3 Bilal El Moussaoui — bilal.show **[C]**
- **Signature concept:** "Scroll through a music-box story." A character-led 3D narrative where scrolling drives the plot.
- **Hero scene:** a character moving through a music-box-like diorama; scenes change with the scroll timeline.
- **Navigation:** scroll-driven camera/cinematic — classic "scroll = time" paradigm.
- **Standout techniques:** scroll timeline choreography (scroll→camera + character state machine), diorama staging, story pacing; [details N/A].
- **Palette/lighting:** warm toy-like diorama lighting; soft pastel-to-amber range [O].
- **Typography:** overlay editorial type [O].
- **Mobile:** scroll-driven paradigms port naturally to touch; performance [N/A].
- **Why study:** the strongest recent example of *narrative pacing* via scroll alone.

### 1.4 Sébastien Lempens — sebastien-lempens.com **[C]**
- **Signature concept:** "Cinematic tour of 3D Paris as my résumé."
- **Hero scene:** stylized Paris street, first-person view.
- **Navigation:** scroll-driven tour; camera shifts between **first-person walking, riding a scooter, skydiving** — camera animates to new modes per section.
- **Standout techniques:** multi-mode camera choreography (walk/drive/fly) on one scroll timeline; city-scale environment; [details N/A].
- **Mobile:** scroll-bound camera = touch-native; [N/A otherwise].

### 1.5 Jordan Breton — jordan-breton.com **[C — FWA SOTD Oct 2025]**
- **Signature concept:** "A contemplative floating island"; a *witness*-like pause-and-look meditation on a handcrafted micro-world.
- **Hero scene:** floating island with grass, waterfall, fire, wind, trees, butterflies — all small, all animated.
- **Navigation:** **camera hops between fixed vantage points** (click/scroll to jump the camera to the next composition). No free-roam; pure curation.
- **Standout techniques:** dense micro-diorama (many small independently-animated elements), cinematic camera framing per section, ambient particle life (butterflies, embers).
- **Palette/lighting:** soft stylized nature, gentle fog, warm daylight [O].
- **Mobile:** fixed-point camera = trivially mobile-safe (few interactions); instanced small elements keep draw calls low [O].
- **Why study:** shows "less interaction, more contemplation" can still win awards — great anti-pattern to the game-y Bruno approach.

### 1.6 Thibault Introvigne — thibault-introvigne.com **[C]**
- **Signature concept:** "Explore my world, find my 10 collectibles." A spaceman sandbox where each collectible reveals a project/experience.
- **Hero scene:** colorful sci-fi world w/ spaceman avatar.
- **Navigation:** free-roam character control (touch-friendly), collectibles as content gateways.
- **Standout techniques:** React Three Fiber stack; game-ified content delivery (10 hidden easter eggs); inspired by Blade Runner, Cyberpunk, The Witness.
- **Palette/lighting:** colorful, atmospheric, chill sci-fi; fog-heavy depth [O].
- **Mobile:** game-style virtual joystick / tap-move patterns [O]; [N/A perf].

### 1.7 Worapat “WoraWork” — worawork.vercel.app **[C]**
- **Signature concept:** "My cozy house & garden, Zelda-meets-Animal-Crossing."
- **Hero scene:** a small house+garden diorama you walk a character through.
- **Navigation:** free-roam character walk; interact with objects to reveal info (artist-turned-developer story).
- **Standout techniques:** low-poly cozy aesthetic; interactive props; charming character animation.
- **Mobile:** walk/Tap-to-move works on touch; [N/A perf].

### 1.8 JReyes MC — jreyes-mc-portfolio.com **[C — Awwwards Honorable Mention]**
- **Signature concept:** "My portfolio as a Minecraft house you walk through."
- **Hero scene:** voxel house + circuit path.
- **Navigation:** scroll advances you room-by-room through the house (scroll = door-to-door).
- **Standout techniques:** voxel-style geometry (cube instancing/merged chunks), low-poly textures, blocky charm.
- **Mobile:** voxel + InstancedMesh is inherently cheap — one of the most mobile-friendly patterns in this list.

### 1.9 Aimee's Papercraft World — aimees-papercraft-world.com **[C — open-source tutorial project by Andrew Woan]**
- **Signature concept:** "A notebook-paper diorama I walk around in."
- **Hero scene:** looping path through a hand-drawn papercraft landscape.
- **Navigation:** scroll-driven character walking a looping path.
- **Standout techniques:** **2D illustrated assets baked onto 3D geometry** (papercraft look); R3F + Blender + Krita; full source + Blender files on GitHub — *an actual teaching portfolio*.
- **Mobile:** simple geometry + baked textures = mobile-fine [O].

### 1.10 Xianyao Wei “Weisdevice” — weisdevice.xyz **[C — documented perf decisions]**
- **Signature concept:** "A tiny island with a robot, full of toys" (knobs, GameBoy pad, switches).
- **Hero scene:** small island, cute robot, interactive gadgets.
- **Navigation:** pointer/touch interact with props; GSAP transitions between pages.
- **Standout techniques:** GLSL shaders for visuals; Howler.js audio; **documented engineering for performance: raycasting throttled to 30 FPS, render loop pauses when a project page opens, assets lazy-loaded**. (Codrops case study exists.)
- **Mobile:** explicitly engineered for it (30 FPS raycast cap, render pauses) — the sharpest *mentality* example for a personal build.
- **Why study:** the best example of "defensive engineering choices documented publicly."

### 1.11 Ameen Abdullah — ameen-abdullah.dev **[C]**
- **Signature concept:** "Sakura island portfolio with a petals loading screen."
- **Hero scene:** sakura tree on a small island surrounded by water.
- **Navigation:** scroll reveals work below the 3D island; loader doubles as choreography.
- **Standout techniques:** **WebGPU sakura petals as the loader** (loading = art), particle tree, water shader, Vue-based stack.
- **Mobile:** [N/A] but particle-field heroes are mobile-friendly when instanced.

### 1.12 Keita Yamada — keita-yamada.com **[C — 2× SOTD + Developer Awards]**
- **Signature concept:** "Designerly restraint with surgical WebGL experiments."
- **Hero scene:** minimal typographic 3D; signature projects like *100 Days of Poetry* (SOTD + Developer Award) and *Web Graphic Experiments v2* (SOTD + Developer Award 2020, experimental typography, scroll FX).
- **Navigation:** classic sections (home/projects/socials/FAQ/"copycats") with WebGL micro-experiences per section.
- **Standout techniques:** experimental typography + WebGL integration; device-oriented motion; scroll/pointer FX experiments.
- **Palette:** black/white with chromatic accents [C per Awwwards palette].
- **Why study:** proves a *developer* can win on polish + experiment density rather than a giant world.

### 1.13 Robin Mastromarino — robinmastromarino.com **[C — SOTD Sep 2018, CSSDA]**
- **Signature concept:** "Minimal interactive portfolio with a displacement slider."
- **Hero scene:** clean type + WebGL displacement effects on images.
- **Navigation:** horizontal-scroll layout (landing.love), GSAP-driven.
- **Standout techniques:** **GSAP displacement/distortion slider effect** (signature); WebGL image treatment; minimal UI.
- **Palette/typography:** minimal, typography-led, monochrome w/ tonal variety [O].
- **Mobile:** horizontal scroll maps to swipe; SOTW-era mobile-optimized [O].

### 1.14 Renaud Rohlinger — renaudrohlinger.com **[C — SOTD Jun 2019 + Mobile Site of the Week]**
- **Signature concept:** "Elegant French-in-Japan creative-dev portfolio" (long-time collaborator of Bruno).
- **Navigation:** refined scroll storytelling with narrow WebGL accents; heavy GSAP craft.
- **Notable:** one of the few portfolios with a *dedicated Mobile SOTW* — a studied mobile adaptation. [details N/A]

### 1.15 Robb Owen — robbowen.digital **[C]**
- **Signature concept:** "Accessible, shader-literate creative development" — the anti-flashy reference.
- **Notable:** SynthWave '84 theme (2M+ downloads), Tornis viewport library; shader experiments across projects; strong personal-brand storytelling without a giant 3D world.
- **Why study:** for the *narrative* section (writing about your work well), not the 3D.

### 1.16 Tao Tajima — taotajima.jp **[C via roundups]**
- Japanese director/filmmaker portfolio using Three.js + storytelling; known for WebGL narrative pieces. [details N/A]

### 1.17 Kenta Toshikura — kentatoshikura.com **[C via roundups]**
- Lead designer/developer at Garden Eight (Japan); portfolio of interactive 3D projects/visualizations. [details N/A]

---

## 2. Legendary Studio Benchmarks (craft ceiling)

### 2.1 Lusion — lusion.co **[C — Site of the Month May 2019 + Developer Site of the Year; labs.lusion.co R&D]**
- **Signature concept:** "Epic, real-time, interactive experiences" — the site itself is a scroll-through film of scene after scene; *"it's not a website."*
- **Hero scene (current):** continuous scroll-slide; scenes include translucent "Beethoven" portrait, big screen w/ cursor-following point light, cloth figures, giant counter sections. Older home: interactive cloth ribbon dragged by your cursor.
- **Navigation:** **scroll slides between full scenes** with in-scene camera moves; cursor is the main interaction instrument (light, distortion, cloth pull).
- **Standout techniques (2019 case study, all documented):**
  - **Pre-calculated Houdini cloth sim** stored in an ArrayBuffer (220 KB gzip), blended by cursor — fake-but-photoreal cloth.
  - **Vertex animation via PNG textures** (positions + normals baked into textures; 16-bit int + divider encoding; 11 keyframes for 66 frames) → 983 KB desktop / **246 KB mobile** (4k→1k verts — explicit mobile LOD!).
  - Cursor-tracked point light re-lit an offline Redshift video + GLTF hybrid (frame-counter encoded in the video, decoded via readPixels) — legendary hack.
  - Real-time reflections, volumetric light, interactive blurry 3D text.
- **Palette/lighting:** near-black, saturated gradient ribbons (purple/pink/cyan), metallic + translucent materials, bloom/glow everywhere [O].
- **Mobile:** explicit lower-vertex LOD (1024 vs 4096) — documented adaptive quality.
- **Why study:** the master class in "offline bake + real-time cleverness" and in R&D-scale post-FX.

### 2.2 Active Theory — activetheory.net **[C — Webby nominee v5, Developer Site of the Year (Awwwards London)]**
- **Signature concept:** "Game-engine thinking on the web" — a decade of flagship real-time launches (ASCII/Project i/Asteroid lineage; now v6, Jan 2024).
- **Hero scene (v5):** landing takes you *through eight 3D environments* inspired by their offices (Venice Beach → Amsterdam canals) with scene-to-scene transitions.
- **Navigation:** environment-to-environment transitions; current v6: **AI-led navigation of case studies**, pillbox nav reacting to scroll velocity (CommArts).
- **Standout techniques:** **composite rendering / render-target scene transitions** (Jeremy Chang's Codrops article: render targets, fullscreen passes, shader-driven transitions — the architectural bible for "scene A melts into scene B"); **networked cursor tubes** (you see other live visitors' cursor trails — shared-world gimmick from v6).
- **Why study:** the transition-craft leaders; if you plan multi-scene portfolios, study their transition architecture.

### 2.3 Resn — resn.co.nz **[C — SOTD; "the world's friendliest evil corporation"]**
- **Signature concept:** "Infecting your screen for your enjoyment" — playful physics games as marketing.
- **Home:** black, horizontal-layout 3D experience (Awwwards palette: #000) + /play experiments (e.g., captainDeluxe mini-games).
- **Standout techniques:** physics-driven play (Dodge, Bounce series), characterful mini-games, joyful crumpled/ragdoll physics; legendary browser-resize easter egg (a tiny replica of the site appears when you resize — Reddit-famous).
- **Mobile:** they shipped WebGL-led mobile versions of their own site (Behance case) [C].
- **Why study:** personality + play over fidelity; the "make it fun first" benchmark.

### 2.4 14islands — 14islands.com **[C — SOTD 7.78; journal on progressive enhancement]**
- **Signature concept:** "WebGL as a spice layer over real HTML." Monochrome (#000) studio site with 3D accents.
- **Standout techniques:** **one global shared WebGL canvas persisting across page loads** (react-three-fiber + a custom `useCanvas()` hook); any component can opt into WebGL; the site stays perfectly accessible/SEO-able — *this is their documented mobile strategy* (content always available, 3D enhances). Blobmixer = their public WebGL blob toy.
- **Work benchmark:** Google Interland (triangular 3D flowers, coral/moss/metallic materials on light-blue gradient), Ankra, Rimac Nevera configurator (physics-based materials config).
- **Why study:** the accessibility-first counterweight to Lusion's maximalism.

### 2.5 Others worth one click (from the 2026 agency landscape) **[C via psychoactive.co.nz roundup]**
- **makemepulse** (Paris) — Apechain: SOTD + Dev Award Jun 2026; "playful, performant, 3D that earns its place." → makemepulse.com
- **Merci-Michel** (Paris) — premium restraint, luxury editorial 3D. → merci-michel.com
- **Unseen Studio** (London) — Hubtown: SOTD + Dev Award Jun 2026; art direction + engineering. → unseendigital.design
- **Noomo Agency** (LA) — The Power of Storytelling: SOTD + Dev Award Jun 2026; 3D storytelling. → noomo.agency
- **Utsubo** (Osaka) — engineering-led Three.js/WebGPU; publishes the best written guides. → utsubo.com
- **Psychoactive Studios** (Wellington) — performance-budgeted WebGL/WebGPU; "a 3D site nobody can run isn't craft." → psychoactive.co.nz

---

## 3. Technique Menu (implementable portfolio 3D ideas)

Effort: **S** = hours–1 day · **M** = 2–5 days · **L** = 1–3 weeks.
Mobile: **✅** = safe on mid-range phones · **⚠️** = works with guardrails (quality ladder / reduced counts) · **❌** = avoid or desktop-only.

| # | Technique | Effort | Mobile | Notes / best exemplar |
|---|-----------|--------|--------|----------------------|
| 1 | **Scroll-bound camera dolly** (scroll = camera timeline) | M | ✅ | The workhorse. Drive camera pos/rot from a scroll progress clamped to sections; add easing + second-order smoothing. Bruno 2019 (projects camera tween), Bilal, Sébastien Lempens; long-form: Equinox & The Monolith Project. |
| 2 | **Particle text morph** (points fly between glyph grids) | M | ✅ | Precompute target positions per glyph, lerp in shader w/ per-particle random offsets; single draw call. Use as logo/hero/loader (Ameen's petals loader vibe). Cap particle count by DPR tier. |
| 3 | **Shader gradient backdrops** (fullscreen quad, gradient + grain + subtle noise motion) | S | ✅ | 20 lines of GLSL; color from scroll or palette texture. Bruno's 2019 floor = same trick on a plane (2×2 texture, UV-interpolated colors). |
| 4 | **Raycast hover distortion** (pointer-proximity displacement of mesh/points) | S–M | ⚠️ | Throttle raycasting to **30 FPS** (Weisdevice, documented), use `raycaster.firstHitOnly`, keep geometry mid-poly, or do proximity in fragment shader from uniform — no raycast at all. Robin Mastromarino (GSAP displacement) for image-level. |
| 5 | **Physics toy / mini-game** (dodgeball, crate smash, car bump) | L | ⚠️ | Rapier (WASM, Bruno's 2025 choice) or cannon-es. Keep primitive colliders, ≤ a few hundred bodies on mobile; virtual joystick for touch; make it optional content, not the spine. Resn = benchmark for "play > fidelity." |
| 6 | **3D skill constellation** (instanced spheres/points forming clusters per skill) | M | ✅ | InstancedMesh or Points; hover highlights a cluster via shader uniform; click → project. Cheapest "impressive data viz." |
| 7 | **Wireframe globe / planet** (points or wireframe sphere + arcs) | S–M | ✅ | Points + shader (size attenuation off on mobile); project pins as instanced sprites. Ties to "world/remote" narrative. |
| 8 | **GLB mascot with expressions** (low-poly character, blend shapes or texture-swap faces, idle bob) | M–L | ✅ | **DRACO-compress + KTX2 textures + baked AO/normals**; use MorphTargets not bones where possible (bone skinning is heavier on mobile); limit skinned skeletons. WoraWork, Aimee's papercraft, Thibault's spaceman. |
| 9 | **Bloom/grain/vignette stack** (EffectComposer: UnrealBloomPass @ half-res + grain shader + vignette) | S–M | ⚠️ | Half-resolution bloom ≈ free on desktop, OK on mobile flagships — disable below quality tier 2 (Bruno disables DOF + water blur on mobile). Grain/vignette are trivial fullscreen passes. |
| 10 | **Cursor trails** (points trail w/ fading lifetime) | S | ✅ | One Points + update ring buffer; use `touch` → finger trail or hide. Networking it = Active Theory's cursor-tube party trick. |
| 11 | **Audio-reactive visuals** (AnalyserNode → uniform → amplitude-driven scale/color) | M | ⚠️ | Must init AudioContext on user gesture (autoplay policies); add mute toggle; keep reactivity cheap (uniforms, not per-frame re-allocation). Mola Zone & Lusion prove the vibe. |
| 12 | **Project showcase: drag-orbit GLB** (configurator-lite w/ material/color switching) | M | ⚠️ | One-finger orbit + inertia; environment map + lights only (no shadows on mobile); 14islands' Ankra / Rimac Nevera lineage. |
| 13 | **Multi-scene render-target transitions** (scene A → shader-driven melt into scene B) | L | ❌→⚠️ | The Active Theory signature; architecture: separate scenes → render targets → fullscreen transition pass. Beautiful but heavy; desktop-first, fallback = clean crossfade on mobile. |
| 14 | **Vertex-animation characters** (baked POS/NOR textures, Lusion-style) | L | ⚠️ | Bake in Blender/Houdini, play via shader UV sampling; 16-bit int encoding for size; mobile LOD = lower vertex count (Lusion: 1k vs 4k). Overkill for most personal sites — included as ceiling reference. |

---

## 4. Mobile WebGL Performance Budgets (the award-winner's checklist)

Sources: Bruno Simon's case study (documented numbers), Lusion's case study (documented LOD), Weisdevice (documented engineering), Psychoactive's "run it on a mid-range Android" doctrine. Targets are **budgets for a mid-range phone (Snapdragon 7xx-class, ~2022-2024 era)** — build to these and flagships will fly.

### 4.1 Draw calls
- **Target: ≤ 60–100 draw calls/frame total on mobile** (≤ 150 on desktop mid). (Lusion 2019 ran its whole *scene* on a small handful of custom calls + 1-2 fullscreen passes; Bruno merges/instances everything.)
- Count *every* pass: shadows (each shadow-casting light ≈ +1 pass), post-FX passes (each EffectComposer pass), transparent objects (each = 1+ call).
- Rules that keep it low:
  - **Instancing** for repeated objects (grass, trees, foliage, lamp posts, particles, stars) — 10k–100k instances ≈ 1 draw call.
  - **Merge geometries** per material (use texture atlas / Bruno's palette-texture trick so merged parts differ by UV, not material).
  - Max **1 shadow-casting light** on mobile (2 on desktop); fake the rest (baked AO, blob shadows = dark transparent plane under characters, gradient ambient).
  - Everything in 1-2 `Points` systems instead of 50 particle emitters.

### 4.2 Triangle counts
- **Total loaded scene: ≤ 300–500k tris mobile** (Bruno's entire grassfield = 78,400 tris in *one* geometry — his whole island is far smaller than typical Unity mobile games).
- **Visible/active budget is what matters**: frustum culling (built-in) + hide what's behind the camera; split the world into chunks loaded on approach.
- Keep per-object detail humble: hero object 10–60k tris; background/props 0.5–8k.
- Use **16-bit indices** (BufferGeometry default is fine — 65,535 verts/geometry) unless a mesh truly exceeds it; 32-bit doubles memory bandwidth.
- LOD is optional at these budgets; quality *preset* (Bruno) is the more portfolio-relevant pattern.

### 4.3 Texture memory (VRAM is the real mobile killer)
- **Budget: ≤ 32–64 MB VRAM on mobile** (100–200 MB desktop). A single 2048×2048 BC7/KTX2 texture ≈ 5–8 MB; four of those ≈ one happy phone.
- **Always ship GPU-compressed textures: KTX2/Basis (ETC1S for mobile compat, UASTC for quality)** — Bruno documents ETC1S/UASTC as his choice; ~60–70% smaller than PNG and *decoded on GPU* (no CPU decode hitch).
- Keep textures **power-of-two** where possible (mipmap/compression friendliness), generate mipmaps, and use `LinearMipmapLinearFilter`; UI-canvas textures at 1:1.
- Baked lighting (AO/normals/lightmap-style) replaces runtime shadow maps — the single cheapest "expensive look."
- Watch **uniform/attribute memory**: vertex colors are cheap; skinning matrices are not; morph targets cost GPU memory per active target — keep ≤ 3-4 blend shapes.

### 4.4 DPR capping & adaptive quality
- **Cap `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`** — and on mobile consider **1.5–1.75**; a 3× phone (many Androids are 2.75–3×) rendering full-res WebGL is how sites catch fire.
- **Adaptive DPR ladder** (measure, don't guess):
  - `performance.now()` loop → compute rolling avg frame time → if > 22 ms (≈45 FPS) for ~1 s, step down the render scale (e.g., 1.0 → 0.75 → 0.6 → 0.45), re-evaluate up only after ~5 s stable.
  - Alternative: binary **quality preset** (Bruno: mobile disables water blur + DOF, lowers shadow res). Presets are easier to reason about than live-auto-scaling.
- **Resolution ≠ CSS size**: render at `canvas.width = clientWidth * scale`, CSS shows it full-size; FSAA off on mobile (`antialias: false`), rely on higher res + post grain to mask jaggies.
- **Pause what you can't see**: `IntersectionObserver`/`visibilitychange` → stop the rAF loop when the canvas leaves the viewport or the tab hides (Weisdevice pauses on project pages). Also pause audio on `visibilitychange`.
- **Start cold**: heavy 3D in the *first* viewport forces the longest first paint. Use a 2D/CSS placeholder or a low-poly hero with the full scene lazy-initialized post-interaction; preload the GLB during idle (`requestIdleCallback`).

### 4.5 Bundle & asset budgets (front-end only, no server)
- Three.js core ≈ **~150 KB min+gz**; keep total JS ≤ **300–500 KB gz** for the shell (code-split the 3D module so the *content page* loads without it).
- GLB: **DRACO (quantization) + KTX2 textures**; target ≤ 3–8 MB per hero model, ≤ 20 MB worst-case total scene (Messenger demo: whole game 5.7 MB, tops at 17.5 MB — a good ceiling). Serve with `br`/`gz`.
- Instanced/Points everything animated, prefer **precomputed arrays over per-frame allocation** (GC pauses kill mobile 60 FPS); reuse typed arrays.

### 4.6 The one-page rule
"Runs on the jury's MacBook" is not a metric. The 2026 agency consensus (Psychoactive et al.): **demo on a mid-range Android before you call it done**, and design to a frame budget from day one — mobile is a requirement, not a phase.

---

## 5. Sources

- Bruno Simon — Awwwards case study (2026): https://www.awwwards.com/brunos-portfolio-case-study.html
- Bruno Simon — 2019 portfolio case study (Medium): https://medium.com/@bruno_simon/bruno-simon-portfolio-case-study-960402cc259b
- Bruno Simon site / behind-the-scenes (Rapier, Howler, Amatic SC & Nunito, TSL/WebGPU+WebGL): https://bruno-simon.com
- Repos: https://github.com/brunosimon/folio-2019 · https://github.com/brunosimon/folio-2025
- Lusion — Site of the Month case study (2019): https://www.awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html
- Lusion: https://lusion.co · labs: https://labs.lusion.co
- Active Theory — Webby ("Crafted with Code" v5): https://www.webbyawards.com/crafted-with-code/active-theory · CommArts Webpick (v6, AI-led nav, cursor tubes): https://www.commarts.com/webpicks/active-theory-2 · Jeremy Chang (AT) on composite rendering: https://tympanus.net/codrops/2026/02/23/composite-rendering-the-brilliance-behind-inspiring-webgl-transitions/
- Resn: https://www.awwwards.com/sites/resn-co-nz · https://resn.co.nz
- 14islands — progressive enhancement with WebGL: https://www.14islands.com/journal/progressive-enhancement-with-webgl-and-react · SOTD page: https://www.awwwards.com/sites/14islands
- Roundup #1 (Bruno, Samsy, Bilal, Lempens, JReyes, Jordan Breton, Thibault, WoraWork, Papercraft, Weisdevice, Ameen, + Monolith/Equinox/Egg Hunt/Messenger/Mola Zone): https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025
- Roundup #2 (Reno/Keita/Robin/Kenta/Tao/Aidan): https://dev.to/hr21don/six-stunning-web-developer-portfolios-showcasing-threejs-mastery-206n · https://dev.to/hr21don/6-stunning-webgl-threejs-portfolios-5c65
- Keita Yamada: https://www.awwwards.com/sites/keita-yamada-portfolio
- 2026 WebGL agency landscape: https://www.psychoactive.co.nz/content-hub/best-webgl-interactive-3d-agencies
- Messenger (bundle-size reference): https://messenger.abeto.co · Weisdevice (perf decisions): https://www.weisdevice.xyz

*End of brief.*