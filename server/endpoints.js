var mysql = require("mysql");
var session = require("express-session");
var bodyParser = require("body-parser");
const { request } = require("express");
var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");
var conn = mysql.createConnection({
  host: 'database-2.cpvep42dk1js.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'MuzKarpuz.0709',
  database: 'cloud_database_yazlab_amazon'
});
var cors = require('cors');

app.use(cors( {
  origin: true,
  credentials: true,
  maxAge: 3600
}));
conn.connect(function (err) {
  if (err) {
    console.log(err);
  }
});

sil=function (req, res) {
  if (req.body.kargo_id) {
    var silmusteri_adi;
    conn.query(
      "SELECT * FROM kargo_bilgileri WHERE kargo_id=" + mysql.escape(req.body.kargo_id),
      function (err, result, fields) {
        if (err) throw err;
        silmusteri_id = result[0].musteri_id;
        conn.query(
          "DELETE FROM kargo_bilgileri WHERE kargo_id=" + mysql.escape(req.body.kargo_id),
          function (err, result, fields) {
            if (err) throw err;

            conn.query(
              "DELETE  FROM musterivekargo_bilgileri WHERE musteri_id=" +
                mysql.escape(silmusteri_id),
              function (err, result, fields) {
                if (err) throw err;

                res.json({ response: "islem basarili" });
                res.end();
              }
            );
          }
        );
      }
    );
  } else {
    res.json({ response: "Hata Meydana Geldi " });
    res.end();
  }
};
listeKargo=function (req, res) {
  conn.query("SELECT * FROM kargo_bilgileri", function (err, result) {
    res.json(result);
    res.end();
  });
};
getMusteri=function (req, res) {
    if (req.body.musteri_id) {
      conn.query(
        "SELECT * FROM musterivekargo_bilgileri WHERE musteri_id=" +
          mysql.escape(req.body.musteri_id),
        function (err, result) {
          if (err) throw err;
          res.json(result[0]);
          res.end();
        }
      );
    } else {
      res.json({ response: "Hata Meydana Geldi " });
      res.end();
    }
};
getKargoDetay=function (req, res) {
    if (req.body.kargo_id) {
      conn.query(
        "SELECT * FROM kargo_bilgileri WHERE kargo_id=" +
          mysql.escape(req.body.kargo_id),
        function (err, result) {
          if (err) throw err;
          res.json(result[0]);
          res.end();
        }
      );
    } else {
      res.json({ response: "Hata Meydana Geldi " });
      res.end();
    }
};
guncelleKargo=function (req, res) {
    if (req.body.kargo_id) {
      var kargo_id = req.body.kargo_id;
      var musteri_adi = req.body.musteri_adi;
      
      var kargo_teslim_durumu = req.body.kargo_teslim_durumu;
      var kargo_x_konumu = req.body.kargo_x_konumu;
      var kargo_y_konumu = req.body.kargo_y_konumu;
      var updatemusteri_id;
      conn.query(
        "SELECT * FROM kargo_bilgileri WHERE kargo_id=" + mysql.escape(req.body.kargo_id),
        function (err, result, fields) {
          if (err) throw err;
          updatemusteri_id = result[0].musteri_id;
          var update_sql =
            "UPDATE kargo_bilgileri SET  kargo_x_konumu=" +
            mysql.escape(kargo_x_konumu) +
            " , kargo_y_konumu=" +
            mysql.escape(kargo_y_konumu) +
            " , kargo_teslim_durumu=" +
            mysql.escape(kargo_teslim_durumu) +
            " WHERE kargo_id=" +
            mysql.escape(kargo_id);
          conn.query(update_sql, function (err, result) {
            if (err) throw err;
            var update_sql2 =
              "UPDATE musterivekargo_bilgileri SET musteri_adi=" +
              mysql.escape(musteri_adi) +
              " WHERE musteri_id=" +mysql.escape(updatemusteri_id);
            conn.query(update_sql2, function (err, result) {
              if (err) throw err;
              res.json({ response: "islem basarili" });
              res.end();
            });
          });
        }
      );
    } else {
      res.json({ response: "error" });
      res.end();
    }
};
kargo_teslim_durumu=function (req, res) {
    if (req.body.kargo_id) {
      try {
        var sql =
          "UPDATE kargo_bilgileri SET kargo_teslim_durumu=" +
          mysql.escape(req.body.kargo_teslim_durumu) +
          " WHERE kargo_id=" +
          mysql.escape(req.body.kargo_id);
        conn.query(sql, function (err, result) {
          if (err) console.log("error");
          res.json({ response: "islem basarili" });
          res.end();
        });
      } catch (error) {
        res.send("HATA");
        res.end();
      }
    } else {
      res.json({ response: "Hata Meydana Geldi " });
      res.end();
    }
};
kargoYeni=function (req, res) {
    if (req.body.musteri_adi) {
      var musteri_adi = req.body.musteri_adi;
      var kargo_x_konumu = req.body.kargo_x_konumu;
      var kargo_y_konumu = req.body.kargo_y_konumu;
      var sonekleme;
  
      sql1 =
        "INSERT INTO musterivekargo_bilgileri(musteri_adi) VALUES (" +
        mysql.escape(musteri_adi)+")" ;
      conn.query(sql1, function (err, result) {
        if (err) throw err;
        sonekleme = result.insertId;
        sql2 =
          "INSERT INTO kargo_bilgileri(kargo_x_konumu,kargo_y_konumu,musteri_id,kargo_teslim_durumu) VALUES (" +
          mysql.escape(kargo_x_konumu) +
          "," +
          mysql.escape(kargo_y_konumu) +
          "," +
          mysql.escape(sonekleme) +
          "," +
          mysql.escape("0") + 
          ")";

        conn.query(sql2, function (err, result) {
          if (err) throw err;
          res.json({ response: "islem basarili" });
          res.end();
        });
      });
    } else {
      res.json({ response: "Hata Meydana Geldi " });
      res.end();
    }
};
kayitGerceklestir=function (req, res) {
    if (req.body.kullanici_eposta && req.body.kullanici_adi && req.body.kullanici_sifre) {
      var sql =
        "INSERT INTO kullanici_kurye(kullanici_adi,kullanici_eposta,kullanici_sifre) VALUES(" +
        mysql.escape(req.body.kullanici_adi) +
        "," +
        mysql.escape(req.body.kullanici_eposta) +
        "," +
        mysql.escape(req.body.kullanici_sifre) +
        ")";
      conn.query(sql, function (err, result) {
        if (err) throw err;
        res.json({ response: "islem basarili" });
        res.end();
      });
    } else {
      res.json({ response: "Hata Meydana Geldi " });
      res.end();
    }
  };
  sifredegistir_kullanici= function (req, res) {
    var old_kullanici_sifre;
    if (req.body.newkullanici_sifre) {
      try {
        let sql0 =
          "SELECT * FROM kullanici_kurye WHERE kullanici_adi = " +
          mysql.escape(req.body.kullanici_adi);
  
        conn.query(sql0, function (err, results) {
          if (err) throw err;
          old_kullanici_sifre = results[0].kullanici_sifre;
          if (old_kullanici_sifre == req.body.oldkullanici_sifre) {
            var sql =
              "UPDATE kullanici_kurye SET kullanici_sifre=" +
              mysql.escape(req.body.newkullanici_sifre) +
              " WHERE kullanici_adi=" +
              mysql.escape(req.body.kullanici_adi);
            conn.query(sql, function (err, result) {
              if (err) console.log("error");
              res.json({ response: "islem basarili" });
              res.end();
            });
          } else {
            res.json({ response: "Hata Meydana Geldi " });
            res.end();
          }
        });
      } catch (error) {
        res.send("HATA");
        res.end();
      }
    } else {
      res.json({ response: "Hata Meydana Geldi " });
      res.end();
    }
  };
  kullanici_id=function (req, res) {
      try {
        console.log(req.session.kullanici_id);
        res.json({ id: req.session.kullanici_id });
        res.end();
      } catch (error) {
        console.log(error);
        res.end();
      }
  };
  ayrintilar=function (req, res) {
      try {
        let sql =
          "SELECT * FROM kullanici_kurye WHERE kullanici_id = " +
          mysql.escape(req.session.kullanici_id);
    
        conn.query(sql, function (err, results) {
          if (err) throw err;
          res.json(results[0]);
          res.end();
        });
      } catch (error) {
        console.log(error);
        res.end();
      }
  };
  giris=function (req, res,) {
  
      let sql =
        "SELECT * FROM kullanici_kurye WHERE kullanici_adi =" +
        mysql.escape(req.body.kullanici_adi) +
        " and kullanici_sifre=" +
        mysql.escape(req.body.kullanici_sifre);
    
      conn.query(sql, function (err, results) {
        if (err) throw err;
        if (results.length == 1) {
       
          req.session.kullanici_id = results[0].kullanici_id;
    
          res.json({response:"success"})
          res.end();
        } else {
      
          res.json({response:"invalid"})
          res.end();
        }
      });
  };
  girisOldumu= function (req, res) {
      if (req.session.kullanici_id) {
  
        res.json({ response: "logged_in" });
        res.end();
      } else {
        res.json({ response: "not_logged_in" });
        res.end();
      }
  }; 
  
    konumdegistirKullanici=function (req, res) {
      if (req.body.kullanici_x_konumu && req.body.kullanici_y_konumu) {
      var sql="UPDATE kullanici_kurye SET kullanici_x_konumu="+mysql.escape(req.body.kullanici_x_konumu)+", kullanici_y_konumu="+mysql.escape(req.body.kullanici_y_konumu)+" WHERE kullanici_id="+mysql.escape(req.session.kullanici_id);
      conn.query(sql,function(err,results){
        if (err) throw err;
        res.json({response:"islem basarili"});
        res.end();
    
      });
    
      } else {
        res.json({ response: "Hata Meydana Geldi " });
        res.end();
      }
    };
module.exports={
    kargoYeni,
    guncelleKargo,
    getMusteri,
    kargo_teslim_durumu,
    listeKargo,
    sil,
    getKargoDetay,
    kullanici_id,
    girisOldumu,
    ayrintilar,
    sifredegistir_kullanici,
    giris,
    konumdegistirKullanici,
    kayitGerceklestir  
};