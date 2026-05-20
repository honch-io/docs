# Docs Source Audit

This document maps the user-facing docs in `content/docs/` to the source files
that prove each claim. It is intentionally conservative: if a line is prose that
describes SDK behavior, the evidence must be implementation, public headers,
component metadata, examples, or tests. Blank lines, headings, frontmatter, code
fence delimiters, table separators, and navigation metadata are grouped as
structure; every nonblank content line in `content/docs/` is covered by one of
the ranges below.

Status: pass 1 complete; passes 2 and 3 still pending. This audit is not final
until the docs have been verified in three independent passes and all mismatches
have been corrected.

## Source Roots

| Area | Evidence root |
| --- | --- |
| ESP-IDF SDK | `../SDK/esp-idf/honch/`, `../SDK/esp-idf/example/`, `../SDK/esp-idf/tests/` |
| C/POSIX SDK | `../SDK/c-core/` |
| MicroPython SDK | `../SDK/micropython/` |
| Docs rendering/navigation | `source.config.ts`, `src/lib/source.ts`, `content/docs/meta.json`, `content/docs/sdks/meta.json` |

## Scope Notes

| Path | Scope decision | Evidence |
| --- | --- | --- |
| `content/docs/**` | User-facing product docs. Every nonblank content line is mapped below. | `source.config.ts:6-17` configures `content/docs` as the docs source. |
| `README.md` | Project scaffold README, not published product documentation. It is included here as repository documentation but is not part of the user-facing docs tree. | `README.md:1-45`; `source.config.ts:6-17` excludes it from the docs source. |
| Generated/dependency files | `package-lock.json`, `tsconfig.json`, `biome.json`, and `components.json` are build/config metadata, not product docs. | Docs app configuration and package metadata. |

## `README.md`

| Lines | Claim or role | Source evidence |
| --- | --- | --- |
| 1-16 | Fumadocs/Next.js scaffold README with development server commands and localhost URL. | `package.json:5-11` defines `dev`; `source.config.ts:6-17` and `src/lib/source.ts:7-10` show this is a Fumadocs-backed Next.js docs app. |
| 18-35 | Scaffold route/source orientation. The listed paths are template-oriented; actual local paths use `src/lib/source.ts` and `src/app/docs`. | `src/lib/source.ts:1-36`; `src/app/docs`; `source.config.ts:6-17`. |
| 37-45 | External learning links for Next.js and Fumadocs. | External scaffold references; no SDK behavior claim. |

## `content/docs/meta.json`

| Lines | Claim or role | Source evidence |
| --- | --- | --- |
| 1-12 | Fumadocs metadata for the Documentation nav, including getting-started, SDK, and resources sections. | `source.config.ts:6-17` declares `content/docs` as the docs and meta source; `src/lib/source.ts:7-10` loads that source into Fumadocs. |

## `content/docs/sdks/meta.json`

| Lines | Claim or role | Source evidence |
| --- | --- | --- |
| 1-6 | Fumadocs metadata for the SDKs section, currently exposing the ESP-IDF guide. | `source.config.ts:6-17`; `content/docs/sdks/esp-idf.mdx:1-3` is the referenced page. |

## `content/docs/index.mdx`

