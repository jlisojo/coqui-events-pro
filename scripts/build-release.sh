#!/usr/bin/env bash

set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
version="$(sed -n 's/^ \* Version: //p' "$project_dir/coqui-events-pro.php" | head -n 1)"

if [[ -z "$version" ]]; then
    echo "Unable to determine plugin version." >&2
    exit 1
fi

archive_name="coqui-events-pro-${version}.zip"
dist_dir="$project_dir/dist"
staging_dir="$(mktemp -d)"

cleanup() {
    rm -rf "$staging_dir"
}
trap cleanup EXIT

mkdir -p "$staging_dir/coqui-events-pro" "$dist_dir"

rsync -a "$project_dir/" "$staging_dir/coqui-events-pro/" \
    --exclude='.git' \
    --exclude='.gitignore' \
    --exclude='.github' \
    --exclude='.DS_Store' \
    --exclude='dist' \
    --exclude='scripts' \
    --exclude='*.zip'

rm -f "$dist_dir/$archive_name"
(
    cd "$staging_dir"
    zip -qr "$dist_dir/$archive_name" coqui-events-pro
)

echo "Created $dist_dir/$archive_name"
