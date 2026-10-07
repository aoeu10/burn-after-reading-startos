# syntax=docker/dockerfile:1
#
# Builds the Burn After Reading server from the vendored upstream sources:
#   stage 1  Angular/Ionic frontend -> static dist
#   stage 2  web-static-pack-packer -> backend/src/ui.pack (frontend embedded in the binary)
#   stage 3  Rust backend, cross-compiled to x86_64-unknown-linux-musl
#            (messense/rust-musl-cross is multi-arch: its arm64 variant runs natively
#             on ARM build hosts while still producing an x86_64 binary)
#   stage 4  minimal runtime (alpine + tini)
#
# The binary reads start9/config.yaml relative to its working directory and
# stores all data (sled db, big/, tmp/) there too, so StartOS mounts the data
# volume at /root (the image WORKDIR) and StartOS writes config to
# <volume>/start9/config.yaml.

# ---- frontend ----------------------------------------------------------------
FROM --platform=$BUILDPLATFORM node:16-alpine AS frontend
WORKDIR /build/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY frontend/ ./
RUN npm run build

# ---- pack the static site into the binary's embedded format ------------------
# rust 1.79: web-static-pack-packer 0.1.6's `time` dependency does not compile
# on newer rustc (E0282, fixed in time 0.3.36, but the packer crate pins older)
FROM --platform=$BUILDPLATFORM rust:1.79-alpine AS packer
RUN apk add --no-cache musl-dev
RUN cargo install web-static-pack-packer --version 0.1.6 --locked
COPY --from=frontend /build/frontend/dist /dist
RUN web-static-pack-packer /dist /ui.pack

# ---- backend (static musl binary) --------------------------------------------
FROM --platform=$BUILDPLATFORM messense/rust-musl-cross:x86_64-musl AS backend
WORKDIR /home/rust/src
COPY backend/ .
# the frontend, packed (see upstream Makefile: web-static-pack-packer frontend/dist backend/src/ui.pack)
COPY --from=packer /ui.pack src/ui.pack
RUN cargo build --release

# ---- runtime ------------------------------------------------------------------
FROM alpine:3.22
RUN apk add --no-cache bash curl tini
COPY --from=backend /home/rust/src/target/x86_64-unknown-linux-musl/release/burn-after-reading /usr/local/bin/burn-after-reading
WORKDIR /root
ENTRYPOINT ["tini", "/usr/local/bin/burn-after-reading"]