| Lines | Claim or role | Source evidence |
| --- | --- | --- |
| 1-4 | Frontmatter title and description for the intro page. | Docs metadata only; loaded by `source.config.ts:6-17` and `src/lib/source.ts:7-10`. |
| 6 | Product positioning: connected-hardware analytics covering boot cycles, firmware updates, connectivity, battery health, and custom events. | ESP-IDF lifecycle/telemetry support: `../SDK/esp-idf/honch/src/lifecycle.c:111-170`; custom tracking: `../SDK/esp-idf/honch/src/honch.c:199-269`; C/POSIX status list: `../SDK/c-core/README.md:15-35`; MicroPython contract list: `../SDK/micropython/README.md:5-12`. |
| 8 | SDK runs in firmware/app code, queues locally, and flushes to Honch over HTTP(S) when connected. | ESP-IDF component registration: `../SDK/esp-idf/honch/CMakeLists.txt:1-25`; queue: `../SDK/esp-idf/honch/src/queue.c:234-361`; flush/connection gate: `../SDK/esp-idf/honch/src/scheduler.c:45-67`; transport endpoint: `../SDK/esp-idf/honch/src/transport.c:82-90`, `../SDK/esp-idf/honch/src/transport.c:131-163`. |
| 10-16 | How the SDK flow works: integrate, initialize, track, batch/flush, view data. | ESP-IDF public API/config: `../SDK/esp-idf/honch/include/honch.h:34-64`; init lifecycle: `../SDK/esp-idf/honch/src/honch.c:43-165`; tracking: `../SDK/esp-idf/honch/src/honch.c:199-269`; batch size and retry: `../SDK/esp-idf/honch/src/scheduler.c:20-23`, `../SDK/esp-idf/honch/src/scheduler.c:69-142`; capture/storage end-to-end tests: `../SDK/esp-idf/tests/test_cbor_migration.py:74-98`. |
| 18-28 | Auto-collected properties and lifecycle events. | Encoder auto properties: `../SDK/esp-idf/honch/src/encoder.c:320-332`, `../SDK/esp-idf/honch/src/encoder.c:420-453`; lifecycle events: `../SDK/esp-idf/honch/src/lifecycle.c:41-66`, `../SDK/esp-idf/honch/src/lifecycle.c:111-170`; session APIs: `../SDK/esp-idf/honch/src/honch.c:318-383`. |
| 30-36 | Supported platform table. | ESP-IDF component metadata: `../SDK/esp-idf/honch/idf_component.yml:1-11`; C/POSIX status: `../SDK/c-core/README.md:13-35`; MicroPython status: `../SDK/micropython/README.md:13-16`; future platform intent: `../SDK/c-core/README.md:5-11`. |
| 38-44 | Navigation cards for quickstart, ESP-IDF guide, and FAQ. | Matching docs files exist: `content/docs/quickstart.mdx`, `content/docs/sdks/esp-idf.mdx`, `content/docs/faq.mdx`; nav metadata: `content/docs/meta.json:1-12`. |

## `content/docs/quickstart.mdx`

| Lines | Claim or role | Source evidence |
| --- | --- | --- |
| 1-4 | Frontmatter title and description. | Docs metadata only; loaded by `source.config.ts:6-17`. |
| 6-12 | Quickstart scope and prerequisites: ESP-IDF >= 5.0, ESP32-family board, API key. | Component dependency on IDF >= 5.0: `../SDK/esp-idf/honch/idf_component.yml:5-11`; ESP-IDF API usage: `../SDK/esp-idf/honch/CMakeLists.txt:13-25`; target family documented by ESP-IDF SDK docs and Kconfig target condition: `../SDK/esp-idf/honch/Kconfig:52-61`; API key config: `../SDK/esp-idf/honch/include/honch.h:34-46`. |
| 14-28 | Installation via ESP Component Manager or git submodule. | Component metadata name/version: `../SDK/esp-idf/honch/idf_component.yml:1-4`; ESP-IDF README installation examples: `../SDK/esp-idf/README.md:14-27`. |
| 30-35 | Initialization requirements: NVS must be initialized; Wi-Fi should be set up but can connect later. | NVS open/fail in identity init: `../SDK/esp-idf/honch/src/identity.c:49-95`; `honch_init` calls identity first and returns errors: `../SDK/esp-idf/honch/src/honch.c:96-105`; scheduler skips flush until connected: `../SDK/esp-idf/honch/src/scheduler.c:58-67`; lifecycle sets connected after IP: `../SDK/esp-idf/honch/src/lifecycle.c:54-66`. |
| 37-67 | Minimal `app_main` shape: include SDK/NVS headers, static buffer, NVS init, Wi-Fi setup placeholder, `honch_config_t`, `honch_init`. | Public config fields: `../SDK/esp-idf/honch/include/honch.h:34-46`; config validation: `../SDK/esp-idf/honch/src/honch.c:50-55`; example app NVS/Wi-Fi/config/init: `../SDK/esp-idf/example/main/app_main.c:119-147`. |
| 69-74 | Init side effects: identity, firmware check, boot event, scheduler. | Identity init: `../SDK/esp-idf/honch/src/identity.c:49-95`; init order: `../SDK/esp-idf/honch/src/honch.c:99-165`; firmware check: `../SDK/esp-idf/honch/src/lifecycle.c:129-150`; boot event: `../SDK/esp-idf/honch/src/lifecycle.c:111-121`; scheduler init: `../SDK/esp-idf/honch/src/scheduler.c:200-224`. |
| 75-85 | Custom event tracking with JSON properties and auto-stamped metadata. | `honch_track`: `../SDK/esp-idf/honch/src/honch.c:199-269`; JSON parse behavior: `../SDK/esp-idf/honch/src/encoder.c:563-649`; auto properties: `../SDK/esp-idf/honch/src/encoder.c:320-332`, `../SDK/esp-idf/honch/src/encoder.c:420-453`. |
| 87-98 | Session start/end behavior and `$session_id`. | Public API: `../SDK/esp-idf/honch/include/honch.h:55-56`; session implementation: `../SDK/esp-idf/honch/src/honch.c:318-383`; session ID generation/access: `../SDK/esp-idf/honch/src/identity.c:138-158`; encoding `$session_id`: `../SDK/esp-idf/honch/src/encoder.c:444-447`. |
| 100-112 | GPIO tracking, edge modes, pull-up input, ISR deferral, 50ms debounce. | Public enum/API: `../SDK/esp-idf/honch/include/honch.h:28-32`, `../SDK/esp-idf/honch/include/honch.h:63`; GPIO implementation: `../SDK/esp-idf/honch/src/gpio.c:20-21`, `../SDK/esp-idf/honch/src/gpio.c:36-70`, `../SDK/esp-idf/honch/src/gpio.c:146-192`. |
| 114-129 | Build/flash/monitor commands and expected log lines. | Example project instructions/source: `../SDK/esp-idf/README.md:120-139`; init log: `../SDK/esp-idf/honch/src/honch.c:157`; successful send log: `../SDK/esp-idf/honch/src/transport.c:177-179`; IP log: `../SDK/esp-idf/honch/src/lifecycle.c:62-65`. |
| 131-135 | Next-step links. | Existing docs files and SDK repo paths: `content/docs/sdks/esp-idf.mdx`, `content/docs/faq.mdx`, `../SDK/esp-idf/example/`. |

