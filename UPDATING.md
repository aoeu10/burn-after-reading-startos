# Upstream Tracking

**Upstream** is [Start9Labs/burn-after-reading](https://github.com/Start9Labs/burn-after-reading), archived (read-only) Aug 2026 at version `0.1.6`.

- **Where the pin lives**: the vendored sources in `upstream/` (frontend + backend), copied from upstream `master`. The last synced upstream commit is recorded in `startos/versions/current.ts` release notes and below.
- **Last sync**: upstream `0.1.6` / master @ 63 commits (Aug 2026 archive state).
- **How to bump**: copy `frontend/` and `backend/` from the new upstream commit into `upstream/` (drop `backend/target/` and any `backend/src/ui.pack`), keep `upstream/Dockerfile` (it is ours, not upstream's), bump the version in `startos/versions/current.ts` (edit in place; only spin a new version file for a migration), and add release notes. The upstream version string lives in `upstream/frontend/package.json` and `upstream/backend/Cargo.toml` — the s9pk version convention is `<upstream>:<pkg-epoch>`.

## Notes for bumps

- The upstream binary contract assumed by this wrapper: reads `start9/config.yaml` (`password` field) from the working directory, listens on `$PORT` (default 80), stores everything in the working directory. If a future upstream changes any of that, adjust `startos/main.ts`, `startos/utils.ts` (`dataDir`), and `startos/fileModels/config.yaml.ts`.
- If upstream gains config fields, extend the `z.looseObject` shape in `config.yaml.ts` and consider a new config action.
