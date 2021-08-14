#!/usr/bin/env bash
cp ./.demo/index.tsx ./src/index.tsx
cp ./.demo/react-app-env.d.ts ./src/react-app-env.d.ts
rm -r ./public
mkdir ./public
cp -R ./.demo/public/* ./public