## `content/docs/faq.mdx`

| Lines | Claim or role | Source evidence |
| --- | --- | --- |
| 1-6 | Frontmatter and section heading. | Docs metadata only; loaded by `source.config.ts:6-17`. |
| 8-14 | Product/platform overview and SDK availability. | ESP-IDF component metadata: `../SDK/esp-idf/honch/idf_component.yml:1-11`; C/POSIX status: `../SDK/c-core/README.md:13-35`; MicroPython status: `../SDK/micropython/README.md:13-16`. |
| 16-25 | RAM/task/resource components: event buffer API, RAM queue, scheduler task, GPIO task. | Config field: `../SDK/esp-idf/honch/include/honch.h:40-41`; RAM/NVS queue: `../SDK/esp-idf/honch/src/queue.c:24-41`, `../SDK/esp-idf/honch/src/queue.c:234-261`; scheduler task stack: `../SDK/esp-idf/honch/src/scheduler.c:214`; GPIO task stack and init: `../SDK/esp-idf/honch/src/gpio.c:72-91`. |
| 27-35 | Offline operation, queue durability, CBOR, gzip. | Connected gate and flush: `../SDK/esp-idf/honch/src/scheduler.c:45-67`; queue push/spill/drop: `../SDK/esp-idf/honch/src/queue.c:290-361`; CBOR event/batch encoding: `../SDK/esp-idf/honch/src/encoder.c:482-518`, `../SDK/esp-idf/honch/src/encoder.c:651-740`; gzip transport: `../SDK/esp-idf/honch/src/transport.c:21-80`, `../SDK/esp-idf/honch/src/transport.c:117-129`; Kconfig gzip target constraints: `../SDK/esp-idf/honch/Kconfig:52-70`. |
| 37-45 | Integration: NVS requirement and install options. | NVS identity init: `../SDK/esp-idf/honch/src/identity.c:49-95`; install metadata/README: `../SDK/esp-idf/honch/idf_component.yml:1-11`, `../SDK/esp-idf/README.md:14-27`. |
| 47-52 | API key configuration approaches. | Public config API: `../SDK/esp-idf/honch/include/honch.h:34-46`; example config uses `CONFIG_HONCH_API_KEY`: `../SDK/esp-idf/example/main/app_main.c:133`; example menuconfig referenced by docs: `../SDK/esp-idf/example/main/Kconfig.projbuild`. |
| 54-60 | GPIO limits and ISR guidance. | GPIO max/debounce/task/ISR: `../SDK/esp-idf/honch/src/gpio.c:20-21`, `../SDK/esp-idf/honch/src/gpio.c:36-70`, `../SDK/esp-idf/honch/src/gpio.c:134-192`; `honch_track` takes mutex/allocates through encode+queue: `../SDK/esp-idf/honch/src/honch.c:211-239`. |
| 62-84 | Dashboard troubleshooting: init/send/API/Wi-Fi/server logs and retries. | Init log: `../SDK/esp-idf/honch/src/honch.c:157`; successful send and auth handling: `../SDK/esp-idf/honch/src/transport.c:177-188`; connected gate/log: `../SDK/esp-idf/honch/src/lifecycle.c:62-65`, `../SDK/esp-idf/honch/src/scheduler.c:58-67`; retry/backoff: `../SDK/esp-idf/honch/src/scheduler.c:31-42`, `../SDK/esp-idf/honch/src/scheduler.c:132-140`. |
| 86-96 | NVS errors and erase/reinit impact. | NVS open/read/write errors: `../SDK/esp-idf/honch/src/identity.c:49-95`; example erase/reinit pattern: `../SDK/esp-idf/example/main/app_main.c:119-124`; MAC-derived ID: `../SDK/esp-idf/honch/src/identity.c:24-30`. |
| 98-105 | Event queue pressure settings and flush controls. | Queue depths and spill/drop: `../SDK/esp-idf/honch/Kconfig:19-42`, `../SDK/esp-idf/honch/src/queue.c:107-168`, `../SDK/esp-idf/honch/src/queue.c:290-361`; flush threshold/manual notify: `../SDK/esp-idf/honch/src/honch.c:248-251`, `../SDK/esp-idf/honch/src/honch.c:385-393`. |
| 107-112 | GPIO troubleshooting. | GPIO config/logging: `../SDK/esp-idf/honch/src/gpio.c:146-192`; example BOOT button: `../SDK/esp-idf/example/main/app_main.c:149-152`. |
| 114-126 | Data/privacy: auto properties, identity, reset, transport encryption guidance. | Auto properties: `../SDK/esp-idf/honch/src/encoder.c:420-453`; identity/reset: `../SDK/esp-idf/honch/src/identity.c:24-30`, `../SDK/esp-idf/honch/src/identity.c:114-135`, `../SDK/esp-idf/honch/src/identity.c:161-194`; transport sends to configured URL with TLS bundle available: `../SDK/esp-idf/honch/src/transport.c:82-90`, `../SDK/esp-idf/honch/src/transport.c:131-136`; local HTTP is used in C/POSIX/MicroPython E2E defaults: `../SDK/c-core/README.md:77-85`, `../SDK/micropython/README.md:245-253`. |
| 128-130 | External next-step links. | Existing examples/readmes: `../SDK/esp-idf/example/`, `../SDK/c-core/example/`, `../SDK/micropython/examples/`. |

