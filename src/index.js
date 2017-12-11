import './style.css'
// import './mapbox-gl.css'
// import mapboxgl from 'mapbox-gl'
import lines from './lines.json'
import tabSwitch from '../utils/tabSwitch.js'
import {point} from '@turf/helpers'

mapboxgl.accessToken = 'pk.eyJ1IjoidGhmaWVsZCIsImEiOiI4YTA3MmJkY2Q0OTg0YTkzMDAxOWQ3NzIyMzQ3NjIzOSJ9.LxGif2Jlko59H3l5yUvZug'
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/thfield/cj9ug3fgn3vtu2su96gcihye1',
  zoom: 12,
  center: [-122.447303, 37.753574],
  maxBounds: [ [-122.6, 37.65], [-122.3, 37.9] ]
})
map.addControl(new mapboxgl.NavigationControl(), 'top-left')
map.on('load', drawMap)

function openNav () {
  document.querySelector('.aside').style.width = '300px'
  document.querySelector('#expand').style.display = 'none'
}

function closeNav () {
  document.querySelector('.aside').style.width = '0'
  document.querySelector('#expand').style.display = 'block'
}

document.querySelector('#expand').addEventListener('click', openNav)
document.querySelector('#collapse').addEventListener('click', closeNav)

document.querySelectorAll('.tab').forEach(function (t) {
  t.addEventListener('click', function (e) {
    tabSwitch(this.dataset.target, 'route-list')
  })
})

let allLines = document.getElementById('all-routes')
let linesList = document.createElement('ul')
lines.forEach(function (line) {
  // if (line['data-bustype'] === 'owl') return
  createLI(line, linesList)
})
allLines.appendChild(linesList)

let highlightEl = document.getElementById('highlit-routes')
let ul = document.createElement('ul')
ul.setAttribute('class', 'routeselect')
highlightEl.appendChild(ul)

let highlightColor = '#e09600'
let highlightColor2 = '#bb0070'

// GeoJSON object to hold highlight layer
var geojson = {
  'type': 'FeatureCollection',
  'features': []
}

function drawMap () {
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

  map.addLayer({
    'id': 'bus-routes-doublehighlighted',
    'type': 'line',
    'source': 'routes',
    'source-layer': 'sf-bus',
    'paint': {
      'line-color': highlightColor2,
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
      'circle-color': highlightColor,
      'circle-opacity': 0.5,
      'circle-stroke-width': 3,
      'circle-stroke-color': '#000'
    }
  })
  map.on('click', highlightNearClick)
}

function highlightNearClick (e) {
  let features = getFeaturesUnderClick(e)

  let routes = features.map(f => {
    return {
      text: `${f.properties.shortName} ${f.properties.longName} - ${f.properties.headsign}`,
      'data-direction': f.properties.direction,
      'data-shortName': f.properties.shortName,
      'data-longName': f.properties.longName,
      'data-headsign': f.properties.headsign,
      'data-route': f.properties.route,
      'data-routeDirection': f.properties.routeDirection
    }
  })
  routes.sort(function (a, b) {
    return (a['data-shortName'] < b['data-shortName']) ? -1 : 1
  })

  if (isFirstClick(e)) {
    firstClick(e, routes, features)
  } else {
    secondClick(e, routes, features)
  }
}

function getFeaturesUnderClick (e) {
  // set bbox as {extent}px reactangle area around clicked point
  let extent = 5
  let bbox = [[e.point.x - extent, e.point.y - extent], [e.point.x + extent, e.point.y + extent]]

  return map.queryRenderedFeatures(bbox, { layers: ['sf-bus'] })
}

function isFirstClick (e) {
  let layer = map.getSource('geojson')._data
  return layer.type === 'FeatureCollection' && layer.features.length === 0
}

function firstClick (e, routes, features) {
  // remove list of highlighted routes
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
  // create new list of highlighted routes
  routes.forEach(function (route) {
    return createLI(route, ul)
  })

  drawPin(e)

  // change to highlight tab
  tabSwitch('highlit-routes', 'route-list')

  var filterRouteDirection = createFilter(features, 'routeDirection')

  // filter routes drawn on map
  map.setFilter('bus-routes-highlighted', filterRouteDirection)
  map.setFilter('bus-routes-doublehighlighted', ['in', 'routeDirection', ''])

  let resetButton = document.querySelector('#reset')
  if (resetButton) resetButton.remove()
  resetButton = document.createElement('button')
  resetButton.id = 'reset'
  resetButton.innerHTML = 'show all highlighted routes'
  resetButton.addEventListener('click', function (e) {
    document.querySelector('.routeselect').childNodes.forEach(function (e) { e.classList.remove('hl') })
    map.setFilter('bus-routes-highlighted', filterRouteDirection)
  })
  highlightEl.appendChild(resetButton)
}

function secondClick (e, routes, features) {
  let filter = map.getFilter('bus-routes-highlighted')
  let highlightedRoutes = filter.slice(2, filter.length)
  let newRoutes = routes.map(d => d['data-routeDirection'])
  let both = intersection(highlightedRoutes, newRoutes)
  both.length > 0
    ? doublehighlight(e, both, features)
    : firstClick(e, routes, features)
}

function doublehighlight (e, both, features) {
  drawPin(e, false)
  features = features.filter(function (feature) {
    return both.includes(feature.properties.routeDirection)
  })
  let filterName = createFilter(features, 'routeDirection')
  map.setFilter('bus-routes-doublehighlighted', filterName)

  // highlight the ul elements
  document.querySelector('.routeselect').childNodes.forEach(function (e) {
    both.includes(e.dataset.routedirection)
      ? e.classList.add('hldouble')
      : e.classList.remove('hldouble')
  })
}

function intersection (a, b) {
  let arrays = [a, b]
  var result = arrays.shift().filter(function (v) {
    return arrays.every(function (d) {
      return d.indexOf(v) !== -1
    })
  })
  return result
}

function drawPin (e, reset = true) {
  // draw "magnifying glass pin" circle around where map clicked

  let pin = point([e.lngLat.lng, e.lngLat.lat], {'id': String(new Date().getTime())})
  let layer = map.getSource('geojson')
  if (reset) {
    layer.setData(pin)
  } else {
    let firstPin = layer._data
    firstPin = firstPin.type === 'Feature' ? firstPin : firstPin.features[0]
    let pins = { type: 'FeatureCollection', features: [ firstPin, pin ] }
    layer.setData(pins)
  }
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
    map.setFilter('bus-routes-highlighted', ['in', 'routeDirection', this.dataset.routedirection])
    map.setFilter('bus-routes-doublehighlighted', ['in', 'routeDirection', ''])
  })
  return parentEl.appendChild(listitem)
}

function createFilter (features, prop) {
  return features.reduce(function (memo, feature) {
    memo.push(feature.properties[prop])
    return memo
  }, ['in', prop])
}
