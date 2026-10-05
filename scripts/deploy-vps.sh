#!/usr/bin/env bash
set -euo pipefail

REMOTE="${REMOTE:-masterdaweb}"
APP_DIR="${APP_DIR:-/opt/rbx-frontend}"

echo "Syncing project to ${REMOTE}:${APP_DIR}..."
ssh "${REMOTE}" "mkdir -p ${APP_DIR}"
tar --exclude=node_modules --exclude=.next --exclude=.git -czf - . \
  | ssh "${REMOTE}" "tar -xzf - -C ${APP_DIR}"

echo "Building and restarting Docker stack..."
ssh "${REMOTE}" "cd ${APP_DIR} && docker compose up -d --build"

echo "Health check..."
ssh "${REMOTE}" "curl -sI http://127.0.0.1:3000/ | head -1"

echo "Done."
