# Package notes

Upstream `burn-after-reading` (archived 0.1.6) wrapped for StartOS 0.4 / SDK 3.0.3.

- Contract: binary reads `start9/config.yaml` (relative to CWD), listens on `$PORT` (default 80), writes all data (sled db, `big/`, `tmp/`) to CWD. Volume `main` is mounted at `/root`; image WORKDIR is `/root`.
- Upstream `manifest.yaml`, `Makefile`, `Dockerfile`, `scripts/` (0.3.x SDK) were not vendored — only `frontend/` and `backend/` sources. `upstream/Dockerfile` is this package's own multi-stage build.
- Do not add `backend/src/ui.pack` to git; it is generated in the Docker build.
- Vendored `backend/Cargo.lock` was touched for modern-rustc compatibility: `time` 0.3.15→0.3.36 (+ `serde` 1.0.145→1.0.203, required by time 0.3.36). Both are semver-compatible bumps; redo if upstream re-syncs and rustc ≥1.80 still breaks on old `time`.
