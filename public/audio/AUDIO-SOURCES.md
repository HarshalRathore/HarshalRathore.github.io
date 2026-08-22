# Audio Sources & License

Every file in this directory was **synthesized in-repo** by
[`scripts/build-audio.sh`](../../scripts/build-audio.sh) using only ffmpeg's
built-in signal generators (`anoisesrc`, `sine`) and filters
(`lowpass`, `bandpass`, `highpass`, `tremolo`, `vibrato`, `amix`, `afade`).

No third-party recordings, samples, or libraries are used.

The Career Archipelago sound kit is dedicated to the public domain
(CC0 / CC0 1.0 equivalent): copy, modify, distribute, and use freely,
no attribution required.

| File | Recipe |
|---|---|
| `wind.ogg` | brown noise → 400 Hz lowpass ×2, 45 s loop |
| `waterfall.ogg` | white noise → bandpass 1600 Hz ±800, slow tremolo, 40 s loop |
| `birds.ogg` | pink-noise bed + vibrato/tremolo sine chirps, 30 s loop |
| `night.ogg` | pulsed highpassed white noise (crickets) over dark sine pad, 45 s loop |
| `chime.ogg` | 880/1320/1760 Hz sine cluster, exponential decay, one-shot |
| `achieve.ogg` | C5→G5 rising two-note motif, one-shot |
| `ui-tick.ogg` | 1800 Hz blip with fast fades, one-shot |

Regenerate at any time: `bash scripts/build-audio.sh`
