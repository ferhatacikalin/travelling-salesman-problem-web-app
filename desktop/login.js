const { ipcRenderer } = require('electron');
var $ = require("jquery");
const ws = new WebSocket('ws://localhost:9898/');







$("#girisyap").click(function (){
    var result=ipcRenderer.sendSync('login', {
       kullanici_adi:$("#username").val(),
       kullanici_sifre:$("#pwd").val()
   });
    if(result["response"]=="success"){
        ipcRenderer.sendSync('opengui2',{});
        window.location="gui1.html";


    }
    else {
        alert("Hata Oluştu");
    }

});
$("#kayitol").click(function (){
window.location="kayitol.html";
});