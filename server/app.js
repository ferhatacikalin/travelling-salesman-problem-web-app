var mysql = require("mysql");
var session = require("express-session");
var bodyParser = require("body-parser");
const { request } = require("express");
var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
const endpoints = require("./endpoints");
const routes = require("./routes");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const PORT = 8080;
app.use(
  session({
    saveUninitialized: true,
    secret: "3aS{xpqATEm/h/dZ(b3?6yf$ed9'<p",
    resave: false,
  })
);

var conn = mysql.createConnection({
  host: 'database-2.cpvep42dk1js.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'MuzKarpuz.0709',
  database: 'cloud_database_yazlab_amazon'
});

conn.connect(function (err) {
  if (err) {
    console.log(err);
  }
});
function girischeck(req, res, next) {
  if (req.session.kullanici_id) {
    next();
  } else {
res.json({response:"giris yap"});
res.end();
    
}
}
app.get('/',function(req,res){
res.send("v.0.1");
res.end();
});
//enpointleri  berlirle
app.get("/listeKargo", girischeck, routes["listeKargo"]);
app.get("/ayrintilar", girischeck, routes["ayrintilar"]);
app.get("/girisOldumu", routes["girisOldumu"]);
app.get("/kullanici_id", routes["kullanici_id"]);
app.post("/guncelleKargo", routes["guncelleKargo"]);
app.post("/getKargoDetay", routes["getKargoDetay"]);
app.post("/konumdegistirKullanici", routes["konumdegistirKullanici"]);
app.post("/kargoYeni", routes["kargoYeni"]);
app.post("/kargo_teslim_durumu", girischeck, routes["kargo_teslim_durumu"]);
app.post("/giris", routes["giris"]);
app.post("/kayitGerceklestir", routes["kayitGerceklestir"]);
app.post("/sifredegistir_kullanici", routes["sifredegistir_kullanici"]);
app.post("/sil", girischeck, routes["sil"]);
app.post("/getMusteri", girischeck, routes["getMusteri"]);

app.listen(PORT);
console.log(">Server is running on: "+PORT);


