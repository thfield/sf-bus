"use strict"
const start = new Date()

const fs = require('fs')
const csv = require('csv-parse')
const turf = require('turf')

const path = './google_transit/'

let routes_file = 'routes.txt'
let trips_file = 'trips.txt'
let shapes_file = 'shapes.txt'

/* Maps */
let shapeRouteMap = new Map() // from trips.txt { route_id+service_id+[A/B]: most_common_route_id_for_that_service_window}
let routeNameMap = new Map() // from routes.txt { route_id: {shortName, longName} }
let shapeMap = new Map() // from shapes.txt {  }

/* read the csvs from fs */
let routes = fs.readFileSync(path + routes_file, 'utf8')
let trips = fs.readFileSync(path + trips_file, 'utf8')
let shapes = fs.readFileSync(path + shapes_file, 'utf8')

let allRoutes = []

/* parse csv strings into objects */
csv(routes, {columns: true}, parseRoutes)
csv(trips, {columns: true}, parseTrips)
csv(shapes, {columns: true}, parseShapes)

function parseRoutes(err,data){
  /* make name map */
  if (err) console.error(err)
  data.forEach(el=>{
    // get rid of extraneous spaces in short_name field
    let shorty = el.route_short_name.replace(/ /g, '')
    routeNameMap.set(el.route_id,{shortName:shorty, longName:el.route_long_name})
  })
}

function parseTrips(err, data){
  /* make trip map */
  if (err) console.error(err)
  let tripz = {}

  // TODO do something with the route / shape for weekend and late night trips
  data.forEach(el=>{
    tripz[el.route_id] = tripz[el.route_id] || { }
    tripz[el.route_id][el.service_id] = tripz[el.route_id][el.service_id] || []
    tripz[el.route_id][el.service_id][el.direction_id] = tripz[el.route_id][el.service_id][el.direction_id] || {}
    tripz[el.route_id][el.service_id][el.direction_id][el.shape_id] = tripz[el.route_id][el.service_id][el.direction_id][el.shape_id] || 0
    tripz[el.route_id][el.service_id][el.direction_id][el.shape_id] += 1
  })
  /*
  tripz now looks like:
    {
      route_id: {
        "1"(service_id): [
          {shape_id: count, ...},
          {shape_id: count, ...}
        ],
        "2"(service_id): [
          {shape_id: count, ...},
          {shape_id: count, ...}
        ],
        "3"(service_id): [
          {shape_id: count, ...},
          {shape_id: count, ...}
        ]
      },
      ...
    }
  */

  for (let route in tripz) {
    for (let serviceId in tripz[route]){
      let dirA = mostCommonValue(tripz[route][serviceId][0])
      let dirB = mostCommonValue(tripz[route][serviceId][1])
      shapeRouteMap.set(route+ '-' + serviceId + 'A', dirA)
      shapeRouteMap.set(route+ '-' + serviceId + 'B', dirB)
    }
  }
}

function mostCommonValue(obj) {
  if(!obj){ return 0 }
  return Object.keys(obj).reduce(function(a, b){ return obj[a] > obj[b] ? a : b }, 0)
}

function parseShapes(err, data){
  if (err) console.error(err)
  let lineshapes = {}
  data.forEach(el=>{
    lineshapes[''+el.shape_id] = lineshapes[''+el.shape_id] || []
    lineshapes[''+el.shape_id].push([+el.shape_pt_lon,+el.shape_pt_lat])
  })
  /* lineshapes is now k-v pairs, shape_id:[coordinates] */

  // TODO write geojson linestrings for each shape, keyed by shape_id?
  // want to get by route
  routeNameMap.forEach((props, routeId)=>{
    let directions = ['A','B']
    directions.forEach(direction=>{
      let shapeId = shapeRouteMap.get(routeId + '-1' + direction)
      if (shapeId === undefined) {
        shapeId = shapeRouteMap.get(routeId + '-2' + direction)
      }
      if (shapeId === undefined) {
        shapeId = shapeRouteMap.get(routeId + '-3' + direction)
      }
      try{
        let geoJsonProps = Object.assign({direction:direction}, props)
        let geoJSON = turf.lineString(lineshapes[shapeId], geoJsonProps)
        allRoutes.push( geoJSON )
        // write('shapefiles/' + geoJSON.properties.shortName + '-' + direction + '.geo.json', geoJSON)
      } catch(e){
        console.error(routeId, direction)
        console.error(e)
      }

    })
  })

  allRoutes.sort((a,b)=>{
    return a.properties.shortName - b.properties.shortName
  })

  let fc = turf.featureCollection(allRoutes)
  write('shapefiles/all.geo.json', fc)

  let elapsed = (new Date() - start) / 1000
  console.log('took ' + elapsed + 's')
}





// output the file
function write(filename, text){
  if (typeof text != 'string') text = JSON.stringify(text)
  fs.writeFile(filename, text,
    function(err) {
      if (err) { return console.log(err); }
      console.log("The file was saved as", filename);
    }
  )
}