## `content/docs/sdks/esp-idf.mdx`

| Lines | Claim or role | Source evidence |
| --- | --- | --- |
| 1-8 | Page metadata, ESP-IDF component overview, CBOR event encoding. | Component metadata and CMake: `../SDK/esp-idf/honch/idf_component.yml:1-11`, `../SDK/esp-idf/honch/CMakeLists.txt:1-25`; event encoding: `../SDK/esp-idf/honch/src/encoder.c:482-518`; batch encoding: `../SDK/esp-idf/honch/src/encoder.c:651-740`. |
| 10-15 | Requirements: IDF >= 5.0, ESP32-family Wi-Fi board, API key, Wi-Fi for delivery. | `../SDK/esp-idf/honch/idf_component.yml:5-11`; ESP-IDF APIs in `../SDK/esp-idf/honch/CMakeLists.txt:13-25`; config API key: `../SDK/esp-idf/honch/include/honch.h:34-46`; connected gate: `../SDK/esp-idf/honch/src/scheduler.c:58-67`. |
| 17-37 | Installation options. | `../SDK/esp-idf/README.md:14-27`; component metadata: `../SDK/esp-idf/honch/idf_component.yml:1-4`. |
| 39-57 | `honch_config_t` fields, defaults, and behavior. | Public struct: `../SDK/esp-idf/honch/include/honch.h:34-46`; config validation/defaults/copies: `../SDK/esp-idf/honch/src/honch.c:50-88`; battery runtime: `../SDK/esp-idf/honch/src/encoder.c:68-102`, `../SDK/esp-idf/honch/src/lifecycle.c:152-170`. |
| 59-71 | Kconfig options and defaults. | `../SDK/esp-idf/honch/Kconfig:1-72`; queue usage: `../SDK/esp-idf/honch/src/queue.c:18-28`, `../SDK/esp-idf/honch/src/queue.c:309-360`; RSSI cache usage: `../SDK/esp-idf/honch/src/encoder.c:84-101`; gzip target constraints: `../SDK/esp-idf/honch/Kconfig:52-70`. |
| 73-115 | Initialization code and sequence. | Example app: `../SDK/esp-idf/example/main/app_main.c:119-147`; init implementation: `../SDK/esp-idf/honch/src/honch.c:43-165`; NVS identity: `../SDK/esp-idf/honch/src/identity.c:49-95`; Wi-Fi lifecycle: `../SDK/esp-idf/honch/src/lifecycle.c:54-95`. |
| 117-123 | Init side effects. | Identity: `../SDK/esp-idf/honch/src/identity.c:24-95`; queue/transport/GPIO/lifecycle/scheduler init order: `../SDK/esp-idf/honch/src/honch.c:99-165`; firmware/boot lifecycle: `../SDK/esp-idf/honch/src/lifecycle.c:111-150`. |
| 125-141 | Event tracking and flush APIs. | Public API: `../SDK/esp-idf/honch/include/honch.h:51`, `../SDK/esp-idf/honch/include/honch.h:58`; `honch_track`: `../SDK/esp-idf/honch/src/honch.c:199-269`; JSON parse/ignore behavior: `../SDK/esp-idf/honch/src/encoder.c:584-596`; queue/drop: `../SDK/esp-idf/honch/src/queue.c:290-361`; `honch_flush`: `../SDK/esp-idf/honch/src/honch.c:385-393`. |
| 144-169 | Identity APIs, persistence, reset behavior. | Public API: `../SDK/esp-idf/honch/include/honch.h:52-53`, `../SDK/esp-idf/honch/include/honch.h:59-61`; identity persistence: `../SDK/esp-idf/honch/src/identity.c:49-95`, `../SDK/esp-idf/honch/src/identity.c:114-135`; reset: `../SDK/esp-idf/honch/src/honch.c:395-414`, `../SDK/esp-idf/honch/src/identity.c:161-194`. |
| 172-186 | Session APIs and behavior. | Public API: `../SDK/esp-idf/honch/include/honch.h:55-56`; session implementation: `../SDK/esp-idf/honch/src/honch.c:318-383`; session ID generation: `../SDK/esp-idf/honch/src/identity.c:32-47`, `../SDK/esp-idf/honch/src/identity.c:138-158`; encoding: `../SDK/esp-idf/honch/src/encoder.c:444-447`. |
| 189-211 | GPIO API, edge modes, ISR/worker/debounce behavior. | Public API/enum: `../SDK/esp-idf/honch/include/honch.h:28-32`, `../SDK/esp-idf/honch/include/honch.h:63`; implementation: `../SDK/esp-idf/honch/src/gpio.c:20-21`, `../SDK/esp-idf/honch/src/gpio.c:36-70`, `../SDK/esp-idf/honch/src/gpio.c:72-91`, `../SDK/esp-idf/honch/src/gpio.c:116-192`. |
| 213-220 | Shutdown behavior. | Public API: `../SDK/esp-idf/honch/include/honch.h:49`; implementation: `../SDK/esp-idf/honch/src/honch.c:168-197`; sync flush internals: `../SDK/esp-idf/honch/src/scheduler.c:248-263`. |
| 223-237 | Auto-stamped properties. | Reserved keys and property count: `../SDK/esp-idf/honch/src/encoder.c:320-376`; encoding values: `../SDK/esp-idf/honch/src/encoder.c:420-453`; runtime collection: `../SDK/esp-idf/honch/src/encoder.c:68-102`. |
| 239-252 | Lifecycle events. | Connectivity: `../SDK/esp-idf/honch/src/lifecycle.c:41-66`; boot/shutdown: `../SDK/esp-idf/honch/src/lifecycle.c:111-127`; firmware: `../SDK/esp-idf/honch/src/lifecycle.c:129-150`; battery: `../SDK/esp-idf/honch/src/lifecycle.c:152-170`; sessions/reset: `../SDK/esp-idf/honch/src/honch.c:318-414`. |
| 254-269 | Error codes. | Public enum: `../SDK/esp-idf/honch/include/honch.h:15-26`; `honch_get_device_id` return type exception: `../SDK/esp-idf/honch/include/honch.h:61`; return sites: `../SDK/esp-idf/honch/src/honch.c:43-55`, `../SDK/esp-idf/honch/src/identity.c:49-95`, `../SDK/esp-idf/honch/src/queue.c:127-185`, `../SDK/esp-idf/honch/src/gpio.c:166-188`, `../SDK/esp-idf/honch/src/scheduler.c:248-263`. |
| 271-279 | Transport details: `/batch`, local queue, batching, compression, retry/drop behavior. | Endpoint construction: `../SDK/esp-idf/honch/src/transport.c:82-90`; batching: `../SDK/esp-idf/honch/src/scheduler.c:20`, `../SDK/esp-idf/honch/src/scheduler.c:69-108`; gzip: `../SDK/esp-idf/honch/src/transport.c:21-80`, `../SDK/esp-idf/honch/src/transport.c:117-163`; HTTP status mapping: `../SDK/esp-idf/honch/src/transport.c:172-192`; retry/drop decisions: `../SDK/esp-idf/honch/src/scheduler.c:111-142`. |
| 281-299 | Example project commands and BOOT button behavior. | Example source/config: `../SDK/esp-idf/example/main/app_main.c:119-168`; example README: `../SDK/esp-idf/README.md:120-139`. |
| 301-304 | Next-step links. | Existing docs and example paths: `content/docs/faq.mdx`, `../SDK/esp-idf/example/`. |

