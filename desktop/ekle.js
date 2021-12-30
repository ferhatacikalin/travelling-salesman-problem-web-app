const { ipcRenderer } = require('electron');
const ws = new WebSocket('ws://localhost:9898/');

var $ = require("jquery");

location_lat=40.766666;
location_long=29.916668;
var marker;
var secildi=false;
var map;
var mapProp
function placeMarker(map, location) {
    if(secildi){
        marker.setMap(null);
    }
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
    location_lat=location.lat();
    location_long=location.lng();

    $("#lat").val(location_lat);
    $("#lng").val(location_long);
    secildi=true;
    console.log("lokasyon: "+location_lat+" "+ location_long);
}
$(window).ready(function() {

    mapProp= {
        center:new google.maps.LatLng(location_lat,location_long),
        zoom:10,
    };
    map = new google.maps.Map(document.getElementById("map"),mapProp);
    placeMarker(map,new google.maps.LatLng(location_lat,location_long));
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(map, event.latLng);
    });


    $("#lat").on("change",function (){

        placeMarker(map,new google.maps.LatLng($(this).val(),location_long));
    });
    $("#lng").on("change",function(){
        placeMarker(map,new google.maps.LatLng(location_lat,$(this).val()));
    });
    $("#ekle").on("click",function (){
        var res = ipcRenderer.sendSync('kargoYeni',{
            musteri_adi:$("#musteriadi").val(),
            kargo_x_konumu: location_lat,
            kargo_y_konumu: location_long

        })
if(res["response"]=="islem basarili"){
    ws.send("updaterequest");
    window.location="gui1.html";
}
else{
    console.log("boş alan bırakmayın");
}
    });
    $("#iptal").on("click",function (){

        window.location="gui1.html";
    });
});
