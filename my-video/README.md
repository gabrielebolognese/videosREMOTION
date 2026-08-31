# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npm run render
```

Renders the `HundredDays` composition to `out/HundredDays.mp4` and then corrects
the audio sync (see below). A plain `npx remotion render HundredDays` also works,
but leaves the audio 42.67ms late.

## HundredDays

The 100 DAYS reel. One composition, 1440x2560, 60fps, 1271 frames, built over
`public/0829.mp4`.

- `src/HundredDays.tsx` - the composition root and the layer order.
- `src/lib/` - shared primitives: the caption band and its flat unit list, the
  word-reveal and line-exit gestures, the corner spikes, the outlined type, the
  hero elements, the placeholder plates.
- `src/scenes/` - one file per scene: the two full-screen scenes and the two
  hero moments.

Seconds are the source of truth. Everything derives its frame with `sec()` from
`src/lib/tokens.ts`; no frame numbers are written by hand.

Only the footage is wrapped in `<Sequence>`, and only so it can be trimmed
around the 5.22-10.23 hole. Every graphics layer sits directly under the
composition and reads the absolute frame, which is what keeps the spike rotation
continuous across the 6.95 cut and lets a caption unit span a footage cut
without being re-keyed.

## AgencyExplainer

A silent monochrome 3D-look brand explainer, 1080x1920, 60fps, 2010 frames,
33.5s. No footage and no audio of any kind.

```console
npm run render:agency
```

- `src/agency/AgencyExplainer.tsx` - composition root and layer order.
- `src/agency/lib/tokens.ts` - palette, plus the shot running order. Cuts are
  derived from the per-shot durations, never written out as frame numbers.
- `src/agency/lib/` - studio backdrop, construction grid, corner leaves, the
  wordmark lock-up, the kinetic type primitives.
- `src/agency/props/` - the hero props, drawn as greyscale SVG with gloss
  gradients, specular streaks and contact shadows.
- `src/agency/scenes/Shot01..Shot13.tsx` - one file per shot.

### Silence

`--muted` is not optional on this one. Remotion's `getShouldRenderAudio`
returns `'maybe'` when the asset list is not known upfront, and `'maybe'`
creates an AAC track even though the composition contains no audio source at
all. `--muted` forces it to `'no'`, and the render comes out with a single
video stream. The `render:agency` script passes it.

### Placeholders

Everything that can be authored is drawn: the rocket, the magnifying glass and
its magnifying lens, the suited silhouette, the payment cards, the app tiles,
the cell ring, the laptop and stylus, the jigsaw pieces, the balance. Only the
elements that genuinely need photography or a 3D render - the hands and the
marble philosopher - are labelled grey placeholders at the size and position
the real assets will occupy.

## DayZero

The second reel: a motion graphics piece over the same footage, 1080x1920,
60fps, 1271 frames, built on `public/raw.mp4`.

```console
npm run render:dayzero
```

- `src/dayzero/DayZero.tsx` - composition root and layer order.
- `src/dayzero/lib/script.ts` - the whole script in one manifest. Timing,
  treatment, entrance and zone for all 31 phrases live here, and the scenes
  read `from`/`to` from it rather than restating a number.
- `src/dayzero/lib/treatments/` - the caption vocabulary, one component per
  treatment. Built before any scene so scenes compose from them.
- `src/dayzero/scenes/` - one file per section.

Run `node scripts/audit-script.mjs` to check the composition rules against the
manifest: phrase timing, no consecutive repeat of a treatment / entrance /
zone, no treatment used more than three times, and all five zones present in
every ten second window.

As in HundredDays, only the footage is wrapped in `<Sequence>` - and only so it
can be trimmed around the 2.10-7.30 hole. Every graphics layer sits directly
under the composition and reads the absolute frame, which is what keeps the
corner stars rotating continuously through all four cuts and lets the ring
around "start" survive the footage cut at 10.23 that lands in the middle of it.

### Audio sync

Remotion encodes the audio to a raw ADTS stream and stream-copies it into the
MP4. ADTS carries no encoder-delay metadata, so the AAC priming - 2048 samples,
42.67ms, about 2.5 frames at 60fps - ends up in the file uncompensated and the
audio plays late. This is a Remotion-wide behaviour, not specific to this
composition: rendering with `--audio-codec=pcm-16` produces audio that
correlates with the source at r = 1.000000 and zero lag.

`scripts/fix-audio-sync.mjs` corrects it with a stream copy, seeking the audio
input by exactly two AAC frames so ffmpeg drops the priming and nothing else.
No re-encode, no trim of actual content.


**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
