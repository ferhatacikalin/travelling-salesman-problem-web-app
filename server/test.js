const ws = require('ws');

const client = new ws('ws://localhost:8080');

client.on('open', () => {

  client.send('Hello');
});
client.on('message', (message)=> {
   console.log(message.toString());
});
