!function(a){function t(d){if(e[d])return e[d].exports;var n=e[d]={i:d,l:!1,exports:{}};return a[d].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var e={};t.m=a,t.c=e,t.d=function(a,e,d){t.o(a,e)||Object.defineProperty(a,e,{configurable:!1,enumerable:!0,get:d})},t.n=function(a){var e=a&&a.__esModule?function(){return a.default}:function(){return a};return t.d(e,"a",e),e},t.o=function(a,t){return Object.prototype.hasOwnProperty.call(a,t)},t.p="",t(t.s=0)}([function(a,t,e){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function n(){document.querySelector(".aside").style.width="300px",document.querySelector("#expand").style.display="none"}function r(){document.querySelector(".aside").style.width="0",document.querySelector("#expand").style.display="block"}function i(){m.addSource("routes",{type:"vector",url:"mapbox://thfield.cj9uf6cwt73q22qlgopvm0707-7g4hb"}),m.addLayer({id:"bus-routes-highlighted",type:"line",source:"routes","source-layer":"sf-bus",paint:{"line-color":S,"line-width":5,"line-opacity":1},filter:["in","shortName",""]}),m.addSource("geojson",{type:"geojson",data:y}),m.addLayer({id:"points",type:"circle",source:"geojson",paint:{"circle-radius":10,"circle-color":S,"circle-opacity":.5,"circle-stroke-width":3,"circle-stroke-color":"#000"},filter:["in","$type","Point"]}),m.on("click",o)}function o(a){var t=[[a.point.x-5,a.point.y-5],[a.point.x+5,a.point.y+5]],e=m.queryRenderedFeatures(t,{layers:["sf-bus"]}),d=e.map(function(a){return{text:a.properties.shortName+" "+a.properties.longName+" - "+a.properties.headsign,"data-direction":a.properties.direction,"data-shortName":a.properties.shortName,"data-longName":a.properties.longName,"data-headsign":a.properties.headsign}});for(d.sort(function(a,t){return a["data-shortName"]<t["data-shortName"]?-1:1});p.firstChild;)p.removeChild(p.firstChild);d.forEach(function(a){return s(a,p)});var n={type:"Feature",geometry:{type:"Point",coordinates:[a.lngLat.lng,a.lngLat.lat]},properties:{id:String((new Date).getTime())}};m.getSource("geojson").setData(n),(0,u.default)("highlit-routes","route-list");var r=l(e,"shortName"),i=l(e,"headsign"),o=["all",r,i];m.setFilter("bus-routes-highlighted",o);var h=document.querySelector("#reset");h&&h.remove(),h=document.createElement("button"),h.id="reset",h.innerHTML="show all highlighted routes",h.addEventListener("click",function(a){var t=["all",r,i];document.querySelector(".routeselect").childNodes.forEach(function(a){a.classList.remove("hl")}),m.setFilter("bus-routes-highlighted",t)}),E.appendChild(h)}function s(a,t){var e=document.createElement("li");Object.keys(a).filter(function(a){return a.includes("data-")}).forEach(function(t){return e.setAttribute(t,a[t])});var d=document.createTextNode(a.text);return e.appendChild(d),e.addEventListener("click",function(a){this.parentElement.childNodes.forEach(function(a){a.classList.remove("hl")}),this.classList.add("hl");var t=["all",["in","shortName",this.dataset.shortname],["in","headsign",this.dataset.headsign]];m.setFilter("bus-routes-highlighted",t)}),t.appendChild(e)}function l(a,t){return a.reduce(function(a,e){return a.push(e.properties[t]),a},["in",t])}e(1);var h=e(6),N=d(h),c=e(7),u=d(c);mapboxgl.accessToken="pk.eyJ1IjoidGhmaWVsZCIsImEiOiI4YTA3MmJkY2Q0OTg0YTkzMDAxOWQ3NzIyMzQ3NjIzOSJ9.LxGif2Jlko59H3l5yUvZug";var m=new mapboxgl.Map({container:"map",style:"mapbox://styles/thfield/cj9ug3fgn3vtu2su96gcihye1",zoom:12,center:[-122.447303,37.753574],maxBounds:[[-122.6,37.65],[-122.3,37.9]]});m.addControl(new mapboxgl.NavigationControl,"top-left"),m.on("load",i),document.querySelector("#expand").addEventListener("click",n),document.querySelector("#collapse").addEventListener("click",r),document.querySelectorAll(".tab").forEach(function(a){a.addEventListener("click",function(a){(0,u.default)(this.dataset.target,"route-list")})});var A=document.getElementById("all-routes"),g=document.createElement("ul");N.default.forEach(function(a){s(a,g)}),A.appendChild(g);var E=document.getElementById("highlit-routes"),p=document.createElement("ul");p.setAttribute("class","routeselect"),E.appendChild(p);var S="#e09600",y={type:"FeatureCollection",features:[]}},function(a,t,e){var d=e(2);"string"==typeof d&&(d=[[a.i,d,""]]);var n={hmr:!0};n.transform=void 0;e(4)(d,n);d.locals&&(a.exports=d.locals)},function(a,t,e){t=a.exports=e(3)(void 0),t.push([a.i,"body {\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n}\n#map {\n  position:absolute;\n  top:0;\n  bottom:0;\n  width:100%;\n  z-index: 1;\n}\n.aside {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 0;\n  /*width: 300px;*/\n  font-family: sans-serif;\n  font-size: 9pt;\n  overflow: auto;\n  background: rgba(255, 255, 255, 0.8);\n  transition: 0.5s;\n  z-index: 2;\n}\n#tab-switcher {\n  top: 0;\n  height: 24px;\n  background: rgba(255, 255, 255, 1);\n  font-size: 9pt;\n}\n#tab-panels {\n\n}\n.tab {\n  display: inline-block;\n  height: 15px;\n  cursor: pointer;\n  margin: 1px auto 1px;\n  padding: 0 5px;\n  border: 1px solid black;\n}\n.tab:hover {\n  background:#b5b5b5;\n}\n.route-list {\n  cursor: pointer;\n}\n.route-list ul {\n  list-style-type: none;\n  padding-left: 0.5rem;\n}\n.route-list li:hover {\n  color: #e09600;\n}\n.hl {\n  color: #e09600;\n}\n.hidden {\n  display: none;\n}\n.slidertoggle {\n  position: absolute;\n  top: 0;\n  right: 0;\n  cursor: pointer;\n  z-index: 100;\n  background-color: white;\n  padding: 5px;\n  border-radius: 4px;\n}",""])},function(a,t){function e(a,t){var e=a[1]||"",n=a[3];if(!n)return e;if(t&&"function"==typeof btoa){var r=d(n);return[e].concat(n.sources.map(function(a){return"/*# sourceURL="+n.sourceRoot+a+" */"})).concat([r]).join("\n")}return[e].join("\n")}function d(a){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"}a.exports=function(a){var t=[];return t.toString=function(){return this.map(function(t){var d=e(t,a);return t[2]?"@media "+t[2]+"{"+d+"}":d}).join("")},t.i=function(a,e){"string"==typeof a&&(a=[[null,a,""]]);for(var d={},n=0;n<this.length;n++){var r=this[n][0];"number"==typeof r&&(d[r]=!0)}for(n=0;n<a.length;n++){var i=a[n];"number"==typeof i[0]&&d[i[0]]||(e&&!i[2]?i[2]=e:e&&(i[2]="("+i[2]+") and ("+e+")"),t.push(i))}},t}},function(a,t,e){function d(a,t){for(var e=0;e<a.length;e++){var d=a[e],n=m[d.id];if(n){n.refs++;for(var r=0;r<n.parts.length;r++)n.parts[r](d.parts[r]);for(;r<d.parts.length;r++)n.parts.push(h(d.parts[r],t))}else{for(var i=[],r=0;r<d.parts.length;r++)i.push(h(d.parts[r],t));m[d.id]={id:d.id,refs:1,parts:i}}}}function n(a,t){for(var e=[],d={},n=0;n<a.length;n++){var r=a[n],i=t.base?r[0]+t.base:r[0],o=r[1],s=r[2],l=r[3],h={css:o,media:s,sourceMap:l};d[i]?d[i].parts.push(h):e.push(d[i]={id:i,parts:[h]})}return e}function r(a,t){var e=g(a.insertInto);if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var d=S[S.length-1];if("top"===a.insertAt)d?d.nextSibling?e.insertBefore(t,d.nextSibling):e.appendChild(t):e.insertBefore(t,e.firstChild),S.push(t);else if("bottom"===a.insertAt)e.appendChild(t);else{if("object"!=typeof a.insertAt||!a.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var n=g(a.insertInto+" "+a.insertAt.before);e.insertBefore(t,n)}}function i(a){if(null===a.parentNode)return!1;a.parentNode.removeChild(a);var t=S.indexOf(a);t>=0&&S.splice(t,1)}function o(a){var t=document.createElement("style");return a.attrs.type="text/css",l(t,a.attrs),r(a,t),t}function s(a){var t=document.createElement("link");return a.attrs.type="text/css",a.attrs.rel="stylesheet",l(t,a.attrs),r(a,t),t}function l(a,t){Object.keys(t).forEach(function(e){a.setAttribute(e,t[e])})}function h(a,t){var e,d,n,r;if(t.transform&&a.css){if(!(r=t.transform(a.css)))return function(){};a.css=r}if(t.singleton){var l=p++;e=E||(E=o(t)),d=N.bind(null,e,l,!1),n=N.bind(null,e,l,!0)}else a.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=s(t),d=u.bind(null,e,t),n=function(){i(e),e.href&&URL.revokeObjectURL(e.href)}):(e=o(t),d=c.bind(null,e),n=function(){i(e)});return d(a),function(t){if(t){if(t.css===a.css&&t.media===a.media&&t.sourceMap===a.sourceMap)return;d(a=t)}else n()}}function N(a,t,e,d){var n=e?"":d.css;if(a.styleSheet)a.styleSheet.cssText=R(t,n);else{var r=document.createTextNode(n),i=a.childNodes;i[t]&&a.removeChild(i[t]),i.length?a.insertBefore(r,i[t]):a.appendChild(r)}}function c(a,t){var e=t.css,d=t.media;if(d&&a.setAttribute("media",d),a.styleSheet)a.styleSheet.cssText=e;else{for(;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(document.createTextNode(e))}}function u(a,t,e){var d=e.css,n=e.sourceMap,r=void 0===t.convertToAbsoluteUrls&&n;(t.convertToAbsoluteUrls||r)&&(d=y(d)),n&&(d+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var i=new Blob([d],{type:"text/css"}),o=a.href;a.href=URL.createObjectURL(i),o&&URL.revokeObjectURL(o)}var m={},A=function(a){var t;return function(){return void 0===t&&(t=a.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),g=function(a){var t={};return function(e){if(void 0===t[e]){var d=a.call(this,e);if(d instanceof window.HTMLIFrameElement)try{d=d.contentDocument.head}catch(a){d=null}t[e]=d}return t[e]}}(function(a){return document.querySelector(a)}),E=null,p=0,S=[],y=e(5);a.exports=function(a,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");t=t||{},t.attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=A()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var e=n(a,t);return d(e,t),function(a){for(var r=[],i=0;i<e.length;i++){var o=e[i],s=m[o.id];s.refs--,r.push(s)}if(a){d(n(a,t),t)}for(var i=0;i<r.length;i++){var s=r[i];if(0===s.refs){for(var l=0;l<s.parts.length;l++)s.parts[l]();delete m[s.id]}}}};var R=function(){var a=[];return function(t,e){return a[t]=e,a.filter(Boolean).join("\n")}}()},function(a,t){a.exports=function(a){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!a||"string"!=typeof a)return a;var e=t.protocol+"//"+t.host,d=e+t.pathname.replace(/\/[^\/]*$/,"/");return a.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(a,t){var n=t.trim().replace(/^"(.*)"$/,function(a,t){return t}).replace(/^'(.*)'$/,function(a,t){return t});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(n))return a;var r;return r=0===n.indexOf("//")?n:0===n.indexOf("/")?e+n:d+n.replace(/^\.\//,""),"url("+JSON.stringify(r)+")"})}},function(a,t){a.exports=[{text:"1 CALIFORNIA - Geary + 33rd Avenue","data-direction":0,"data-shortName":"1","data-longName":"CALIFORNIA","data-headsign":"Geary + 33rd Avenue","data-bustype":""},{text:"1 CALIFORNIA - Drumm + Clay","data-direction":1,"data-shortName":"1","data-longName":"CALIFORNIA","data-headsign":"Drumm + Clay","data-bustype":""},{text:"1AX  CALIFORNIA A EXPRESS - Geary + 33rd Avenue","data-direction":0,"data-shortName":"1AX ","data-longName":"CALIFORNIA A EXPRESS","data-headsign":"Geary + 33rd Avenue","data-bustype":"express"},{text:"1AX  CALIFORNIA A EXPRESS - the Financial District","data-direction":1,"data-shortName":"1AX ","data-longName":"CALIFORNIA A EXPRESS","data-headsign":"the Financial District","data-bustype":"express"},{text:"1BX  CALIFORNIA B EXPRESS - Sixth Avenue","data-direction":0,"data-shortName":"1BX ","data-longName":"CALIFORNIA B EXPRESS","data-headsign":"Sixth Avenue","data-bustype":"express"},{text:"1BX  CALIFORNIA B EXPRESS - the Financial District","data-direction":1,"data-shortName":"1BX ","data-longName":"CALIFORNIA B EXPRESS","data-headsign":"the Financial District","data-bustype":"express"},{text:"31AX BALBOA A EXPRESS - Ocean Beach","data-direction":0,"data-shortName":"31AX","data-longName":"BALBOA A EXPRESS","data-headsign":"Ocean Beach","data-bustype":"express"},{text:"31AX BALBOA A EXPRESS - Financial District","data-direction":1,"data-shortName":"31AX","data-longName":"BALBOA A EXPRESS","data-headsign":"Financial District","data-bustype":"express"},{text:"31BX BALBOA B EXPRESS - Park Presidio Boulevard","data-direction":0,"data-shortName":"31BX","data-longName":"BALBOA B EXPRESS","data-headsign":"Park Presidio Boulevard","data-bustype":"express"},{text:"31BX BALBOA B EXPRESS - Financial District","data-direction":1,"data-shortName":"31BX","data-longName":"BALBOA B EXPRESS","data-headsign":"Financial District","data-bustype":"express"},{text:"38AX GEARY A EXPRESS - 48th Avenue","data-direction":0,"data-shortName":"38AX","data-longName":"GEARY A EXPRESS","data-headsign":"48th Avenue","data-bustype":"express"},{text:"38AX GEARY A EXPRESS - Financial District","data-direction":1,"data-shortName":"38AX","data-longName":"GEARY A EXPRESS","data-headsign":"Financial District","data-bustype":"express"},{text:"38BX GEARY B EXPRESS - 25th Avenue","data-direction":0,"data-shortName":"38BX","data-longName":"GEARY B EXPRESS","data-headsign":"25th Avenue","data-bustype":"express"},{text:"38BX GEARY B EXPRESS - Financial District","data-direction":1,"data-shortName":"38BX","data-longName":"GEARY B EXPRESS","data-headsign":"Financial District","data-bustype":"express"},{text:"2 SUTTER/CLEMENT - Park Presidio Boulevard","data-direction":0,"data-shortName":"2","data-longName":"SUTTER/CLEMENT","data-headsign":"Park Presidio Boulevard","data-bustype":""},{text:"2 SUTTER/CLEMENT - Mission + Main","data-direction":1,"data-shortName":"2","data-longName":"SUTTER/CLEMENT","data-headsign":"Mission + Main","data-bustype":""},{text:"3 JACKSON - Presidio + California","data-direction":0,"data-shortName":"3","data-longName":"JACKSON","data-headsign":"Presidio + California","data-bustype":""},{text:"3 JACKSON - Market + Sansome","data-direction":1,"data-shortName":"3","data-longName":"JACKSON","data-headsign":"Market + Sansome","data-bustype":""},{text:"5    FULTON  - Ocean Beach","data-direction":0,"data-shortName":"5   ","data-longName":"FULTON ","data-headsign":"Ocean Beach","data-bustype":""},{text:"5    FULTON  - Transbay Terminal","data-direction":1,"data-shortName":"5   ","data-longName":"FULTON ","data-headsign":"Transbay Terminal","data-bustype":""},{text:"5R R FULTON RAPID - Ocean Beach","data-direction":0,"data-shortName":"5R","data-longName":"R FULTON RAPID","data-headsign":"Ocean Beach","data-bustype":"rapid"},{text:"5R R FULTON RAPID - Transbay Terminal","data-direction":1,"data-shortName":"5R","data-longName":"R FULTON RAPID","data-headsign":"Transbay Terminal","data-bustype":"rapid"},{text:"6 HAIGHT-PARNASSUS - Quintara + 14th Avenue","data-direction":0,"data-shortName":"6","data-longName":"HAIGHT-PARNASSUS","data-headsign":"Quintara + 14th Avenue","data-bustype":""},{text:"6 HAIGHT-PARNASSUS - Ferry Plaza","data-direction":1,"data-shortName":"6","data-longName":"HAIGHT-PARNASSUS","data-headsign":"Ferry Plaza","data-bustype":""},{text:"7 HAIGHT-NORIEGA - Great Highway","data-direction":0,"data-shortName":"7","data-longName":"HAIGHT-NORIEGA","data-headsign":"Great Highway","data-bustype":""},{text:"7 HAIGHT-NORIEGA - Transbay Terminal","data-direction":1,"data-shortName":"7","data-longName":"HAIGHT-NORIEGA","data-headsign":"Transbay Terminal","data-bustype":""},{text:"7X NORIEGA EXPRESS - Great Highway","data-direction":0,"data-shortName":"7X","data-longName":"NORIEGA EXPRESS","data-headsign":"Great Highway","data-bustype":"express"},{text:"7X NORIEGA EXPRESS - Ferry Plaza","data-direction":1,"data-shortName":"7X","data-longName":"NORIEGA EXPRESS","data-headsign":"Ferry Plaza","data-bustype":"express"},{text:"8    BAYSHORE - City College","data-direction":0,"data-shortName":"8   ","data-longName":"BAYSHORE","data-headsign":"City College","data-bustype":""},{text:"8    BAYSHORE - Fisherman's Wharf","data-direction":1,"data-shortName":"8   ","data-longName":"BAYSHORE","data-headsign":"Fisherman's Wharf","data-bustype":""},{text:"8AX  Bayshore A Express - Geneva + Schwerin","data-direction":0,"data-shortName":"8AX ","data-longName":"Bayshore A Express","data-headsign":"Geneva + Schwerin","data-bustype":"express"},{text:"8AX  Bayshore A Express - Pacific + Kearny","data-direction":1,"data-shortName":"8AX ","data-longName":"Bayshore A Express","data-headsign":"Pacific + Kearny","data-bustype":"express"},{text:"8BX  Bayshore B Express - City College","data-direction":0,"data-shortName":"8BX ","data-longName":"Bayshore B Express","data-headsign":"City College","data-bustype":"express"},{text:"8BX  Bayshore B Express - Fisherman's Wharf","data-direction":1,"data-shortName":"8BX ","data-longName":"Bayshore B Express","data-headsign":"Fisherman's Wharf","data-bustype":"express"},{text:"9 SAN BRUNO - Cow Palace","data-direction":0,"data-shortName":"9","data-longName":"SAN BRUNO","data-headsign":"Cow Palace","data-bustype":""},{text:"9 SAN BRUNO - Ferry Plaza","data-direction":1,"data-shortName":"9","data-longName":"SAN BRUNO","data-headsign":"Ferry Plaza","data-bustype":""},{text:"9R SAN BRUNO RAPID - Sunnydale","data-direction":0,"data-shortName":"9R","data-longName":"SAN BRUNO RAPID","data-headsign":"Sunnydale","data-bustype":"rapid"},{text:"9R SAN BRUNO RAPID - Main & Mission","data-direction":1,"data-shortName":"9R","data-longName":"SAN BRUNO RAPID","data-headsign":"Main & Mission","data-bustype":"rapid"},{text:"10 TOWNSEND - Potrero + 24th Street","data-direction":0,"data-shortName":"10","data-longName":"TOWNSEND","data-headsign":"Potrero + 24th Street","data-bustype":""},{text:"10 TOWNSEND - Fillmore + Jackson","data-direction":1,"data-shortName":"10","data-longName":"TOWNSEND","data-headsign":"Fillmore + Jackson","data-bustype":""},{text:"12 FOLSOM-PACIFIC - Mission District","data-direction":0,"data-shortName":"12","data-longName":"FOLSOM-PACIFIC","data-headsign":"Mission District","data-bustype":""},{text:"12 FOLSOM-PACIFIC - Van Ness Avenue","data-direction":1,"data-shortName":"12","data-longName":"FOLSOM-PACIFIC","data-headsign":"Van Ness Avenue","data-bustype":""},{text:"14 MISSION - Daly City","data-direction":0,"data-shortName":"14","data-longName":"MISSION","data-headsign":"Daly City","data-bustype":""},{text:"14 MISSION - Ferry Plaza","data-direction":1,"data-shortName":"14","data-longName":"MISSION","data-headsign":"Ferry Plaza","data-bustype":""},{text:"14R MISSION RAPID - Daly City BART","data-direction":0,"data-shortName":"14R","data-longName":"MISSION RAPID","data-headsign":"Daly City BART","data-bustype":"rapid"},{text:"14R MISSION RAPID - Ferry Plaza","data-direction":1,"data-shortName":"14R","data-longName":"MISSION RAPID","data-headsign":"Ferry Plaza","data-bustype":"rapid"},{text:"14X MISSION EXPRESS - Daly City","data-direction":0,"data-shortName":"14X","data-longName":"MISSION EXPRESS","data-headsign":"Daly City","data-bustype":"express"},{text:"14X MISSION EXPRESS - Ferry Plaza","data-direction":1,"data-shortName":"14X","data-longName":"MISSION EXPRESS","data-headsign":"Ferry Plaza","data-bustype":"express"},{text:"18 46TH AVENUE - Stonestown","data-direction":0,"data-shortName":"18","data-longName":"46TH AVENUE","data-headsign":"Stonestown","data-bustype":""},{text:"18 46TH AVENUE - Legion of Honor","data-direction":1,"data-shortName":"18","data-longName":"46TH AVENUE","data-headsign":"Legion of Honor","data-bustype":""},{text:"19 POLK - Shipyard","data-direction":0,"data-shortName":"19","data-longName":"POLK","data-headsign":"Shipyard","data-bustype":""},{text:"19 POLK - Beach Street","data-direction":1,"data-shortName":"19","data-longName":"POLK","data-headsign":"Beach Street","data-bustype":""},{text:"21 HAYES - Stanyan Street","data-direction":0,"data-shortName":"21","data-longName":"HAYES","data-headsign":"Stanyan Street","data-bustype":""},{text:"21 HAYES - Ferry Plaza","data-direction":1,"data-shortName":"21","data-longName":"HAYES","data-headsign":"Ferry Plaza","data-bustype":""},{text:"22 FILLMORE - Third + 20th Streets","data-direction":0,"data-shortName":"22","data-longName":"FILLMORE","data-headsign":"Third + 20th Streets","data-bustype":""},{text:"22 FILLMORE - Bay Street","data-direction":1,"data-shortName":"22","data-longName":"FILLMORE","data-headsign":"Bay Street","data-bustype":""},{text:"23 MONTEREY - S.F. Zoo","data-direction":0,"data-shortName":"23","data-longName":"MONTEREY","data-headsign":"S.F. Zoo","data-bustype":""},{text:"23 MONTEREY - Bayview District","data-direction":1,"data-shortName":"23","data-longName":"MONTEREY","data-headsign":"Bayview District","data-bustype":""},{text:"24 DIVISADERO - Palou + Third Street","data-direction":0,"data-shortName":"24","data-longName":"DIVISADERO","data-headsign":"Palou + Third Street","data-bustype":""},{text:"24 DIVISADERO - Jackson + Fillmore","data-direction":1,"data-shortName":"24","data-longName":"DIVISADERO","data-headsign":"Jackson + Fillmore","data-bustype":""},{text:"25 TREASURE ISLAND - Treasure Island","data-direction":0,"data-shortName":"25","data-longName":"TREASURE ISLAND","data-headsign":"Treasure Island","data-bustype":""},{text:"25 TREASURE ISLAND - Transbay Terminal","data-direction":1,"data-shortName":"25","data-longName":"TREASURE ISLAND","data-headsign":"Transbay Terminal","data-bustype":""},{text:"27 BRYANT - Chavez + Mission","data-direction":0,"data-shortName":"27","data-longName":"BRYANT","data-headsign":"Chavez + Mission","data-bustype":""},{text:"27 BRYANT - Jackson + Van Ness","data-direction":1,"data-shortName":"27","data-longName":"BRYANT","data-headsign":"Jackson + Van Ness","data-bustype":""},{text:"28 19TH AVENUE - Daly City BART","data-direction":0,"data-shortName":"28","data-longName":"19TH AVENUE","data-headsign":"Daly City BART","data-bustype":""},{text:"28 19TH AVENUE - North Point + Van Ness","data-direction":1,"data-shortName":"28","data-longName":"19TH AVENUE","data-headsign":"North Point + Van Ness","data-bustype":""},{text:"28R 19TH AVENUE - Balboa Park","data-direction":0,"data-shortName":"28R","data-longName":"19TH AVENUE","data-headsign":"Balboa Park","data-bustype":"rapid"},{text:"28R 19TH AVENUE - California + Sixth Avenue","data-direction":1,"data-shortName":"28R","data-longName":"19TH AVENUE","data-headsign":"California + Sixth Avenue","data-bustype":"rapid"},{text:"29 SUNSET - Paul + Third Street","data-direction":0,"data-shortName":"29","data-longName":"SUNSET","data-headsign":"Paul + Third Street","data-bustype":""},{text:"29 SUNSET - Baker Beach","data-direction":1,"data-shortName":"29","data-longName":"SUNSET","data-headsign":"Baker Beach","data-bustype":""},{text:"30 STOCKTON - Jefferson Loop","data-direction":0,"data-shortName":"30","data-longName":"STOCKTON","data-headsign":"Jefferson Loop","data-bustype":""},{text:"30 STOCKTON - Caltrain Depot","data-direction":1,"data-shortName":"30","data-longName":"STOCKTON","data-headsign":"Caltrain Depot","data-bustype":""},{text:"30X MARINA EXPRESS - Jefferson Loop","data-direction":0,"data-shortName":"30X","data-longName":"MARINA EXPRESS","data-headsign":"Jefferson Loop","data-bustype":"express"},{text:"30X MARINA EXPRESS - Embarcadero","data-direction":1,"data-shortName":"30X","data-longName":"MARINA EXPRESS","data-headsign":"Embarcadero","data-bustype":"express"},{text:"31 BALBOA - Ocean Beach","data-direction":0,"data-shortName":"31","data-longName":"BALBOA","data-headsign":"Ocean Beach","data-bustype":""},{text:"31 BALBOA - Ferry Plaza","data-direction":1,"data-shortName":"31","data-longName":"BALBOA","data-headsign":"Ferry Plaza","data-bustype":""},{text:"33 ASHBURY-18TH ST - Potrero + 25th Street","data-direction":0,"data-shortName":"33","data-longName":"ASHBURY-18TH ST","data-headsign":"Potrero + 25th Street","data-bustype":""},{text:"33 ASHBURY-18TH ST - Sacramento + Cherry","data-direction":1,"data-shortName":"33","data-longName":"ASHBURY-18TH ST","data-headsign":"Sacramento + Cherry","data-bustype":""},{text:"35 EUREKA - Glen Park BART","data-direction":0,"data-shortName":"35","data-longName":"EUREKA","data-headsign":"Glen Park BART","data-bustype":""},{text:"35 EUREKA - Market + Castro","data-direction":1,"data-shortName":"35","data-longName":"EUREKA","data-headsign":"Market + Castro","data-bustype":""},{text:"36 TERESITA - Chavez + Valencia","data-direction":0,"data-shortName":"36","data-longName":"TERESITA","data-headsign":"Chavez + Valencia","data-bustype":""},{text:"36 TERESITA - Forest Hill Station","data-direction":1,"data-shortName":"36","data-longName":"TERESITA","data-headsign":"Forest Hill Station","data-bustype":""},{text:"37 CORBETT - Twin Peaks","data-direction":0,"data-shortName":"37","data-longName":"CORBETT","data-headsign":"Twin Peaks","data-bustype":""},{text:"37 CORBETT - Masonic + Haight","data-direction":1,"data-shortName":"37","data-longName":"CORBETT","data-headsign":"Masonic + Haight","data-bustype":""},{text:"38 GEARY - V. A. Hospital","data-direction":0,"data-shortName":"38","data-longName":"GEARY","data-headsign":"V. A. Hospital","data-bustype":""},{text:"38 GEARY - Transbay Terminal","data-direction":1,"data-shortName":"38","data-longName":"GEARY","data-headsign":"Transbay Terminal","data-bustype":""},{text:"38R GEARY RAPID - Lands End - 48th Avenue","data-direction":0,"data-shortName":"38R","data-longName":"GEARY RAPID","data-headsign":"Lands End - 48th Avenue","data-bustype":"rapid"},{text:"38R GEARY RAPID - Transbay Terminal","data-direction":1,"data-shortName":"38R","data-longName":"GEARY RAPID","data-headsign":"Transbay Terminal","data-bustype":"rapid"},{text:"39 COIT - Coit Tower","data-direction":0,"data-shortName":"39","data-longName":"COIT","data-headsign":"Coit Tower","data-bustype":""},{text:"39 COIT - Fisherman's Wharf","data-direction":1,"data-shortName":"39","data-longName":"COIT","data-headsign":"Fisherman's Wharf","data-bustype":""},{text:"41 UNION - Lyon + Greenwich","data-direction":0,"data-shortName":"41","data-longName":"UNION","data-headsign":"Lyon + Greenwich","data-bustype":""},{text:"41 UNION - Transbay Terminal","data-direction":1,"data-shortName":"41","data-longName":"UNION","data-headsign":"Transbay Terminal","data-bustype":""},{text:"43 MASONIC - Munich + Geneva","data-direction":0,"data-shortName":"43","data-longName":"MASONIC","data-headsign":"Munich + Geneva","data-bustype":""},{text:"43 MASONIC - Fort Mason","data-direction":1,"data-shortName":"43","data-longName":"MASONIC","data-headsign":"Fort Mason","data-bustype":""},{text:"44 O'SHAUGHNESSY - Bayview District","data-direction":0,"data-shortName":"44","data-longName":"O'SHAUGHNESSY","data-headsign":"Bayview District","data-bustype":""},{text:"44 O'SHAUGHNESSY - California + Seventh Avenue","data-direction":1,"data-shortName":"44","data-longName":"O'SHAUGHNESSY","data-headsign":"California + Seventh Avenue","data-bustype":""},{text:"45 UNION-STOCKTON - Lyon + Greenwich","data-direction":0,"data-shortName":"45","data-longName":"UNION-STOCKTON","data-headsign":"Lyon + Greenwich","data-bustype":""},{text:"45 UNION-STOCKTON - Caltrain Depot","data-direction":1,"data-shortName":"45","data-longName":"UNION-STOCKTON","data-headsign":"Caltrain Depot","data-bustype":""},{text:"47 VAN NESS - Caltrain Depot","data-direction":0,"data-shortName":"47","data-longName":"VAN NESS","data-headsign":"Caltrain Depot","data-bustype":""},{text:"47 VAN NESS - Fisherman's Wharf","data-direction":1,"data-shortName":"47","data-longName":"VAN NESS","data-headsign":"Fisherman's Wharf","data-bustype":""},{text:"48 QUINTARA-24TH STREET - West Portal Station","data-direction":0,"data-shortName":"48","data-longName":"QUINTARA-24TH STREET","data-headsign":"West Portal Station","data-bustype":""},{text:"48 QUINTARA-24TH STREET - Third + 20th Streets","data-direction":1,"data-shortName":"48","data-longName":"QUINTARA-24TH STREET","data-headsign":"Third + 20th Streets","data-bustype":""},{text:"49 VAN NESS-MISSION - City College","data-direction":0,"data-shortName":"49","data-longName":"VAN NESS-MISSION","data-headsign":"City College","data-bustype":""},{text:"49 VAN NESS-MISSION - North Point + Van Ness","data-direction":1,"data-shortName":"49","data-longName":"VAN NESS-MISSION","data-headsign":"North Point + Van Ness","data-bustype":""},{text:"52 EXCELSIOR - Persia + Prague","data-direction":0,"data-shortName":"52","data-longName":"EXCELSIOR","data-headsign":"Persia + Prague","data-bustype":""},{text:"52 EXCELSIOR - Forest Hill Station","data-direction":1,"data-shortName":"52","data-longName":"EXCELSIOR","data-headsign":"Forest Hill Station","data-bustype":""},{text:"54 FELTON - Daly City BART","data-direction":0,"data-shortName":"54","data-longName":"FELTON","data-headsign":"Daly City BART","data-bustype":""},{text:"54 FELTON - Bayview District","data-direction":1,"data-shortName":"54","data-longName":"FELTON","data-headsign":"Bayview District","data-bustype":""},{text:"55 16TH STREET - UCSF Mission Bay","data-direction":0,"data-shortName":"55","data-longName":"16TH STREET","data-headsign":"UCSF Mission Bay","data-bustype":""},{text:"55 16TH STREET - Mission Street / BART","data-direction":1,"data-shortName":"55","data-longName":"16TH STREET","data-headsign":"Mission Street / BART","data-bustype":""},{text:"56 RUTLAND - Executive Park","data-direction":0,"data-shortName":"56","data-longName":"RUTLAND","data-headsign":"Executive Park","data-bustype":""},{text:"56 RUTLAND - Visitacion Valley Middle School","data-direction":1,"data-shortName":"56","data-longName":"RUTLAND","data-headsign":"Visitacion Valley Middle School","data-bustype":""},{text:"57 PARKMERCED - Lakeshore Plaza","data-direction":0,"data-shortName":"57","data-longName":"PARKMERCED","data-headsign":"Lakeshore Plaza","data-bustype":""},{text:"57 PARKMERCED - West Portal Station","data-direction":1,"data-shortName":"57","data-longName":"PARKMERCED","data-headsign":"West Portal Station","data-bustype":""},{text:"PM POWELL-MASON CABLE CAR - Bay + Taylor","data-direction":0,"data-shortName":"PM","data-longName":"POWELL-MASON CABLE CAR","data-headsign":"Bay + Taylor","data-bustype":"cablecar"},{text:"PM POWELL-MASON CABLE CAR - Market + Powell","data-direction":1,"data-shortName":"PM","data-longName":"POWELL-MASON CABLE CAR","data-headsign":"Market + Powell","data-bustype":"cablecar"},{text:"PH POWELL-HYDE CABLE CAR - Beach + Hyde","data-direction":0,"data-shortName":"PH","data-longName":"POWELL-HYDE CABLE CAR","data-headsign":"Beach + Hyde","data-bustype":"cablecar"},{text:"PH POWELL-HYDE CABLE CAR - Market + Powell","data-direction":1,"data-shortName":"PH","data-longName":"POWELL-HYDE CABLE CAR","data-headsign":"Market + Powell","data-bustype":"cablecar"},{text:"C CALIFORNIA CABLE CAR - Van Ness + California","data-direction":0,"data-shortName":"C","data-longName":"CALIFORNIA CABLE CAR","data-headsign":"Van Ness + California","data-bustype":"cablecar"},{text:"C CALIFORNIA CABLE CAR - Market + California","data-direction":1,"data-shortName":"C","data-longName":"CALIFORNIA CABLE CAR","data-headsign":"Market + California","data-bustype":"cablecar"},{text:"66 QUINTARA - Vicente + 30th Avenue","data-direction":0,"data-shortName":"66","data-longName":"QUINTARA","data-headsign":"Vicente + 30th Avenue","data-bustype":""},{text:"66 QUINTARA - Judah + Ninth Avenue","data-direction":1,"data-shortName":"66","data-longName":"QUINTARA","data-headsign":"Judah + Ninth Avenue","data-bustype":""},{text:"67 BERNAL HEIGHTS - Alemany + Ellsworth","data-direction":0,"data-shortName":"67","data-longName":"BERNAL HEIGHTS","data-headsign":"Alemany + Ellsworth","data-bustype":""},{text:"67 BERNAL HEIGHTS - Mission + 24th Street","data-direction":1,"data-shortName":"67","data-longName":"BERNAL HEIGHTS","data-headsign":"Mission + 24th Street","data-bustype":""},{text:"76X MARIN HEADLANDS EXPRESS - Marin Headlands","data-direction":0,"data-shortName":"76X","data-longName":"MARIN HEADLANDS EXPRESS","data-headsign":"Marin Headlands","data-bustype":"express"},{text:"76X MARIN HEADLANDS EXPRESS - Downtown S.F.","data-direction":1,"data-shortName":"76X","data-longName":"MARIN HEADLANDS EXPRESS","data-headsign":"Downtown S.F.","data-bustype":"express"},{text:"81X  CALTRAIN EXPRESS - undefined","data-direction":0,"data-shortName":"81X ","data-longName":"CALTRAIN EXPRESS","data-bustype":"express"},{text:"81X  CALTRAIN EXPRESS - Financial District","data-direction":1,"data-shortName":"81X ","data-longName":"CALTRAIN EXPRESS","data-headsign":"Financial District","data-bustype":"express"},{text:"82X  LEVI PLAZA EXPRESS - Caltrain Depot","data-direction":0,"data-shortName":"82X ","data-longName":"LEVI PLAZA EXPRESS","data-headsign":"Caltrain Depot","data-bustype":"express"},{text:"82X  LEVI PLAZA EXPRESS - Sansome + Filbert","data-direction":1,"data-shortName":"82X ","data-longName":"LEVI PLAZA EXPRESS","data-headsign":"Sansome + Filbert","data-bustype":"express"},{text:"83X MID-MARKET EXPRESS - Caltrain Depot","data-direction":0,"data-shortName":"83X","data-longName":"MID-MARKET EXPRESS","data-headsign":"Caltrain Depot","data-bustype":"express"},{text:"83X MID-MARKET EXPRESS - Civic Center","data-direction":1,"data-shortName":"83X","data-longName":"MID-MARKET EXPRESS","data-headsign":"Civic Center","data-bustype":"express"},{text:"88 BART SHUTTLE - Sickles + Mission","data-direction":0,"data-shortName":"88","data-longName":"BART SHUTTLE","data-headsign":"Sickles + Mission","data-bustype":""},{text:"88 BART SHUTTLE - Balboa Park Station","data-direction":1,"data-shortName":"88","data-longName":"BART SHUTTLE","data-headsign":"Balboa Park Station","data-bustype":""},{text:"90 SAN BRUNO OWL - Visitacion Valley","data-direction":0,"data-shortName":"90","data-longName":"SAN BRUNO OWL","data-headsign":"Visitacion Valley","data-bustype":""},{text:"90 SAN BRUNO OWL - North Point + Van Ness","data-direction":1,"data-shortName":"90","data-longName":"SAN BRUNO OWL","data-headsign":"North Point + Van Ness","data-bustype":""},{text:"91 3RD-19TH AVE OWL - West Portal Station","data-direction":0,"data-shortName":"91","data-longName":"3RD-19TH AVE OWL","data-headsign":"West Portal Station","data-bustype":""},{text:"91 3RD-19TH AVE OWL - S.F. State University","data-direction":1,"data-shortName":"91","data-longName":"3RD-19TH AVE OWL","data-headsign":"S.F. State University","data-bustype":""},{text:"K-OWL INGLESIDE OWL - Balboa Park","data-direction":0,"data-shortName":"K-OWL","data-longName":"INGLESIDE OWL","data-headsign":"Balboa Park","data-bustype":"owl"},{text:"K-OWL INGLESIDE OWL - Ferry Plaza","data-direction":1,"data-shortName":"K-OWL","data-longName":"INGLESIDE OWL","data-headsign":"Ferry Plaza","data-bustype":"owl"},{text:"L-OWL TARAVAL OWL - Wawona + 46th Avenue","data-direction":0,"data-shortName":"L-OWL","data-longName":"TARAVAL OWL","data-headsign":"Wawona + 46th Avenue","data-bustype":"owl"},{text:"L-OWL TARAVAL OWL - Ferry Plaza","data-direction":1,"data-shortName":"L-OWL","data-longName":"TARAVAL OWL","data-headsign":"Ferry Plaza","data-bustype":"owl"},{text:"M-OWL OCEANVIEW OWL - Balboa Park","data-direction":0,"data-shortName":"M-OWL","data-longName":"OCEANVIEW OWL","data-headsign":"Balboa Park","data-bustype":"owl"},{text:"M-OWL OCEANVIEW OWL - Ferry Plaza","data-direction":1,"data-shortName":"M-OWL","data-longName":"OCEANVIEW OWL","data-headsign":"Ferry Plaza","data-bustype":"owl"},{text:"N-OWL JUDAH OWL - Ocean Beach","data-direction":0,"data-shortName":"N-OWL","data-longName":"JUDAH OWL","data-headsign":"Ocean Beach","data-bustype":"owl"},{text:"N-OWL JUDAH OWL - Fourth St + Townsend","data-direction":1,"data-shortName":"N-OWL","data-longName":"JUDAH OWL","data-headsign":"Fourth St + Townsend","data-bustype":"owl"},{text:"T-OWL THIRD OWL - Van Ness + Market","data-direction":0,"data-shortName":"T-OWL","data-longName":"THIRD OWL","data-headsign":"Van Ness + Market","data-bustype":"owl"},{text:"T-OWL THIRD OWL - Visitacion Valley","data-direction":1,"data-shortName":"T-OWL","data-longName":"THIRD OWL","data-headsign":"Visitacion Valley","data-bustype":"owl"},{text:"E EMBARCADERO - Mission Bay","data-direction":0,"data-shortName":"E","data-longName":"EMBARCADERO","data-headsign":"Mission Bay","data-bustype":"streetcar"},{text:"E EMBARCADERO - Fisherman's Wharf","data-direction":1,"data-shortName":"E","data-longName":"EMBARCADERO","data-headsign":"Fisherman's Wharf","data-bustype":"streetcar"},{text:"F MARKET & WHARVES - Castro","data-direction":0,"data-shortName":"F","data-longName":"MARKET & WHARVES","data-headsign":"Castro","data-bustype":"streetcar"},{text:"F MARKET & WHARVES - Fisherman's Wharf","data-direction":1,"data-shortName":"F","data-longName":"MARKET & WHARVES","data-headsign":"Fisherman's Wharf","data-bustype":"streetcar"},{text:"NX N EXPRESS - Ocean Beach","data-direction":0,"data-shortName":"NX","data-longName":"N EXPRESS","data-headsign":"Ocean Beach","data-bustype":"express"},{text:"NX N EXPRESS - Financial District","data-direction":1,"data-shortName":"NX","data-longName":"N EXPRESS","data-headsign":"Financial District","data-bustype":"express"},{text:"J CHURCH - Balboa Park Station","data-direction":0,"data-shortName":"J","data-longName":"CHURCH","data-headsign":"Balboa Park Station","data-bustype":"streetcar"},{text:"J CHURCH - Embarcadero Station","data-direction":1,"data-shortName":"J","data-longName":"CHURCH","data-headsign":"Embarcadero Station","data-bustype":"streetcar"},{text:"K/T INGLESIDE/THIRD - Balboa Park Station","data-direction":0,"data-shortName":"K/T","data-longName":"INGLESIDE/THIRD","data-headsign":"Balboa Park Station","data-bustype":"streetcar"},{text:"K/T INGLESIDE/THIRD - Sunnydale & Bayshore","data-direction":1,"data-shortName":"K/T","data-longName":"INGLESIDE/THIRD","data-headsign":"Sunnydale & Bayshore","data-bustype":"streetcar"},{text:"L TARAVAL - S.F. Zoo","data-direction":0,"data-shortName":"L","data-longName":"TARAVAL","data-headsign":"S.F. Zoo","data-bustype":"streetcar"},{text:"L TARAVAL - Embarcadero Station","data-direction":1,"data-shortName":"L","data-longName":"TARAVAL","data-headsign":"Embarcadero Station","data-bustype":"streetcar"},{text:"M OCEANVIEW - Balboa Park Station via S.F. State","data-direction":0,"data-shortName":"M","data-longName":"OCEANVIEW","data-headsign":"Balboa Park Station via S.F. State","data-bustype":"streetcar"},{text:"M OCEANVIEW - Embarcadero Station","data-direction":1,"data-shortName":"M","data-longName":"OCEANVIEW","data-headsign":"Embarcadero Station","data-bustype":"streetcar"},{text:"N JUDAH - Ocean Beach","data-direction":0,"data-shortName":"N","data-longName":"JUDAH","data-headsign":"Ocean Beach","data-bustype":"streetcar"},{text:"N JUDAH - Caltrain/Ball Park","data-direction":1,"data-shortName":"N","data-longName":"JUDAH","data-headsign":"Caltrain/Ball Park","data-bustype":"streetcar"}]},function(a,t,e){"use strict";a.exports=function(a,t){document.querySelectorAll("."+t).forEach(function(a){return a.classList.add("hidden")}),document.querySelector("#"+a).classList.remove("hidden")}}]);