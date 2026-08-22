# Taste Board — Career Archipelago (Real References, No Slop)

*Companion to `webgl-inspiration-brief.md`. Every URL below was resolved/verified at research time (Aug 22, 2026). No AI moodboards, no generated images — real artworks, real sites, real fonts, real colors.*
*Tagging: **[S]** = sourced/verified (URL resolved, code inspected, page extracted, or maker/press documented) · **[I]** = inferred from observed evidence or general photographic/animation knowledge — clearly labeled, treat as hypothesis.*

---

## 1. JORDAN BRETON DNA — What the award-winning "contemplative island" is actually made of

### 1.1 The facts on record
| Fact | Detail | Tag |
|---|---|---|
| Concept | "A contemplative floating island… camera hops between fixed vantage points. No free-roam; pure curation." | [S] — creativedevjobs roundup (best-threejs-portfolio-examples-2025) |
| FWA Site of the Day | **October 2, 2025** — confirmed by his own tweet (`@JordanBretonDev`) and the FWA case link he embeds in his site footer | [S] — x.com/JordanBretonDev + https://thefwa.com/cases/my-contemplative-portfolio |
| Awwwards | **Honorable Mention, Oct 10, 2025** ("My Contemplative Portfolio"); jury scores ~7.3–8.2; tags: Three.js, TypeScript, WebGL, 3D, Animation, Unusual Navigation, Portfolio | [S] — awwwards.com/sites/my-contemplative-portfolio |
| Three.js Journey | Featured in **"Bruno's Selection — Wall of Fame," Oct 23, 2025** (Bruno Simon tweeted it) | [S] — threejs-journey.com/selection/jordan-breton-portfolio |
| Person | Freelance senior full-stack (10 yrs: SaaS, marketplaces) + creative Three.js dev, France. "Available for freelance." | [S] — site copy + LinkedIn |
| v2 (2026) | "The v2 of my ThreeJs portfolio is live… A whole new intro sequence — Volumetric clouds reacting to the directional light **and** point lights in the scene." | [S] — his X post (Apr, per profile timeline) |

### 1.2 What the code actually says (bundle inspection, Aug 22 2026)
Source: his production site's own JS/CSS bundles (`/assets/index-G3tB3Owe.js`, `/assets/index-DF8svE4a.css`), fetched and grepped. These are **[S — inspected]**.

