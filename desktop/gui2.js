const { ipcRenderer } = require('electron');
const ws = new WebSocket('ws://localhost:9898/');
ws.onmessage = function(e) {
    if(e.data=="syncnow"){

        enKisaYolBulMST();

    }
};
var $ = require("jquery");
let map;
var mapProp;
let V = 5;
var directionsService = new google.maps.DirectionsService();
var directionsRenderer = new google.maps.DirectionsRenderer();
const geocoder = new google.maps.Geocoder();
const service = new google.maps.DistanceMatrixService();
location_lat=40.766666;
location_long=29.916668;
var distance_matrice=[];
points=[];
marker_objects=[];
function placeMarkers(map) {
    console.log("çalıştı");
    for (let i = 0; i < points.length; i++) {
        var ic;
        if(i==0){ic="delivery.png";}else{ic="shipping.png";}
        marker_objects[i] = new google.maps.Marker({
            position: points[i],
            map: map,
            icon:ic
        });
    }
}
function removeMarkers() {

    for (let i = 0; i < points.length; i++) {
        marker_objects[i].setMap(null);
    }

    delete map;
    delete marker_objects;

    map = new google.maps.Map(document.getElementById("map"),mapProp);
    marker_objects=[];
    directionsRenderer.setMap(map)
}

const distanceCalculator = async (pt1,pt2) => {
    var request = {
        origins: [pt1],
        destinations: [pt2],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
    };
    var result =  await  service.getDistanceMatrix(request);
    return result.rows[0].elements[0].distance["value"];
};
const createdmx = async () => {
    distance_matrice=[];
    for (var i = 0; i < points.length; i++) {
        distance_matrice[i]=[];
        for (var j = 0; j < points.length; j++) {
            var a = await distanceCalculator(points[i],points[j]);
            distance_matrice[i][j]=a;
            console.log(distance_matrice[i][j].toString());
        }
    }
};
const drawroute = (start,end) => {
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
   directionsService.route(request, function(response, status) {
        if (status == 'OK') {
            var polyline = new google.maps.Polyline({
                path: [],
                strokeColor: '#0000FF',
                strokeWeight: 3
            });

            var bounds = new google.maps.LatLngBounds();
            var legs = response.routes[0].legs;
            for (i = 0; i < legs.length; i++) {
                var steps = legs[i].steps;
                for (j = 0; j < steps.length; j++) {
                    var nextSegment = steps[j].path;
                    for (k = 0; k < nextSegment.length; k++) {
                        polyline.getPath().push(nextSegment[k]);
                        bounds.extend(nextSegment[k]);
                    }
                }
            }

            polyline.setMap(map);
            //directionsRenderer.setDirections(result);
            console.log(result);
        }
    });
};
$(window).ready(function() {

    mapProp= {
        center:new google.maps.LatLng(location_lat,location_long),
        zoom:10,
    };
    map = new google.maps.Map(document.getElementById("map"),mapProp);

    directionsRenderer.setMap(map);
    enKisaYolBulMST();


});

function enKisaYolBulMST(){
    points=[];
    removeMarkers();


    var user = ipcRenderer.sendSync('ayrintilar',{});
    points.push(new google.maps.LatLng(user["kullanici_x_konumu"],user["kullanici_y_konumu"]));
    var kargolar=ipcRenderer.sendSync('listeKargo',{});

    for (const k of kargolar) {
   if(k["kargo_teslim_durumu"]=="0"){ points.push(new google.maps.LatLng(k["kargo_x_konumu"],k["kargo_y_konumu"]));}
    }
    placeMarkers(map);
    var p;
    createdmx().then(()=>{
        V=points.length;
        p = getMST(distance_matrice);



    }).then(()=>{
        for (let i = 1; i < V; i++) {
            drawroute(points[p[i]],points[i]);
            console.log(p[i]+"  :  "+i);
        }
    });
}