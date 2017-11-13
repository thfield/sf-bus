import './style.css'
import './mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import lines from './lines.json'

mapboxgl.accessToken = 'pk.eyJ1IjoidGhmaWVsZCIsImEiOiI4YTA3MmJkY2Q0OTg0YTkzMDAxOWQ3NzIyMzQ3NjIzOSJ9.LxGif2Jlko59H3l5yUvZug'
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/thfield/cj9ug3fgn3vtu2su96gcihye1',
  zoom: 12,
  center: [-122.447303, 37.753574]
})

let allLines = document.getElementById('all-routes')
let linesList = document.createElement('ul')
lines.forEach(function (line) {
  createLI(line, linesList)
})
allLines.appendChild(linesList)

let infobox = document.getElementById('info')
let ul = document.createElement('ul')
ul.setAttribute('class', 'routeselect')
infobox.appendChild(ul)

let highlightColor = '#b514de'

// GeoJSON object to hold our measurement features
var geojson = {
  'type': 'FeatureCollection',
  'features': []
}

map.on('load', function () {
  map.addSource('routes', {
    'type': 'vector',
    'url': 'mapbox://thfield.cj9uf6cwt73q22qlgopvm0707-7g4hb'
  })

  map.addLayer({
    'id': 'bus-routes-highlighted',
    'type': 'line',
    'source': 'routes',
    'source-layer': 'sf-bus',
    'paint': {
      'line-color': highlightColor,
      'line-width': 5,
      'line-opacity': 1
    },
    'filter': ['in', 'shortName', '']
  })

  map.addSource('geojson', {
    'type': 'geojson',
    'data': geojson
  })

  map.addLayer({
    id: 'points',
    type: 'circle',
    source: 'geojson',
    paint: {
      'circle-radius': 10,
      'circle-color': '#000',
      'circle-opacity': 0.5,
      'circle-stroke-width': 3,
      'circle-stroke-color': '#329e39'
    },
    filter: ['in', '$type', 'Point']
  })
  map.on('click', highlightNearClick)
})

function highlightNearClick (e) {
  // set bbox as {extent}px reactangle area around clicked point
  let extent = 5
  let bbox = [[e.point.x - extent, e.point.y - extent], [e.point.x + extent, e.point.y + extent]]
  let features = map.queryRenderedFeatures(bbox, { layers: ['sf-bus'] })
  let routes = features.map(f => {
    return {
      text: `${f.properties.shortName} ${f.properties.longName} - ${f.properties.headsign}`,
      'data-direction': f.properties.direction,
      'data-shortName': f.properties.shortName,
      'data-longName': f.properties.longName,
      'data-headsign': f.properties.headsign
    }
  })

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }

  routes.sort(function (a, b) {
    return (a['data-shortName'] < b['data-shortName']) ? -1 : 1
  })

  routes.forEach(function (route) {
    return createLI(route, ul)
  })

  var filterName = createFilter(features, 'shortName')
  var filterDirection = createFilter(features, 'direction')
  var filterHeadsign = createFilter(features, 'headsign')
// BUG: click on pine & powell: both 1AX california directions are highlighted on map
  map.setFilter('bus-routes-highlighted', ['all', filterName, filterHeadsign])

  var pin = {
    'type': 'Feature',
    'geometry': {
      'type': 'Point',
      'coordinates': [
        e.lngLat.lng,
        e.lngLat.lat
      ]
    },
    'properties': {
      'id': String(new Date().getTime())
    }
  }

  map.getSource('geojson').setData(pin)

  let resetButton = document.querySelector('#reset')
  // resetButton.removeEventListener('click')
  resetButton.addEventListener('click', function (e) {
    document.querySelector('.routeselect').childNodes.forEach(function (e) { e.classList.remove('hl') })
    map.setFilter('bus-routes-highlighted', ['all', filterName, filterDirection])
  })
}

function createLI (data, parentEl) {
  let listitem = document.createElement('li')
  let dataKeys = Object.keys(data).filter(d => { return d.includes('data-') })
  dataKeys.forEach(function (d) { return listitem.setAttribute(d, data[d]) })
  let text = document.createTextNode(data.text)
  listitem.appendChild(text)
  listitem.addEventListener('click', function (e) {
    this.parentElement.childNodes.forEach(function (e) { e.classList.remove('hl') })
    this.classList.add('hl')
    map.setFilter('bus-routes-highlighted', ['all', ['in', 'shortName', this.dataset.shortname], ['in', 'direction', this.dataset.direction]])
    // map.setFilter('bus-routes-highlighted', ['in', 'shortName', this.dataset.shortname])
  })

  return parentEl.appendChild(listitem)
}

function createFilter (features, prop) {
  return features.reduce(function (memo, feature) {
    memo.push(feature.properties[prop])
    return memo
  }, ['in', prop])
}

