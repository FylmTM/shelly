#!/usr/bin/env bash

if [ -z ${1+x} ]; then
    echo "New version required"
    exit 1
fi

CURRENT_VERSION=$(node -p -e "require('./package.json').version")
NEW_VERSION=$1

sed -i "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" package.json
sed -i "s/image: fylmtm\/shelly:$CURRENT_VERSION/image: fylmtm\/shelly:$NEW_VERSION/" k8s/2-deployment.yaml
sed -i "s/fylmtm\/shelly:$CURRENT_VERSION/fylmtm\/shelly:$NEW_VERSION/" README.md

git add --all
git commit -m "Bump version: $NEW_VERSION"
git tag $NEW_VERSION
