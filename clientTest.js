var rsaKey = require('./rsaKey');
var NodeRsa=require('node-rsa');
var account = require('./account');
//var keySizeBits = 1024;
var keyPair = rsaKey.initSelfRSAKeys('./key/priKey.pem','./key/pubKey.pem');

var pubKey=keyPair.getPublicPEM().toString('utf8');

var serverKeyPair= rsaKey.loadServerKey('./key/serverKey.pem');

console.log(pubKey); /*
account.register('fang','fyf','Linux Mint',pubKey,keyPair,serverKeyPair,function(msg){
  console.log(JSON.stringify(msg));
});
*/
account.getPubKeysByName('fang','Linux Mint','fang',keyPair,serverKeyPair,function(msg){
    console.log(JSON.stringify(msg));
});
account.login('fang','fyf','Linux Mint',pubKey,keyPair,serverKeyPair,function(msg){
  console.log(JSON.stringify(msg));
});


