# Validation Report — v1.0

Executed 2026-08-23 against `main` @ `HEAD` (pre-tag). Contract: docs/validation-contract.md (38 assertions / 17 slices).
Method: `C` = static/unit/build evidence (vitest suite, bundle grep, HTTP checks). `H/E` = live CDP probes + vision audits by orchestrator; captures in docs/qa/.

| Slice | Assertions | Result | Evidence |
|---|---|---|---|
| SCF | C-001 · C-002 · H-001 · E-001 | ✅✅✅✅ | CI green every push; MIT LICENSE + README; prod URL 200 doctype shell; live grep `crosaffic` = 0 |
| JRN | C-001 · C-002 · C-003 · H-001 · E-001 | ✅✅✅✅✅ | store unit tests; probe: ArrowRight ×6 → HUD 02→07 (all 7 reachable); thrash 10× end↔start settles correctly |
| SKY | C-001 · H-001 | ✅✅ | palette endpoints in palettes.ts unit-tested; measured contrast golden 10.0:1 / blue-hour 6.27:1 ≥4.5 |
| HERO | C-001* · H-001 | ✅✅ | procedural hero (no GLB — budget trivially met; superseded by #19 upgrade path); name + headline visible on load (vision QA) |
| ISL | C-001 · C-002* · H-001 | ✅✅✅ | WAYPOINTS roster matches §2 exactly; procedural islands ≈0 bytes; HUD chapter labels verified at all stops |
| GDN | C-001 · H-001 · H-002 · E-001 | ✅✅✅✅ | entry chunk grep 0 rapier refs; mouse grab/throw probe (cursor lifecycle); touch probe w/ drag-frame telemetry + frozen scrollY; tier caps 12/18/24 unit-tested |
| DUST | C-001 · H-001 | ✅✅ | zero image assets (procedural sprites only); behavior matrix probed live: follow/curious/grove/nap |
| FX | C-001 · H-001 | ✅✅ | FX_STACK contract test; FX lazy chunk; mobile capture vision-audited grain+vignette visible |
| PRE | C-001 · H-001 | ✅✅ | milestone reducer tests (monotonic, 100% only on first frame); Fast-3G probe: instant boot shell → counter climbs, whimsy rotates ≤2.5 s |
| SND | C-001 · H-001 | ✅✅ | 7 mono Ogg / 1.03 MB total / ffprobe-verified + AUDIO-SOURCES.md; silent-default + persistence probed (`__soundArmed=true` on real gesture) |
| HUD | H-001 · H-002 | ✅✅ | logotype/nav/sound/crystal pills present at all 7 stops (probed); click-to-copy verified with feedback state |
| EGG | C-001 · H-001 | ✅✅ | codebase grep: exactly two secrets; 5-crystal hunt → count/persist/toast/chime verified; Konami night reversible (luminance −33/+27 Δ) |
| OVL | C-001 · H-001 · E-001 | ✅✅✅ | uniform schema test; all six open via monument clicks AND digits 1–6, ESC close, facts from content module; Repeato solo-voice test |
| WRT | H-001 | ✅ | three posts HTTP 200 at /writing/*, vision-audited readable |
| MOB | C-001 · C-002 · H-001† · E-001 | ✅✅✅†✅ | dist 4.2 MB, entry 276 KB gzip; ladder unit tests + live auto-step to 0.45 DPR observed; heap steady-state +4.4 %; †software-GL only (hardware matrix = accepted GAP-002); portrait FOV reframe engaged |
| A11Y | C-001 · H-001 · H-002 | ✅✅✅ | reduced-motion honored (snap helpers + zeroed bob); **Lighthouse 100/100**; focus return probed via overlay cycle |
| SHP | C-001 · H-001 · E-001 | ✅✅✅ | links audited (GitHub 200s, LinkedIn live-behind-bot-wall, Kaggle/dusty/suspended absent); résumé PDF 200 @ 67,547 B, dossier-facts vision-audited; X omitted pending user flag |

**Result: 38/38 executed — all passing.** Accepted gaps (documented in contract): GAP-001 X verification (user homework — site safe either way), GAP-002 physical-device FPS matrix (emulation-only per locked protocol), GAP-003 whimsy copy (shipped).

*HERO-C-001/ISL-C-002 byte budgets are trivially met by the procedural art direction (no multi-MB GLBs ship at v1.0); curated DRACO/KTX2 assets remain ticket #19 as the post-ship upgrade path.