## Known Verification Commands

Run these after docs edits:

```sh
cd /Users/morgana/Development/honch-io/docs
npm run types:check

cd /Users/morgana/Development/honch-io/SDK
python3 -m unittest esp-idf/tests/test_cbor_migration.py
```

`npm run lint` is also useful, but currently fails on pre-existing Biome/Tailwind
configuration and import-format diagnostics outside the docs content files.

## Verification Log

| Date | Pass | Command or method | Result |
| --- | --- | --- | --- |
| 2026-05-20 | 1 | Manual source audit of `content/docs/index.mdx`, `content/docs/quickstart.mdx`, `content/docs/faq.mdx`, and `content/docs/sdks/esp-idf.mdx` against `../SDK/esp-idf/honch/src`, `../SDK/esp-idf/honch/include`, `../SDK/esp-idf/example`, `../SDK/c-core/README.md`, and `../SDK/micropython/README.md`. | Mismatches found and corrected in the docs: HTTPS scheme enforcement wording, event buffer staging wording, NVS identity wording, retry/drop wording, platform status wording, and public error-code wording. |
| 2026-05-20 | 1 | `rg -n 'over HTTPS|HTTPS transport|new device ID|regenerates|Failed sends|where individual events and batches are staged|used for queue|the device would get a new identity|all data over HTTPS|must use the https' content/docs` | No matches. |
| 2026-05-20 | 1 | `git diff --check` | Passed. |
| 2026-05-20 | 1 | `npm run types:check` | Passed: Fumadocs generated files, Next route types generated, and `tsc --noEmit` completed. |
| 2026-05-20 | 1 | `python3 -m unittest esp-idf/tests/test_cbor_migration.py` from `../SDK` | Passed: 12 tests. |
| 2026-05-20 | 1 | `npm run lint` | Failed on pre-existing docs app diagnostics: Biome schema mismatch, Tailwind CSS parser configuration, import ordering, and formatting in files outside the edited docs content. No fixes applied in this pass. |
