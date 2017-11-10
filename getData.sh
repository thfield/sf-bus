#! /bin/bash
if [ ! -f gtfs.zip ]; then
  curl -o gtfs.zip http://transitfeeds.com/p/sfmta/60/latest/download
fi
unzip gtfs.zip -d gtfs
node makeGeoJsons.js
