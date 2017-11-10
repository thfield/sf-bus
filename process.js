'use strict'
console.time('Make JSONs')

const fs = require('fs')
const csv = require('csv-parse/lib/sync')
const write = require('./utils/write')
const turf = require('turf')

const make = require('./utils/make')

const path = './gtfs/'
const outPath = './geojson'

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

// write('foo-shapesMap.json', Array.from(shapesMap))
// write('foo-routesMap.json', Array.from(routesMap))
// write('foo-tripsMap.json', Array.from(tripsMap))
// write('foo-tripsFreqs.json', tripsFreqs)
// write('foo-mostFreqTrips.json', mostFreqTrips)

// for each route_id in mostFreqTrips:
//   for each service_id:
//     properties = [
//       route_id -> shortname, longname
//       shape_id -> headsign, route_id, service_id
//     ]
//     coordinates = [
//       shape_id -> [lat, lon]
//     ]

mostFreqTrips.forEach(function (route) {
  route.freq.forEach(function (trip) {
    let props = {}
    Object.assign(props, routesMap.get(route.route_id))
    Object.assign(props, tripsMap.get(trip.shape_id))
    props.service_id = trip.service_id
    let geo = shapesMap.get(trip.shape_id)
    let geoJson = turf.lineString(geo, props)
    let dir = `./geojson/${geoJson.properties.service_id}`
    if (!fs.statSync(dir)) fs.mkdirSync(dir)
    write(`${dir}/${geoJson.properties.shortName}.geo.json`, geoJson)
  })
})

console.timeEnd('Make JSONs')


// let allRoutes = []
// doTheJoining()

// function doTheJoining () {
//     // want to get by route
//   routeNameMap.forEach((props, routeId) => {
//     let directions = ['A', 'B']
//     directions.forEach(direction => {
//       let shapeId = shapeRouteMap.get(routeId + '-1' + direction)
//         // we're only interested in weekday routes right now
//       if (shapeId === undefined) { return }
//         // if (shapeId === undefined) {
//         //   shapeId = shapeRouteMap.get(routeId + '-2' + direction)
//         // }
//         // if (shapeId === undefined) {
//         //   shapeId = shapeRouteMap.get(routeId + '-3' + direction)
//         // }
//       try {
//         let geoJsonProps = Object.assign({direction: direction}, props)
//         let geoJSON = turf.lineString(shapeObj[shapeId], geoJsonProps)
//         allRoutes.push(geoJSON)
//         write('shapefiles/' + geoJSON.properties.shortName + '-' + direction + '.geo.json', geoJSON)
//       } catch (e) {
//           /* one route only goes in one direction: catching that error here */
//         console.error(routeId, direction)
//         console.error(e)
//       }
//     })
//   })
//
//   allRoutes.sort((a, b) => {
//     return a.properties.shortName - b.properties.shortName
//   })
//
//     // TODO: combine route direction A/B linestrings into multilinestrings for `all.geo.json` to get rid of extra "direction a", "direction b" distinction and make file download smaller?
//   let fc = turf.featureCollection(allRoutes)
//   write('shapefiles/all.geo.json', fc)
//
//     /* end timer and alert */
//   console.timeEnd('Make JSONs')
// }