- **Renderer/stack:** `WebGLRenderer` + `EffectComposer` from the pmndrs **`postprocessing`** library (EffectPass, ToneMapping pass). Vite-built PWA (service worker, hashed assets). Framework not conclusively identified in minified bundle (likely React/Solid-class); **don't copy — you'll use your own stack.** **[S for libs, I for framework]**
- **Color treatment:** **ACESFilmic tone mapping** + explicit `toneMappingExposure` + `outputColorSpace` (SRGB). Post stack = **grain/noise shader + vignette** — notably **no bloom pass** in the bundle. Filmic grade via tone-mapping + grain, not glow. **[S]**
- **Atmosphere:** three.js `Sky` + `Fog` + `Water` (shader water, tuned), **volumetric-style clouds**, heavy **Perlin/simplex noise** (~300 refs) driving procedural motion (clouds, fire, embers, wind). **[S]**
- **Scene craft:** island is a **DRACO-compressed GLB** (`/models/islands/islands-2.glb`) + `grass.glb` + `pampa-grass.glb`; foliage via **InstancedMesh**; textures **KTX2/Basis GPU-compressed**. This is the award-tier asset pipeline: compressed, instanced, cheap. **[S]**
- **Motion:** `OrbitControls` with **damping** ("damp" refs throughout), scripted camera positions, **transition + curtain system** (132 transition refs) for the intro/v2 sequence. Fixed viewpoints = the brief's "camera hops." **[S]**
- **Sound design: 17 audio files.** `birds, campfire, waterfall, wind, rain, night, mysterious-ambience, spirit-mode, crystal, crystal-collected, achievement, swap, button, explosion, firebird-feather, goodnight, intro_magic-short`. AudioContext-driven (no Howler/Tone.js in bundle). Layered ambience + per-interaction SFX = the "alive" quality. **[S]**
- **Typography (actual families):** CSS `@font-face` declares **Montserrat** and **Orbitron** (self-hosted woff2, `/fonts/montserrat.woff2`, `/fonts/orbitron.woff2`); an **Inter** string also appears in the JS (loader/canvas text). **[S]** — So his site is *not* serif; the editorial-serif direction for *your* site is a deliberate differentiation, not emulation.
- **Palette (Awwwards' extraction tool):** **#A57B5B** (terracotta/tan) and **#7B9F17** (olive-lichen green) — the two colors Awwwards' tool pulled from his hero. **[S]**

### 1.3 What makes it feel expensive — synthesis
- **Perceived craft density:** dozens of tiny independently-animated elements (grass, butterflies, fire, waterfall, clouds) read as "handmade world," even at low poly counts. Instancing makes it cheap; nothing reads as cheap. **[I from 1.2]**
- **Curated camera = cinematic authority:** fixed viewpoints make every frame a composition; the visitor *looks*, like a museum. Zero traditional UI in the hero. **[S — roundup + I]**
- **Filmic grade over flash:** ACES + grain + vignette + fog (no bloom) — the "expensive" smell comes from restraint. **[S 1.2 + I]**
- **Sound layer:** wind/birds/water ambience + event SFX (crystal, achievement, swap) make interaction feel consequential. **[S 1.2]**
- **Engineering discipline as taste:** Draco + KTX2 + InstancedMesh + damped camera + quality-led mobile (touch-look-around copy on site: "Touch & move to look around / Tap here to explore"). Skill is invisible; polish is visible. **[S]**
- **Restraint is the brand:** "less interaction, more contemplation" — anti-Bruno. His site won with *sparseness*, proving the direction. **[I — brief §1.5]**

---

## 2. REAL COMPARABLE SITES — verified live, worth screenshots

*All URLs returned HTTP 200 at research time (curl, desktop UA). "Steal" = the single idea worth taking.*

| # | Site | Status | What to steal |
|---|---|---|---|
| 1 | https://jordan-breton.com | ✅ 200 | The whole reference — camera-hop rhythm, fog volume, ambience layering (§1). |
| 2 | https://bruno-simon.com | ✅ 200 | Island diorama as *résumé*; palette-texture trick; grass instancing; day/night cycle. |
| 3 | https://equinox.space | ✅ 200 | **Scenic-cam storytelling at its best** (Little Workshop): first-person "space survival" story, evolving soundtrack + voiceover, one-finger mobile mode. SOTD Awwwards + Dev Award. |
| 4 | https://themonolithproject.com | ✅ 200 (JS-redirects to `/lander`) | Long-form cinematic WebGL narrative; scroll-paced camera over monumental scenery; golden-hour-grade sky grading. |
| 5 | https://weisdevice.xyz | ✅ 200 | Tiny toy island + robot; **documented perf discipline**: raycast @30 FPS, render pause, lazy assets (Codrops case study). |
| 6 | https://ameen-abdullah.dev | ✅ 200 | Sakura island; **WebGPU petals as loading screen** (loading = art); water shader. |
| 7 | https://worawork.vercel.app | ✅ 200 | Cozy house-diorama résumé; Zelda/AC charm; object-interaction = info. |
| 8 | https://jreyes-mc-portfolio.com | ✅ 200 | Minecraft-house résumé; scroll = room-by-room; voxel/InstancedMesh = inherently cheap. |
| 9 | https://aimees-papercraft-world.com | ✅ 200 | Papercraft diorama; 2D art baked on 3D geometry; **full source + Blender files** (teaching value). |
| 10 | https://samsy.ninja | ✅ 200 | First-person WebGPU city-résumés (Bruno's collaborator Samsy); HUD-as-UI in 3D. |
| 11 | https://sebastien-lempens.com | ✅ 200 | Multi-mode camera choreography (walk/scooter/sky-dive) on one scroll timeline through 3D Paris. |
| 12 | https://robbowen.digital | ✅ 200 | Premium *developer* portfolio, no giant 3D world — shader literacy + storytelling; the writing bar. |
| 13 | https://lusion.co | ✅ 200 | Craft ceiling: scroll-film of scenes, cursor-as-instrument, R&D post-FX. Study the *pacing*. |
| 14 | https://14islands.com | ✅ 200 | **Progressive-enhancement doctrine**: one shared WebGL canvas over real HTML/CSS — the accessibility + mobile answer. |
| 15 | https://utsubo.com | ✅ 200 | Engineering-led Three.js/WebGPU (Osaka); best written technical guides; minimal, precise taste. |
| 16 | https://makemepulse.com | ✅ 200 (bonus) | Agency behind Apechain (SOTD + Dev Award 2026): "3D that earns its place," playful but performant. |

**Failed/unverified this session (may be geo-blocked, not necessarily dead):**
- https://bilal.show → HTTP 404 at research time.
- https://thibault-introvigne.com, https://keita-yamada.com → connection timeouts from this network; re-check before citing in the brief's later sections.

---

## 3. GOLDEN-HOUR ISLAND ART REFS — for mood calibration

### 3.1 Named artists & real pieces (ArtStation + sites)
| Artist | Piece / series | Where | Why it matters |
|---|---|---|---|
| **Alena Aenami** (artstation.com/aenamiart) | "Castle In The Sky", "7 P.M.", "Last Light", "Beyond Hill And Dale", "Sunset", "Horizon" | her ArtStation + iCanvas catalog (piece titles documented) | THE golden-hour/dusk mood palette: saturated orange horizon bleeding into indigo zenith, silhouetted figures/houses. Direct mood calibrator for your lighting evolution. (ArtStation pages are bot-walled; screenshot via browser.) |
| **Andreas Rocha** (artstation.com/andreasrocha) | "We Found This Amazing Place!" — artstation.com/artwork/k9eaA | ArtStation + andreasrocha.com | Floating cliff-islands with waterfalls — the closest painterly analogue to your diorama concept; dreamy matte colors, painterly rocks. |
| **Noah Bradley** | "The Sin of Man" series (floating primordial continents, "Sun Temple" pieces; MTG artist) | noahbradley.com + noahbradley.blog | Massive floating landmasses + tiny human figures = scale drama; his Art Camp teaches landscape fundamentals (good theory refs). |
| **Studio Ghibli / Laputa: Castle in the Sky (1986)** | The floating island Laputa (overtaken tree-city) + Joe Hisaishi score | film; SIFF program page (siff.net/programs-and-events/art-of-studio-ghibli/castle-in-the-sky) + art book *The Art of Castle in the Sky* (VIZ) | The ur-reference for floating-island dioramas; its background-painting color logic (sky gradients, cloud bands, mossy ruins) is your north star. |
| **Days of Heaven (1978, dir. Terrence Malick)** | Shot almost entirely at "magic hour" by Nestor Almendros | film (widely documented in cinematography literature) | The live-action golden-hour bible: silhouette grain fields, warm rim light, near-no-plot pacing that still hypnotizes — matches "contemplative" brief. |
| **The Witness (2016, Thekla)** | Open island, painterly morning light, viewpoint-driven curiosity | the game | Jordan Breton's site is routinely described as Witness-like (roundup); its *light follows the sun* logic is the shared grammar. |
| **Firewatch (2016, Campo Santo)** | Wyoming golden-hour color grade | the game | Reference for saturated dusk gradients done tastefully in a real-time engine. |

### 3.2 Hotlinkable direct images (verified URLs, all resolved 200 at research time)
Physical-world floating-island analogues — **the best real-world refs, safely hotlinkable from Wikimedia**:

- **Roraima / Kukenán tepuis** (the plateau mesas that inspired Laputa's floating rock):
  `https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Kukenan_Roraima_GS.jpg/1280px-Kukenan_Roraima_GS.jpg` **[S — Commons API]**
- **Zhangjiajie sandstone spires** ("Avatar Hallelujah Mountains" — sky-forest diorama feel):
  `https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Sandstone_spire_forest_Zhangjiajie_Hunan.jpg/1280px-Sandstone_spire_forest_Zhangjiajie_Hunan.jpg` **[S]**
- **Sigiriya Lion Rock, Sri Lanka** (dusk-gold photography classic — a lone rock-island over the jungle):
  `https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Sigiriya.jpg/1280px-Sigiriya.jpg` **[S]**
- **Laputa screencap (fair-use film still, en.wikipedia — hotlinkable; note: not for redistribution)**:
  `https://upload.wikimedia.org/wikipedia/en/b/b9/Laputa_Castle_in_the_Sky%2C_screencap_2.jpg` **[S]**

### 3.3 Golden-hour / twilight landscape photographers (real series — screenshot their sites)
| Photographer | Site (verified) | What their series are |
|---|---|---|
| **Marc Adamus** | https://marcadamus.com ✅ 200 | Dusk/storm-light wilderness — the "expensive atmosphere" benchmark in photography. |
| **Ted Gore** | https://tedgore.com ✅ 200 | Glowing twilight + light-painted landscapes — direct rim-light/haze reference. |
| **Daniel Kordan** | https://danielkordan.com ✅ 200 | Golden-hour travel landscapes; sky-to-horizon gradient chains. |
| **Albert Dros** | https://albertdros.com ✅ 200 | Self-declared golden-hour obsessive; the color of low sun on terrain. |

---

## 4. TYPE PAIRINGS — editorial serif × grotesk (free licenses, live specimens)

*All specimen URLs verified HTTP 200 at research time. Fontshare = ITF's free license: **free for commercial use, no attribution** (fontshare.com policy). Google Fonts families below are **SIL OFL**.*

| # | Serif (editorial) | Grotesk (UI/body) | Live specimen URLs | License note |
|---|---|---|---|---|
| 1 | **Fraunces** — wonky, soft, optical-size-aware "old-style revival" with personality | **General Sans** — neutral-but-warm grotesk (Satoshi-class) | fonts.google.com/specimen/Fraunces · fontshare.com/fonts/general-sans | OFL (Google) · Fontshare free-commercial |
| 2 | **Instrument Serif** — chic display serif, single weight, very "premium dev site" | **Satoshi** — the current web-grotesk default | fonts.google.com/specimen/Instrument+Serif · fontshare.com/fonts/satoshi | OFL · Fontshare free-commercial |
| 3 | **Zodiak** — high-contrast editorial serif with sharp terminals (fashion-mag energy) | **Switzer** — clean, technical grotesk | fontshare.com/fonts/zodiak · fontshare.com/fonts/switzer | Fontshare free-commercial ×2 |
| 4 | **Newsreader** — text-first editorial serif (magazine body pedigree) | **Space Grotesk** — quirky-tech grotesk (the Three.js-community favorite) | fonts.google.com/specimen/Newsreader · fonts.google.com/specimen/Space+Grotesk | OFL ×2 (Google) |
| 5 | **Editorial New** — high-fashion condensed-contrast serif | **Archivo** — sturdy grotesk with optical sizes | fontshare.com/fonts/editorial-new · fonts.google.com/specimen/Archivo | Fontshare free-commercial · OFL |

**Direction note:** pair #1 (Fraunces × General Sans) is the closest to the brief's "Fraunces×Satoshi-class" instinct — Fraunces gives the golden-hour warmth, General Sans keeps the tech edge. Pair #2 (Instrument Serif × Satoshi) is the most common "award-site" look right now.

---

## 5. PALETTE PROPOSALS — three exact swatch sets

*Hex values are **derived by design** from documented photographic conventions: golden hour = sun < ~6° elevation, CCT ~3000–3500K, warm orange sky near horizon, cool zenith; dusk/magic hour = ~4000–5000K, rose-violet gradients; blue hour = ~7000–9000K, deep Prussian blue zenith with warm artificial-light counterpoints. Swatch roles: **sky** (zenith→horizon gradient endpoints), **haze** (fog/scattering color — drives your Fog color), **rim-light** (sun-facing edge color on terrain/character), **ink** (text/shadow near-black), **accent** (single interactive/UI highlight).*

### Palette A — "Golden Hour / Breton-leaning" *(hero state; seeded by Awwwards' extraction of #A57B5B + #7B9F17)*
| Role | Hex | Use |
|---|---|---|
| sky — zenith | `#6FA4C9` | top of sky gradient / background shader |
| sky — horizon | `#FFB36B` | low sun band; also light color |
| haze | `#F4DFB6` | Fog color, distance fade |
| rim-light | `#FFC46B` | sun-edge highlight on grass/rock |
| ink | `#2B2726` | type (paired over warm scenes) |
| accent — lichen | `#7B9F17` | the Breton olive-green (foliage/trees) |
| accent — terracotta | `#A57B5B` | the Breton tan (paths, wood, UI bits) |

### Palette B — "Dusk / Magic Hour" *(transition state: golden→violet, 10–30 min after sunset)*
| Role | Hex | Use |
|---|---|---|
| sky — zenith | `#3D4C8C` | deep periwinkle top |
| sky — mid | `#B56E8F` | rose band |
| sky — horizon | `#EF9B5E` | last warm light (the "edge of day" glow) |
| haze | `#D8A6B2` | pinked fog — signature dusk depth cue |
| rim-light | `#FFC879` | longer-wavelength rim on everything |
| ink | `#211D2E` | near-black with violet cast |
| accent | `#E8A05C` | ember/amber highlight (single spot) |

### Palette C — "Blue Hour / Night Island" *(terminal state: matches his "night / goodnight / mysterious-ambience" audio mood; star-field, campfire)*
| Role | Hex | Use |
|---|---|---|
| sky — zenith | `#0F1F42` | Prussian night top (starfield base) |
| sky — mid | `#2B4E7E` | mid-night blue |
| sky — horizon | `#5E8CB4` | cold teal last-light line |
| haze | `#7FA0C4` | cold fog; multiply with ink for depth |
| rim-light | `#A9C9E8` | moonlight / cold rim |
| ink | `#0A1122` | true night ink for type |
| accent | `#D97757` | campfire/ember warmth — the single warm point (Google "firewatch dusk" for the logic) |

**How to use:** build one shader gradient using each palette's three sky values (top→mid→horizon) and animate the three palettes on your day/night timeline; set Three.js `Fog` color = each palette's **haze** (with matching exposure); tint rim-light materials with the rim value; keep **ink** for all DOM type so text stays legible across the evolution.

---

*Research notes: jordan-breton.com bundles inspected Aug 22, 2026; FWA page is bot-protected (facts sourced via his site footer link, his X account, and press roundups). ArtStation pages are bot-walled — use browser screenshots for image capture; the Wikimedia URLs in §3.2 are direct-hotlink safe.*