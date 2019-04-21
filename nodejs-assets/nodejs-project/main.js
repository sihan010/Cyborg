var rn_bridge = require('rn-bridge');
var crypto = require('crypto');

rn_bridge.channel.on('message', (msg) => {
  rn_bridge.channel.send(msg);
});

rn_bridge.channel.on('cypher', (data) => {
  const cipher = crypto.createCipher('aes192', data.pass);
  var encrypted = cipher.update(data.text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  rn_bridge.channel.post('cypher', encrypted);
})

rn_bridge.channel.on('decypher', (data) => {
  try{
    const decipher = crypto.createDecipher('aes192', data.pass);
    var decrypted = decipher.update(data.hex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    rn_bridge.channel.post('decypher', decrypted);
  }
  catch(error){
    rn_bridge.channel.post('decypher', error);
  }  
})

rn_bridge.channel.send("Node was initialized.");