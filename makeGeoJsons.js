'use strict'
console.time('Make JSONs')

const fs = require('fs')
const csv = require('csv-parse/lib/sync')
const write = require('./utils/write')
const turf = require('turf')

const make = require('./utils/make')

const path = './gtfs/'
const outPath = `./geojson`
if (!fs.statSync(outPath)) fs.mkdirSync(outPath)

const shapesFile = 'shapes.txt'
const routesFile = 'routes.txt'
const tripsFile = 'trips.txt'

/* read the csvs from fs */
let shapes = fs.readFileSync(path + shapesFile, 'utf8')
let routes = fs.readFileSync(path + routesFile, 'utf8')
let trips = fs.readFileSync(path + tripsFile, 'utf8')

/* turn csv string to js objects */
shapes = csv(shapes, {columns: true})
routes = csv(routes, {columns: true})
trips = csv(trips, {columns: true})

/* Maps */
let shapesMap = make.shapesMap(shapes)
let routesMap = make.routesMap(routes)
let tripsMap = make.tripsMap(trips)
let tripsFreqs = make.tripsFreqNest(trips)
let mostFreqTrips = make.mostFrequentTrips(tripsFreqs)
let routeShapes = new Map()

mostFreqTrips.forEach(function (route) {
  route.values.forEach(function (service) {
    service.values.forEach(function (trip) {
      let identifier = trip.shape_id // route.route_id
      if (!routeShapes.has(identifier)) {
        let props = {}
        Object.assign(props, routesMap.get(route.route_id))
        let headsign = tripsMap.get(trip.shape_id).headsign
        props.services = [[service.service_id, trip.direction_id, headsign]]
        let geo = shapesMap.get(trip.shape_id)
        routeShapes.set(identifier, {route: route.route_id, props: props, geo: geo})
      } else {
        let temp = routeShapes.get(identifier)
        temp.props.services.push([service.service_id, trip.direction_id, tripsMap.get(trip.shape_id).headsign])
        routeShapes.set(identifier, temp)
      }
    })
  })
})

routeShapes.forEach(function (data, shapeid) {
  let props = {
    shortName: data.props.shortName,
    longName: data.props.longName,
    route: data.props.route,
    headsign: data.props.services[0][2],
    direction: data.props.services[0][1],
    service_ids: data.props.services.map(d => d[0]),
    busType: make.busType(data.props.shortName)
  }
  let geoJson = turf.lineString(data.geo, props)
  if (props.shortName.includes('/')) { props.shortName = props.shortName.replace(/\//, '-') }
  write(`${outPath}/${props.shortName}-${props.direction}.geo.json`, geoJson)
})

let lines = make.lineList(routes)
write('lines.json', lines)

console.timeEnd('Make JSONs')
