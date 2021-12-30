const { ipcRenderer } = require('electron');
var $ = require("jquery");
const ws = new WebSocket('ws://localhost:9898/');







$("#kayit").click(function (){
    var result=ipcRenderer.sendSync('kayitGerceklestir', {
       kullanici_adi:$("#username").val(),
       kullanici_sifre:$("#pwd").val(),
        kullanici_eposta:$("#mail").val()
   });
    if(result["response"]=="islem basarili"){

        window.location="login.html";


    }
    else {
        alert("Hata Oluştu");
    }

});