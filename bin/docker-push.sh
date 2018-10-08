#!/usr/bin/env bash

docker build -t fylmtm/shelly:${TRAVIS_TAG} .

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker push fylmtm/shelly:${TRAVIS_TAG}
