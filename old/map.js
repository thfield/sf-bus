// download bus line names and set up selector list
d3.json('../lines.json', function(err, busLines){
  if (err) console.error(err)

  // make directions 'A' and 'B'
  busLines = busLines.map(function(item) {
      let itemA = Object.assign({}, item)
      let itemB = Object.assign({}, item)
      itemA.direction = "A"
      itemB.direction = "B"
      return [itemA, itemB];
    })
    .reduce(function(a, b) { return a.concat(b) })

  // set up route names list
  d3.select('#route-titles').selectAll('li')
    .data(busLines)
    .enter()
    .append('li')
    .text(function(d){return d.shortName + ' ' + d.longName + ' direction ' + d.direction})
    .attr('class', function(d){ return 'route'+ d.shortName + d.direction})
    .on("mouseover", function(d){
      highlightRoute(d.shortName, d.direction)
    })
    .on("mouseout", function(d){
      unHighlightRoute(d.shortName, d.direction)
    })
    .on('click',function(d){
      if( d3.select(this).classed('sticky-text') ) {
        d3.selectAll('#route-titles > li').classed('sticky-text', false)
        d3.selectAll('.bus-route').classed('sticky-route',false)
      } else {
        d3.selectAll('#route-titles > li').classed('sticky-text', false)
        d3.selectAll('.bus-route')
            .classed('sticky-route',false)
        d3.select(this).classed('sticky-text',true)
        d3.select('path.route' + d.shortName + d.direction)
          .classed('sticky-route',true)
      }
    })
})

function highlightRoute(name,direction) {
  d3.selectAll('.route'+ name + direction)
      .classed('text-highlight', true)
      .classed('route-highlight', true)
      .attr("marker-mid", "url(#arrow)")
}
function unHighlightRoute(name,direction) {
  d3.selectAll('.route'+ name + direction)
      .classed('text-highlight', false)
      .classed('route-highlight', false)
      .attr("marker-mid", null)
}


//Setting up leaflet map
var map = L.map('map').setView([37.767683,-122.433701], 13);

//Getting tile from Mapbox
L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    minZoom: 13,
    attributionControl: true,
    accessToken: 'pk.eyJ1IjoidGhmaWVsZCIsImEiOiJjajZpamRmYzcwdWZnMnhwbTl0YzVtMXdsIn0.EpjPSJjmgnH1ZpTLLJpAqA'
}).addTo(map);

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");

var defs = svg.append("defs")

defs.append("marker")
		.attr({
			"id":"arrow",
      "class":"bus-route",
			"viewBox":"0 -5 10 10",
			"refX":5,
			"refY":0,
			"markerWidth":4,
			"markerHeight":4,
			"orient":"auto"
		})
		.append("path")
			.attr("d", "M0,-3L5,0L0,3")
			.attr("class","arrowHead");

d3_queue.queue()
    .defer(d3.json, "../geojson/combined.geo.json")
    .await(mapDraw)

// function showOneRoute (routeId) {
//   d3.selectAll('.bus-route').classed('hidden', true)
//   d3.select('#'+routeId).classed('hidden', false)
// }
//
// function showAllRoutes () {
//   d3.selectAll('.bus-route').classed('hidden', false)
// }

function mapDraw(err, collection){
    var transform = d3.geo.transform({point: projectPoint}),
        path = d3.geo.path().projection(transform);
    var feature = g.selectAll("path")
        .data(collection.features)
        .enter()
        .append("path")
        .attr('d', path)
        // .attr("marker-end", "url(#arrow)")
        // .attr("marker-start", "url(#arrow)")
        // .attr("marker-mid", "url(#arrow)")
        .attr("class", function(d){
          return 'bus-route route' + d.properties.shortName + d.properties.direction;
        })
        .on("mouseover", function(d){
          highlightRoute(d.properties.shortName, d.properties.direction)
        })
        .on("mouseout", function(d){
          unHighlightRoute(d.properties.shortName, d.properties.direction)
        })

    map.on("viewreset", reset);
    reset();

    // Reposition the SVG to cover the features.
    function reset() {
        var bounds = path.bounds(collection),
            topLeft = bounds[0],
            bottomRight = bounds[1];

        svg .attr("width", bottomRight[0] - topLeft[0])
            .attr("height", bottomRight[1] - topLeft[1])
            .style("left", topLeft[0] + "px")
            .style("top", topLeft[1] + "px");

        g   .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

        feature.attr("d", path);
    }

    // Use Leaflet to implement a D3 geometric transformation.
    function projectPoint(x, y) {
        var point = map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
    }

}
