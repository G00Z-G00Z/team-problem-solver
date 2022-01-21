#! /bin/bash
# https://www.npmjs.com/package/pwa-asset-generator
cd public/
echo "Generando los assets a carpeta public/png"
npx pwa-asset-generator \
./favicon.ico \
-m ./manifest.json  \
-i ./index.html  \
-type png \
-a "%PUBLIC_URL%" \
-b "#11946E" \
cd ..

