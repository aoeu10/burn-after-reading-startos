# Package notes

Upstream `burn-after-reading` (archived 0.1.6) wrapped for StartOS 0.4 / SDK 3.0.3.

- Contract: binary reads `start9/config.yaml` (relative to CWD), listens on `$PORT` (default 80), writes all data (sled db, `big/`, `tmp/`) to CWD. Volume `main` is mounted at `/root`; image WORKDIR is `/root`.
- Upstream `manifest.yaml`, `Makefile`, `Dockerfile`, `scripts/` (0.3.x SDK) were not vendored — only `frontend/` and `backend/` sources. `upstream/Dockerfile` is this package's own multi-stage build.
- Do not add `backend/src/ui.pack` to git; it is generated in the Docker build.
