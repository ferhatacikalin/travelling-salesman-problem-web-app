const {app, BrowserWindow,contextBridge, ipcRenderer,ipcMain, remote} = require('electron');
const url = require('url');
const path = require('path');
var events = require('events');
var request = require('request');
const net = require('net');
let win
var api_root="http://cloudserver-env.eba-3ymmytp4.us-east-2.elasticbeanstalk.com";
function createWindow() {
    win = new BrowserWindow({width:1600 , height: 900,  webPreferences: { nativeWindowOpen: true , javascript: true, nodeIntegration: true,
            contextIsolation: false,devTools:true,webSecurity: false} })
    win.setMenuBarVisibility(false);

    win.loadURL(url.format ({
        pathname: path.join(__dirname, 'login.html'),
        protocol: 'file:',
        slashes: true,



    }));



};
ipcMain.on('opengui2',(event,arg)=>{
    win = new BrowserWindow({width:1600 , height: 900,  webPreferences: { nativeWindowOpen: true , javascript: true, nodeIntegration: true,
            contextIsolation: false,devTools:true,webSecurity: false} })
    win.setMenuBarVisibility(false);

    win.loadURL(url.format ({
        pathname: path.join(__dirname, 'gui2.html'),
        protocol: 'file:',
        slashes: true,



    }));
    event.returnValue={};
});
ipcMain.on('login', (event, arg) => {
    console.log("çalıştı");
    var options = {
        'jar':'true',
        'method': 'POST',
        'url': api_root+'/giris',
        'headers': {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(arg)

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);

        event.returnValue=JSON.parse(response.body);
    });

});
ipcMain.on('kargoYeni',(event,arg)=>{
    var options = {
        'jar':'true',
        'method': 'POST',
        'url': api_root+'/kargoYeni',
        'headers': {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(arg)

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        event.returnValue=JSON.parse(response.body);
    });
});
ipcMain.on('guncelleKargo',(event,arg)=>{
    var options = {
        'jar':'true',
        'method': 'POST',
        'url': api_root+'/guncelleKargo',
        'headers': {
            'Content-Type': 'application/json',

        },

        body: JSON.stringify(arg)

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        event.returnValue=JSON.parse(response.body);
    });
});
ipcMain.on('getMusteri',(event,arg)=>{
    var options = {
        'jar':'true',
        'method': 'POST',
        'url': api_root+'/getMusteri',
        'headers': {
            'Content-Type': 'application/json',

        },


        body: JSON.stringify(arg)

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        event.returnValue=JSON.parse(response.body);
    });
});
ipcMain.on('kargo_teslim_durumu',(event,arg)=>{
    var options = {
        'jar':'true',
        'method': 'POST',
        'url': api_root+'/kargo_teslim_durumu',
        'headers': {
            'Content-Type': 'application/json',

        },


        body: JSON.stringify(arg)

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        event.returnValue=JSON.parse(response.body);
    });
});
ipcMain.on('konumdegistirKullanici',(event,arg)=>{
    var options = {
        'jar':'true',
        'method': 'POST',
        'url': api_root+'/konumdegistirKullanici',
        'headers': {
            'Content-Type': 'application/json',

        },


        body: JSON.stringify(arg)

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        event.returnValue=JSON.parse(response.body);
    });
});
ipcMain.on('listeKargo',(event,arg)=>{
    var options = {
        'jar':'true',
        'method': 'GET',
        'url': api_root+'/listeKargo',



    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        event.returnValue=JSON.parse(response.body);
    });
});
ipcMain.on('ayrintilar',(event,arg)=>{
    var options = {
        'jar':'true',
        'method': 'GET',
        'url': api_root+'/ayrintilar',



    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        event.returnValue=JSON.parse(response.body);
    });
});
ipcMain.on('sil',(event,arg)=>{
    var options = {
        'jar':'true',
        'method': 'POST',
        'url': api_root+'/sil',
        'headers': {
            'Content-Type': 'application/json',

        },


        body: JSON.stringify(arg)

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        event.returnValue=JSON.parse(response.body);
    });
});
ipcMain.on('getKargoDetay',(event,arg)=>{
    var options = {
        'jar':'true',
        'method': 'POST',
        'url': api_root+'/getKargoDetay',
        'headers': {
            'Content-Type': 'application/json',

        },


        body: JSON.stringify(arg)

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        event.returnValue=JSON.parse(response.body);
    });
});
ipcMain.on('sifredegistir_kullanici',(event,arg)=>{
    var options = {
        'jar':'true',
        'method': 'POST',
        'url': api_root+'/sifredegistir_kullanici',
        'headers': {
            'Content-Type': 'application/json',

        },


        body: JSON.stringify(arg)

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        event.returnValue=JSON.parse(response.body);
    });
});
ipcMain.on('kayitGerceklestir',(event,arg)=>{
    var options = {
        'jar':'true',
        'method': 'POST',
        'url': api_root+'/kayitGerceklestir',
        'headers': {
            'Content-Type': 'application/json',

        },


        body: JSON.stringify(arg)

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        event.returnValue=JSON.parse(response.body);
    });
});

app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

app.on('ready', createWindow);

var eventEmitterForSync = new events.EventEmitter();

const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(9898);
const wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    var sendsync = function () {
        connection.sendUTF('syncnow');
    }

    eventEmitterForSync.on('sr', sendsync);

    connection.on('message', function(message) {
        if(message.utf8Data=="updaterequest"){
            eventEmitterForSync.emit('sr');
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});

/*try {
    require('electron-reloader')(module)
} catch (_) {}*/