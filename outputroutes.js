"use strict";
const fs = require('fs')
const csv = require('csv-parse')

const path = './google_transit/'

let arr = []

let routes_file = 'routes.txt'
let routes = fs.readFileSync(path + routes_file, 'utf8')
csv(routes, {columns: true}, parseRoutes)

function parseRoutes(err,data){
  /* make name map */
  if (err) console.error(err)
  data.forEach(el=>{
    let shorty = el.route_short_name.replace(/ /g, '')
    arr.push({shortName:shorty, longName:el.route_long_name})
  })
  write('lines.json', arr)
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
