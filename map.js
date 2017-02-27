var busLines = [{"shortName":"1","longName":"CALIFORNIA"},{"shortName":"1AX","longName":"CALIFORNIA A EXPRESS"},{"shortName":"1BX","longName":"CALIFORNIA B EXPRESS"},{"shortName":"31AX","longName":"BALBOA A EXPRESS"},{"shortName":"31BX","longName":"BALBOA B EXPRESS"},{"shortName":"38AX","longName":"GEARY A EXPRESS"},{"shortName":"38BX","longName":"GEARY B EXPRESS"},{"shortName":"2","longName":"CLEMENT"},{"shortName":"3","longName":"JACKSON"},{"shortName":"5","longName":"FULTON "},{"shortName":"5R","longName":"FULTON  RAPID"},{"shortName":"6","longName":"HAIGHT-PARNASSUS"},{"shortName":"7","longName":"HAIGHT-NORIEGA"},{"shortName":"7R","longName":"HAIGHT-NORIEGA RAPID"},{"shortName":"7X","longName":"NORIEGA EXPRESS"},{"shortName":"8","longName":"BAYSHORE"},{"shortName":"8AX","longName":"Bayshore A Express"},{"shortName":"8BX","longName":"Bayshore B Express"},{"shortName":"9","longName":"SAN Bruno "},{"shortName":"9R","longName":"SAN BRUNO RAPID"},{"shortName":"10","longName":"TOWNSEND"},{"shortName":"12","longName":"FOLSOM-PACIFIC"},{"shortName":"14","longName":"MISSION"},{"shortName":"14R","longName":"MISSION RAPID"},{"shortName":"14X","longName":"MISSION EXPRESS"},{"shortName":"18","longName":"46TH AVENUE"},{"shortName":"19","longName":"POLK"},{"shortName":"21","longName":"HAYES"},{"shortName":"22","longName":"FILLMORE"},{"shortName":"23","longName":"MONTEREY"},{"shortName":"24","longName":"DIVISADERO"},{"shortName":"25","longName":"TREASURE ISLAND"},{"shortName":"27","longName":"BRYANT"},{"shortName":"28","longName":"19TH AVENUE"},{"shortName":"28R","longName":"19TH AVENUE"},{"shortName":"29","longName":"SUNSET"},{"shortName":"30","longName":"STOCKTON"},{"shortName":"30X","longName":"MARINA EXPRESS"},{"shortName":"31","longName":"BALBOA"},{"shortName":"33","longName":"ASHBURY-18TH ST"},{"shortName":"35","longName":"EUREKA"},{"shortName":"36","longName":"TERESITA"},{"shortName":"37","longName":"CORBETT"},{"shortName":"38","longName":"GEARY"},{"shortName":"38R","longName":"GEARY RAPID"},{"shortName":"39","longName":"COIT"},{"shortName":"41","longName":"UNION"},{"shortName":"43","longName":"MASONIC"},{"shortName":"44","longName":"O'SHAUGHNESSY"},{"shortName":"45","longName":"UNION-STOCKTON"},{"shortName":"47","longName":"VAN NESS"},{"shortName":"48","longName":"QUINTARA-24TH STREET"},{"shortName":"49","longName":"VAN NESS-MISSION"},{"shortName":"52","longName":"EXCELSIOR"},{"shortName":"54","longName":"FELTON"},{"shortName":"55","longName":"16TH STREET"},{"shortName":"56","longName":"RUTLAND"},{"shortName":"57","longName":"PARKMERCED"},{"shortName":"Powell-Mason","longName":"CABLE CAR"},{"shortName":"Powell-Hyde","longName":"CABLE CAR"},{"shortName":"CALIFORNIA","longName":"CABLE CAR"},{"shortName":"66","longName":"QUINTARA"},{"shortName":"67","longName":"BERNAL HEIGHTS"},{"shortName":"76X","longName":"MARIN HEADLANDS EXPRESS"},{"shortName":"81X","longName":"CALTRAIN EXPRESS"},{"shortName":"82X","longName":"LEVI PLAZA EXPRESS"},{"shortName":"83X","longName":"MID-MARKET EXPRESS"},{"shortName":"88","longName":"BART SHUTTLE"},{"shortName":"90","longName":"SAN BRUNO OWL"},{"shortName":"91","longName":"3RD-19TH AVE OWL"},{"shortName":"K-OWL","longName":""},{"shortName":"L-OWL","longName":""},{"shortName":"M-OWL","longName":""},{"shortName":"N-OWL","longName":""},{"shortName":"T-OWL","longName":""},{"shortName":"E","longName":"EMBARCADERO"},{"shortName":"F","longName":"MARKET & WHARVES"},{"shortName":"J","longName":"CHURCH"},{"shortName":"KT","longName":"INGLESIDETHIRD"},{"shortName":"L","longName":"TARAVAL"},{"shortName":"M","longName":"OCEANVIEW"},{"shortName":"N","longName":"JUDAH"},{"shortName":"NX","longName":"N EXPRESS"}]

var foo = d3.select('#route-titles').selectAll('li')
.data(busLines)
.enter()
.append('li')
.text(function(d){return d.shortName + ' ' + d.longName})
.on("mouseover", function(d){
  d3.select(this).classed('highlight',true)
  d3.select('#route' + d.shortName)
    .style("stroke", "#FF5964")
    .style("stroke-width",5);
})
.on("mouseout", function(d){
  d3.select(this).classed('highlight',false)
  d3.select('#route' + d.shortName).style("stroke", "#3E92CC")
    .style("stroke-width",1);
});




//Setting up leaflet map
var map = L.map('map').setView([37.767683,-122.433701], 13);

//Getting tile from Mapbox
L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    minZoom: 13,
    attributionControl: true,
    id: 'smoningi.a304c3dc',
    accessToken: 'pk.eyJ1Ijoic21vbmluZ2kiLCJhIjoiQ21rN1pjSSJ9.WKrPFjjb7LRMBjyban698g'
}).addTo(map);

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g = svg.append("g").attr("class", "leaflet-zoom-hide");


d3_queue.queue()
    .defer(d3.json, "../shapefiles/all.geo.json")
    .await(mapDraw)

function showOneRoute (routeId) {
  d3.selectAll('.bus-route').classed('hidden', true)
  d3.select('#'+routeId).classed('hidden', false)
}

function showAllRoutes () {
  d3.selectAll('.bus-route').classed('hidden', false)
}

function mapDraw(err, collection){
    var transform = d3.geo.transform({point: projectPoint}),
        path = d3.geo.path().projection(transform);
    var feature = g.selectAll("path")
        .data(collection.features)
        .enter()
        .append("path")
        .attr('d', path)
        .attr("id", function(d){
          return 'route' + d.properties.shortName;
        })
        .attr('class', 'bus-route')
        .style("fill", "none")
        .style("stroke", "#3E92CC")
        .style("stroke-width",1)

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
