const { ipcRenderer,dialog } = require('electron');
const ws = new WebSocket('ws://localhost:9898/');

var $ = require("jquery");
$(window).ready(function (){
kargo_liste();
   $(document).on('click','.sil',function(){

   var res=ipcRenderer.sendSync("sil",{
      kargo_id:$(this).val()
   });
   if(res["response"]=="islem basarili"){

      kargo_liste();
      ws.send("updaterequest");

   }
   else {
     console.log("hata oluştu")

   }
});

$(document).on('click','.teslim_durumu_degistir',function () {
   console.log($(this).val());
   if($(this).val()==0){

     var res = ipcRenderer.sendSync('kargo_teslim_durumu',{
         kargo_id:$(this).attr("kargo_id"),
         kargo_teslim_durumu:1,

     });
     kargo_liste();
      ws.send("updaterequest");

   }
   else if($(this).val()==1){
      var res = ipcRenderer.sendSync('kargo_teslim_durumu',{
         kargo_id:$(this).attr("kargo_id"),
         kargo_teslim_durumu:0,
      });
      kargo_liste();
      ws.send("updaterequest");

   }
});
   $(document).on('click','.guncelle',function () {
   window.location="guncelle.html?kargo_id="+$(this).val();


   });

});

function  kargo_liste(){
var kargolar=ipcRenderer.sendSync('listeKargo',{});
   $("#kargolar tbody").html(" ");
   for (const kargolarElement of kargolar) {

      $("#kargolar tbody").append('      <tr>\n' +
          '              <td>'+kargolarElement["kargo_id"]+'</td>' +
          '              <td>'+kargolarElement["kargo_teslim_durumu"]+'</td>' +
          '              <td><button type="button" value="'+kargolarElement["kargo_id"]+'" class="btn btn-sm btn-danger sil">Sil</button>' +
          '                  <button type="button" kargo_id="'+kargolarElement["kargo_id"]+'" value="'+kargolarElement["kargo_teslim_durumu"]+'" class="btn btn-sm btn-info teslim_durumu_degistir">Teslim Durumu Değiştir</button>' +
          ' <button type="button" value="'+kargolarElement["kargo_id"]+'" class="btn btn-sm btn-outline-success guncelle">Bilgileri Güncelle</button> </td>            </tr>');


   }
}