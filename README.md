# Burn After Reading for StartOS

A StartOS 0.4 package for [Burn After Reading](https://github.com/Start9Labs/burn-after-reading) — a simple, fast, standalone pastebin service that shares encrypted messages and files via ephemeral Tor (.onion) links that are destroyed after they are viewed.

The upstream repository is archived (read-only) and its wrapper targeted the old 0.3.x SDK. This repo repackages the same server for StartOS 0.4 using the current `@start9labs/start-sdk`.

## Architecture

- `upstream/` — vendored upstream sources (Angular/Ionic frontend, Rust/warp backend), pinned to upstream master (see `UPDATING.md`).
- `upstream/Dockerfile` — multi-stage build: frontend → `web-static-pack-packer` (embeds the static site as `backend/src/ui.pack`) → x86_64 musl static binary (cross-compiled natively via `messense/rust-musl-cross`) → alpine + tini runtime. Runs natively on ARM build hosts; no QEMU.
- `startos/` — SDK 3.0.x package code:
  - **Volume**: single `main` volume mounted at `/root` in the container. The upstream binary uses its working directory for everything: `start9/config.yaml` (config), `start9/stats.yaml`, `burn-after-reading.db` (sled), `big/`, `tmp/`.
  - **Config**: `start9/config.yaml` file model (`startos/fileModels/config.yaml.ts`), the only upstream-supported field being `password`.
  - **Password lifecycle**: generated on first init (`startos/init/seed-files.ts` via `utils.getDefaultString`), revealable with the **Get Password** action, changeable with the **Set Password** action (input field offers a generate button). The daemon watches the file reactively (`.read().const()` in `main.ts`), so a password change restarts the service automatically.
  - **Interface**: single HTTP UI on container port 80 (`checkWebUrl` health check on `/`).
  - **Backups**: the whole `main` volume.

## Differences from upstream

- Targets the StartOS 0.4 SDK (upstream wrapper was 0.3.x `manifest.yaml`).
- Properties (0.3 `stats.yaml` display) are replaced by SDK actions; the binary still writes `start9/stats.yaml` — StartOS 0.4 ignores it.
- x86_64 only (`arch: ['x86_64']`, `ARCHES := x86`). Add `aarch64` to the manifest and Makefile to build universal.
- The upstream Tor port-mapping/lan-config sections are gone: in 0.4 the user decides where interfaces are reachable (Tor is installed per-interface by the user).

## Build

```sh
make          # x86_64 s9pk (ARCHES := x86)
```

Install: point `.startos/config.yaml` at your server (`host.default`), `start-cli auth login`, then `make install` — or sideload the `.s9pk` via StartOS → System → Sideload a Service.

## Verify

- Service starts; health check `Web Interface` goes green.
- Get Password returns the install-generated password; logging into the UI with it works.
- Set Password → service restarts → old password rejected, new one accepted.
- Backup/restore round-trip keeps pastes and password.
