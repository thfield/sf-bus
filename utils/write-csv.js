const fs = require('fs')

/** @function writeCsv
 * saves a javascript primitive to the filesystem
 * @param {string} filepath - file to save
 * @param {object[]} data - array of object with key-value
 * @returns {boolean||error}
 */
module.exports = function (filepath, data) {
  let wStream = fs.createWriteStream(filepath)
  let headers = Object.keys(data[0])
  wStream.write(headers.join(',') + '\n')
  data.forEach(function (row) {
    let rowText = ''
    headers.forEach(function (d, i) {
      rowText += row[d]
      if (i < headers.length - 1) { rowText += ',' }
    })
    rowText += '\n'
    wStream.write(rowText)
  })
  // close fileWriteStream
  wStream.end()
  console.log(`File saved as ${filepath}`)
}
