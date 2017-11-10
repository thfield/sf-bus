'use strict'
const d3 = require('d3-collection')
const nestedFind = require('./nestedFind')

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
    tripMap.set(el.shape_id, {headsign: el.trip_headsign, route_id: el.route_id, service_id: el.service_id})
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
    .key(function (d) { return `${d.shape_id}` })
    .rollup(function (v) {
      return v.length
    })
    .entries(data)
}

/** @function mostFrequentShape
 * @param {array} data - array of values from d3.nest()
 * @returns value of "key" for highest value in array
 */
function mostFrequentShape (data) {
  let res = data.sort((a, b) => { return b.value - a.value })
  return res[0].key
}

/** @function mostFrequentTrips
 * @param {object[]} data - return value from makeTripsFreqNest
 */
function mostFrequentTrips (data) {
  return data.map(function (shape) {
    let freqs = shape.values.map(function (sId) {
      let v = mostFrequentShape(sId.values)
      return {service_id: sId.key, shape_id: v}
    })
    return {route_id: shape.key, freq: freqs}
  })
}

function geoJsonShape () {

}

module.exports = {
  routesMap: makeRoutesMap,
  shapesMap: makeShapesMap,
  tripsFreqNest: makeTripsFreqNest,
  tripsMap: makeTripsMap,
  // mostFrequentShape: mostFrequentShape,
  mostFrequentTrips: mostFrequentTrips
}
