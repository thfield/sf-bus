'use strict'

const fs = require('fs')
const turf = require('turf')
const write = require('./utils/write')

const path = `./geojson`

fs.readdir(path, combine)

function combine (error, files) {
  if (error) console.error(error)
  let features = []
  files.forEach(function (filename) {
    if (filename === '.DS_Store') return
    features.push(require(`${path}/${filename}`))
  })
  let geojson = turf.featureCollection(features)
  let bbox = turf.bbox(geojson)
  console.log(bbox)
  return write(`./combined.geo.json`, geojson)
}
