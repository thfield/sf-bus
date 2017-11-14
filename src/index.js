import './style.css'
import './mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import lines from './lines.json'
import tabSwitch from '../utils/tabSwitch.js'

mapboxgl.accessToken = 'pk.eyJ1IjoidGhmaWVsZCIsImEiOiI4YTA3MmJkY2Q0OTg0YTkzMDAxOWQ3NzIyMzQ3NjIzOSJ9.LxGif2Jlko59H3l5yUvZug'
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/thfield/cj9ug3fgn3vtu2su96gcihye1',
  zoom: 12,
  center: [-122.447303, 37.753574]
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
    },
    filter: ['in', '$type', 'Point']
  })
  map.on('click', highlightNearClick)
}

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
  routes.sort(function (a, b) {
    return (a['data-shortName'] < b['data-shortName']) ? -1 : 1
  })

  // remove list of highlighted routes
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
  // create new list of highlighted routes
  routes.forEach(function (route) {
    // if (!document.querySelector('#showOwl').checked && route['data-longName'].includes('OWL')) {
    //   return
    // }
    return createLI(route, ul)
  })
  // draw "magnifying glass pin" circle around where map clicked
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

  // change to highlight tab
  tabSwitch('highlit-routes', 'route-list')

  var filterName = createFilter(features, 'shortName')
  var filterHeadsign = createFilter(features, 'headsign')

  // filter routes drawn on map
  let filters = ['all', filterName, filterHeadsign]
  // if (document.querySelector('#showOwl').checked) {
  //   filters.push(['!=', 'busType', 'owl'])
  // }
  map.setFilter('bus-routes-highlighted', filters)

  let resetButton = document.querySelector('#reset')
  if (resetButton) resetButton.remove()
  resetButton = document.createElement('button')
  resetButton.id = 'reset'
  resetButton.innerHTML = 'show all highlighted routes'
  resetButton.addEventListener('click', function (e) {
    let filters = ['all', filterName, filterHeadsign]
    // if (!document.querySelector('#showOwl').checked) {
    //   filters.push(['!=', 'busType', 'owl'])
    // }
    document.querySelector('.routeselect').childNodes.forEach(function (e) { e.classList.remove('hl') })
    map.setFilter('bus-routes-highlighted', filters)
  })
  highlightEl.appendChild(resetButton)
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
    let filters = [
      'all',
      ['in', 'shortName', this.dataset.shortname],
      ['in', 'headsign', this.dataset.headsign]
    ]
    // if (!document.querySelector('#showOwl').checked) {
    //   filters.push(['!=', 'busType', 'owl'])
    // }
    map.setFilter('bus-routes-highlighted', filters)
  })
  return parentEl.appendChild(listitem)
}

function createFilter (features, prop) {
  return features.reduce(function (memo, feature) {
    memo.push(feature.properties[prop])
    return memo
  }, ['in', prop])
}
