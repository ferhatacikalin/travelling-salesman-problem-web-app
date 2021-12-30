const endpoints = require("./endpoints");


module.exports={
    "listeKargo" :endpoints.listeKargo,
    "ayrintilar" : endpoints.ayrintilar,
    "girisOldumu" : endpoints.girisOldumu,
    "kullanici_id" : endpoints.kullanici_id,
    "guncelleKargo" : endpoints.guncelleKargo,
    "getKargoDetay" : endpoints.getKargoDetay,
    "konumdegistirKullanici" :endpoints.konumdegistirKullanici,
    "kargoYeni" : endpoints.kargoYeni,
    "kargo_teslim_durumu" :  endpoints.kargo_teslim_durumu,
    "giris" : endpoints.giris,
    "kayitGerceklestir" : endpoints.kayitGerceklestir,
    "sifredegistir_kullanici" : endpoints.sifredegistir_kullanici,
    "sil" :endpoints.sil,
    "getMusteri" : endpoints.getMusteri

}