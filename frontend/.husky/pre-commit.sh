#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run format && npm run lint && git add -A . 