#!/bin/bash
set -e

function cleanup {
  docker-compose -f docker-compose.yml stop -t 1
}
cleanup
trap cleanup EXIT

docker-compose -f docker-compose.yml up -d --remove-orphans --build
docker-compose -f docker-compose.yml logs --tail 100 --follow
