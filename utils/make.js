'use strict'
const d3 = require('d3-collection')

/** @function makeRoutesMap
 * @param {object[]} data - array created from routes.txt
 * @returns {Map} key: route_id, value: {shortName, longName}
 */
function makeRoutesMap (data) {
  let routeMap = new Map()
  data.forEach(el => {
    /* get rid of extraneous spaces in short_name field */
    let shorty = el.route_short_name.replace(/ /g, '')
    routeMap.set(el.route_id, {shortName: shorty, longName: el.route_long_name})
  })
  return routeMap
}

/** @function makeShapesMap
 * @param {object[]} data - array created from shapes.txt
 * @returns {Map} key: shape_id, value: [[lat,lon],...]
 */
function makeShapesMap (data) {
  let shapeMap = new Map()
  let shapeNest = d3.nest()
    .key(d => d.shape_id)
    .entries(data)
  shapeNest.forEach(function (el) {
    let a = el.values.map(d => [+d.shape_pt_lon, +d.shape_pt_lat, +d.shape_pt_sequence])
      .sort((a, b) => { return a[2] - b[2] })
    a.forEach(function (el) { el.length = 2 })
    shapeMap.set(el.key, a)
  })
  return shapeMap
}

/** @function makeTripsMap
 * @param {object[]} data - array created from trips.txt
 * @returns {Map} key: shape_id, value: {trip_headsign, route_id, service_id}
 */
function makeTripsMap (data) {
  let tripMap = new Map()
  data.forEach(el => {
    tripMap.set(el.shape_id, {
      direction: el.direction_id,
      headsign: el.trip_headsign,
      route_id: el.route_id,
      service_id: el.service_id
    })
  })
  return tripMap
}

/** @function makeTripsFreqNest
 * @param {object[]} data - array created from trips.txt
 * @returns {object[]} data nested by route_id, service_id, shape_id, then count of shape_id
 */
function makeTripsFreqNest (data) {
  /* make trip frequency */
  return d3.nest()
    .key(function (d) { return d.route_id })
    .key(function (d) { return d.service_id })
    .key(function (d) { return d.direction_id })
    .key(function (d) { return d.shape_id })
    .rollup(function (v) {
      return v.length
    })
    .entries(data)
}

/** @function mostFrequentTrips
 * @param {object[]} data - return value from makeTripsFreqNest
 */
function mostFrequentTrips (data) {
  return data.map(function (route) {
    let services = route.values.map(function (service) {
      let services = service.values.map(function (direction) {
        let v = mostFrequentShape(direction.values)
        return {direction_id: direction.key, shape_id: v}
      })
      return {service_id: service.key, values: services}
    })
    return {route_id: route.key, values: services}
  })
}

/** @function makeLineList
 * @param data - csv-parsed routes.txt
 * @returns {array} - a list of the lines {shortName, longName}
 */
function makeLineList (data) {
  return data.map(d => { return { shortName: d.route_short_name, longName: d.route_long_name } })
}

/** @function busType
 * determine what kind of transit the route is
 * @param shortName
 * @returns array
 */
function busType (shortName) {
  let cablecars = ['PM', 'PH', 'C']
  let streetcars = ['E', 'F', 'J', 'K/T', 'L', 'M', 'N']
  let res = ''
  if (shortName.includes('R')) res = 'rapid'
  if (shortName.includes('X')) res = 'express'
  if (shortName.includes('OWL')) res = 'owl'
  if (cablecars.includes(shortName)) res = 'cablecar'
  if (streetcars.includes(shortName)) res = 'streetcar'
  return res
}

// ############### helper functions ###############

/** @function valuesOfMap
 * get an array of the values from a Map
 * @param {map} map
 * @returns {array} an array of the values of map
 */
function valuesOfMap (map) {
  return Array.from(map).map(d => d[1])
}

/** @function mostFrequentShape
 * @param {array} data - array of values from d3.nest()
 * @returns value of "key" for highest value in array
 */
function mostFrequentShape (data) {
  let res = data.sort((a, b) => { return b.value - a.value })
  return res[0].key
}

module.exports = {
  routesMap: makeRoutesMap,
  shapesMap: makeShapesMap,
  tripsFreqNest: makeTripsFreqNest,
  tripsMap: makeTripsMap,
  mostFrequentTrips: mostFrequentTrips,
  lineList: makeLineList,
  busType: busType
}
