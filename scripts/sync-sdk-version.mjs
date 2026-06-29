#!/usr/bin/env node
// Rewrites the shared SDK version wherever the docs advertise it, so a release
// bump propagates to the site. Mirrors the SDK's tools/release.py DECLARATIONS
// approach (per-file regex, version in capture group 2). The four device ports
// share one $sdk_version; the relay packages have their own versions and are
// intentionally NOT touched here.
//
//   node scripts/sync-sdk-version.mjs <version>     # rewrite to <version>
//   node scripts/sync-sdk-version.mjs --check <version>   # fail if any drift (no write)
//
// Run from the docs repo root. No dependencies (node:fs only).

import { readFileSync, writeFileSync } from "node:fs";

// Each entry: a file and the patterns that carry the SDK version. Every pattern
// captures (prefix)(version)(suffix); `min` is how many matches we require, so a
// doc restructure that drops a version surface fails loudly instead of silently
// going stale.
const DECLARATIONS = [
  {
    file: "content/docs/index.mdx",
    patterns: [
      // "...on the wire — `0.2.4` —"
      {
        re: /(reports the same SDK version on the wire — `)([^`]+)(`)/,
        min: 1,
      },
      // Port-matrix rows for the four device ports (NOT the relay rows).
      {
        re: /(\]\(\/sdks\/(?:esp-idf|c-posix|micropython|arduino)\) \| (?:Stable|Preview) · `)([^`]+)(`)/g,
        min: 4,
      },
    ],
  },
  {
    file: "content/docs/quickstart.mdx",
    patterns: [
      { re: /(honch\/honch\^)(\d[\d.]*)()/g, min: 1 }, // esp-idf component dep
      { re: /(honch\/Honch@\^)(\d[\d.]*)()/g, min: 1 }, // platformio lib dep
    ],
  },
  {
    file: "content/docs/sdks/esp-idf.mdx",
    patterns: [
      { re: /((?:Stable|Preview) · `)([^`]+)(`)/, min: 1 },
      { re: /(honch\/honch\^)(\d[\d.]*)()/g, min: 1 },
    ],
  },
  {
    file: "content/docs/sdks/c-posix.mdx",
    patterns: [{ re: /((?:Stable|Preview) · `)([^`]+)(`)/, min: 1 }],
  },
  {
    file: "content/docs/sdks/micropython.mdx",
    patterns: [{ re: /((?:Stable|Preview) · `)([^`]+)(`)/, min: 1 }],
  },
  {
    file: "content/docs/sdks/arduino.mdx",
    patterns: [
      { re: /((?:Stable|Preview) · `)([^`]+)(`)/, min: 1 },
      { re: /(honch\/Honch@\^)(\d[\d.]*)()/g, min: 1 },
    ],
  },
];

const args = process.argv.slice(2);
const check = args[0] === "--check";
const version = check ? args[1] : args[0];

if (!version || !/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(version)) {
  console.error(
    `usage: sync-sdk-version.mjs [--check] <semver>  (got: ${version ?? "nothing"})`,
  );
  process.exit(2);
}

let changedFiles = 0;
let drift = 0;

for (const { file, patterns } of DECLARATIONS) {
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    console.error(`MISSING: ${file}`);
    process.exit(1);
  }
  let updated = text;
  for (const { re, min } of patterns) {
    let count = 0;
    updated = updated.replace(re, (_m, pre, ver, suf) => {
      count++;
      if (ver !== version) drift++;
      return pre + version + suf;
    });
    if (count < min) {
      console.error(`PATTERN NOT FOUND (${count}/${min}) in ${file}: ${re}`);
      process.exit(1);
    }
  }
  if (updated !== text) {
    changedFiles++;
    if (!check) {
      writeFileSync(file, updated, "utf8");
      console.log(`updated ${file}`);
    } else {
      console.log(`would update ${file}`);
    }
  }
}

if (check) {
  if (drift > 0) {
    console.error(
      `\ndocs SDK version drift: ${drift} occurrence(s) not at ${version}. Run: node scripts/sync-sdk-version.mjs ${version}`,
    );
    process.exit(1);
  }
  console.log(`docs SDK version is in sync at ${version}`);
} else {
  console.log(
    changedFiles
      ? `\nsynced ${changedFiles} file(s) to ${version}`
      : `\nalready at ${version}`,
  );
}
