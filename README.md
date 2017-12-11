# sf-bus
overlaying bus routes on a map.

because i couldn't find this anywhere else on the internet.

medium post about v1 of this project [here](https://medium.com/@thfield/adventures-in-amateur-cartography-ad4927ccfccc)

## how to use
click once to highlight bus routes under the click.  click again on a highlighted route to "superhighlight" routes under that click. click elsewhere to reset highlighting.

use the menu in the upper right corner to see the names of the highlighted bus routes.

## dependencies
- [csv parse](http://csv.adaltas.com/parse/)
- [turf js](http://turfjs.org/)
- [d3](http://d3js.org)
- [mapbox](http://mapbox.com)
- [leaflet](http://leafletjs.com)
- [webpack](https://webpack.js.org/)

## steps after locally cloning
1. `npm install`
1. `npm run data`
1. `npm run start`

## todos
- sticky header on sidebar menu
- tie into nextbus data feed, show the next bus to arrive at my location
- locate user initially http://freegeoip.net/ or https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
- turn makeGeoJsons.js into an npm module for gtfs->geojson (?)
  - https://github.com/blinktaginc/gtfs-to-geojson
  - https://github.com/node-geojson/gtfs2geojson
  - https://github.com/andrewharvey/gtfs2geojson
- create geojson of stops from mostFreqTrips.trip_id->stop_times.trip_id->stop_times.stop_id->stops.stop_id->stop[stop_lat, stop_lon]

### done
- two click interaction - set start, end? two levels of highlight, show bus line in marker?
- use [transit feeds](http://transitfeeds.com/p/sfmta/60) for gtfs data
- use mapbox studio tiles to create tiles with bus route geojsons
- use mapbox gl


## data
data from (http://transitfeeds.com/p/sfmta/60, downloaded on 2017-11-14

### note
included here since the shapefiles are derived from the sfmta gtfs data:
```
Reproduced with permission granted by the City and County of San Francisco. The information has been provided by means of a nonexclusive, limited, and revocable license granted by the City and County of San Francisco.

The City and County of San Francisco does not guarantee the accuracy, adequacy, completeness or usefulness of any information. The City and County of San Francisco provides this information "as is," without warranty of any kind, express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose, and assumes no responsibility for anyone's use of the information.
```

## mapbox examples
- https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures-around-point/
- https://www.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/
- https://www.mapbox.com/mapbox-gl-js/example/color-switcher/
- https://www.mapbox.com/mapbox-gl-js/example/restrict-bounds/
- https://www.mapbox.com/mapbox-gl-js/example/filter-markers/
- https://www.mapbox.com/mapbox-gl-js/example/measure/
- https://www.mapbox.com/mapbox-gl-js/example/data-driven-circle-colors/
- https://www.mapbox.com/mapbox-gl-js/example/geojson-line/
