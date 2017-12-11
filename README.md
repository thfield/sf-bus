# sf-bus
overlaying bus routes on a map.

because i couldn't find this anywhere else on the internet.

medium post about v1 of this project [here](https://medium.com/@thfield/adventures-in-amateur-cartography-ad4927ccfccc)

## how to use
click once to highlight bus routes under the click.  click again on a highlighted route to "superhighlight" routes under that click. click elsewhere to reset highlighting.

use the menu in the upper right corner to see the names of the highlighted bus routes.


## how to develop
1. [Clone this repo](https://help.github.com/articles/cloning-a-repository/)
1. in the directory for your local clone:
    1. `npm install`
    1. `npm run data`
    1. `npm run start`

### dependencies
- [csv parse](http://csv.adaltas.com/parse/)
- [turf js](http://turfjs.org/)
- [d3](http://d3js.org)
- [mapbox](http://mapbox.com)
- [leaflet](http://leafletjs.com)
- [webpack](https://webpack.js.org/)

### data
data from (http://transitfeeds.com/p/sfmta/60, downloaded on 2017-11-14

#### note
included here since the shapefiles are derived from the sfmta gtfs data:
```
Reproduced with permission granted by the City and County of San Francisco. The information has been provided by means of a nonexclusive, limited, and revocable license granted by the City and County of San Francisco.

The City and County of San Francisco does not guarantee the accuracy, adequacy, completeness or usefulness of any information. The City and County of San Francisco provides this information "as is," without warranty of any kind, express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose, and assumes no responsibility for anyone's use of the information.
```

### mapbox examples
- https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures-around-point/
- https://www.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/
- https://www.mapbox.com/mapbox-gl-js/example/color-switcher/
- https://www.mapbox.com/mapbox-gl-js/example/restrict-bounds/
- https://www.mapbox.com/mapbox-gl-js/example/filter-markers/
- https://www.mapbox.com/mapbox-gl-js/example/measure/
- https://www.mapbox.com/mapbox-gl-js/example/data-driven-circle-colors/
- https://www.mapbox.com/mapbox-gl-js/example/geojson-line/
