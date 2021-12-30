const { ipcRenderer } = require('electron');
var $ = require("jquery");
const urlParams = new URLSearchParams(window.location.search);
const ws = new WebSocket('ws://localhost:9898/');


var username;
$(window).ready(function() {
var user=ipcRenderer.sendSync('ayrintilar',{});
username=user["kullanici_adi"];
    $("#ekle").on("click",function (){

        if($("#new_sifre").length != 0){
            var degistir=ipcRenderer.sendSync("sifredegistir_kullanici",{
                oldkullanici_sifre:$("#old_sifre").val(),
                newkullanici_sifre:$("#new_sifre").val(),
                kullanici_adi:username
            })
            if(degistir["response"]=="islem basarili"){
                window.location="gui1.html";
            }
            else{
                console.log("hata oluştu");
            }
        }
        else{
            console.log("boş alan bırakmyın");
        }

    });
    $("#iptal").on("click",function (){

    window.location="gui1.html";
    });
});
