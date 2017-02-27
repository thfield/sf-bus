"use strict";
const start = new Date()

const fs = require('fs')
const csv = require('csv-parse')
const turf = require('turf')

const path = './google_transit/'

let routes_file = 'routes.txt'
let trips_file = 'trips.txt'
let shapes_file = 'shapes.txt'

/* Maps */
let shapeRouteMap = new Map()
let routeNameMap = new Map()

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
    let shorty = el.route_short_name.replace(/ /g, '')
    routeNameMap.set(el.route_id,{shortName:shorty, longName:el.route_long_name})
  })
}

function parseTrips(err, data){
  /* make trip map */
  if (err) console.error(err)
  let tripz = {}

  data.forEach(el=>{
    tripz[el.shape_id] = tripz[el.shape_id] || []
    tripz[el.shape_id].push(el.route_id)
  })
  for (let shapeID in tripz){
    shapeRouteMap.set(tripz[shapeID][0],shapeID)
  }
}

function parseShapes(err, data){
  if (err) console.error(err)
  let lineshapes = {}
  data.forEach(el=>{
    lineshapes[''+el.shape_id] = lineshapes[''+el.shape_id] || []
    lineshapes[''+el.shape_id].push([el.shape_pt_lon,el.shape_pt_lat])
  })
  /* lineshapes is now k-v pairs, shape_id:[coordinates] */

  // want to get by route
  routeNameMap.forEach((props, routeId)=>{
    let shapeId = shapeRouteMap.get(routeId)
    let geoJSON = turf.lineString(lineshapes[shapeId], props)
    allRoutes.push(geoJSON)
    write('shapefiles/' + geoJSON.properties.shortName + '.geo.json', geoJSON)
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
