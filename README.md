# sf-bus
overlaying bus routes on a map.

because i couldn't find this anywhere else on the internet.

medium post about v1 of this project [here](https://medium.com/@thfield/adventures-in-amateur-cartography-ad4927ccfccc)

## dependencies
- [csv parse](http://csv.adaltas.com/parse/)
- [turf js](http://turfjs.org/)
- [d3](http://d3js.org)
- [mapbox](http://mapbox.com)
- [leaflet](http://leafletjs.com)
- [webpack](https://webpack.js.org/)


## steps
1. `npm install`
1. `npm run data`

## todos
- tie into nextbus data feed, show the next bus to arrive at my location
- locate user initially http://freegeoip.net/ or https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
- turn makeGeoJsons.js into an npm module for gtfs->geojson (?)
  - https://github.com/blinktaginc/gtfs-to-geojson
  - https://github.com/node-geojson/gtfs2geojson
  - https://github.com/andrewharvey/gtfs2geojson

### done
- use [transit feeds](http://transitfeeds.com/p/sfmta/60) for gtfs data
- use mapbox studio tiles to create tiles with bus route geojsons
- use mapbox gl


## data
data from https://www.sfmta.com/about-sfmta/reports/gtfs-transit-data, downloaded on 2017-02-25

### note
included here since the shapefiles are derived from the sfmta gtfs data:
```
Reproduced with permission granted by the City and County of San Francisco. The information has been provided by means of a nonexclusive, limited, and revocable license granted by the City and County of San Francisco.

The City and County of San Francisco does not guarantee the accuracy, adequacy, completeness or usefulness of any information. The City and County of San Francisco provides this information "as is," without warranty of any kind, express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose, and assumes no responsibility for anyone's use of the information.
```


https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures-around-point/
https://www.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/
https://www.mapbox.com/mapbox-gl-js/example/color-switcher/
https://www.mapbox.com/mapbox-gl-js/example/restrict-bounds/
https://www.mapbox.com/mapbox-gl-js/example/filter-markers/
https://www.mapbox.com/mapbox-gl-js/example/measure/
https://www.mapbox.com/mapbox-gl-js/example/data-driven-circle-colors/
https://www.mapbox.com/mapbox-gl-js/example/geojson-line/
