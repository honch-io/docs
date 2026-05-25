# Honch Docs

This is the Honch documentation site. It is a Next.js app using Fumadocs MDX.

## Commands

```bash
npm run dev
npm run types:check
npm run lint
```

`npm run dev` starts the local development server. By default, Next.js serves the site at `http://localhost:3000`.

`npm run types:check` regenerates Fumadocs/Next.js generated files and runs TypeScript with `tsc --noEmit`.

`npm run lint` runs Biome. At the time of the source audit, this command reports existing Biome/Tailwind/import-format diagnostics that are separate from the SDK docs content.

## Content

User-facing docs live in `content/docs`. The current docs cover the SDK
overview, quickstart, shared SDK concepts, FAQ, shared C core, ESP-IDF,
C/POSIX, MicroPython, Arduino ESP32, and React Native Relay.

The docs source is configured in `source.config.ts` and loaded by `src/lib/source.ts`.

The SDK accuracy audit lives in `DOCS_SOURCE_AUDIT.md`.
