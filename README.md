# sf-bus
overlaying bus routes on a map.

because i couldn't find this anywhere else on the internet.

medium post about this project [here](https://medium.com/@thfield/adventures-in-amateur-cartography-ad4927ccfccc)

## libs
- [csv parse](http://csv.adaltas.com/parse/)
- [turf js](http://turfjs.org/)
- [d3](http://d3js.org)
- [leaflet](http://leafletjs.com)
- [mapbox](http://mapbox.com)

## steps
1. download data from [sfmta](https://www.sfmta.com/about-sfmta/reports/gtfs-transit-data)
1. unzip
1. run makeGeoJsons.js
1. ???
1. profit!

## data
data from https://www.sfmta.com/about-sfmta/reports/gtfs-transit-data, downloaded on 2017-02-25

### note
included here since the shapefiles are derived from the sfmta gtfs data:
```
Reproduced with permission granted by the City and County of San Francisco. The information has been provided by means of a nonexclusive, limited, and revocable license granted by the City and County of San Francisco.

The City and County of San Francisco does not guarantee the accuracy, adequacy, completeness or usefulness of any information. The City and County of San Francisco provides this information "as is," without warranty of any kind, express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose, and assumes no responsibility for anyone's use of the information.
```
