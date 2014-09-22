var ursaED = require('./ursaED');
var account = require('./account');
//var keySizeBits = 1024;
var keyPair = ursaED.initSelfRSAKeys('./key/priKey.pem','./key/pubKey.pem');

var pubKey=ursaED.getPubKeyPem(keyPair);

var serverKeyPair= ursaED.loadServerKey('./key/serverKey.pem');

console.log(pubKey);
/*
account.register('fyf','fyf','Linux Mint',pubKey,keyPair,serverKeyPair,function(msg){
  console.log(JSON.stringify(msg));
});
*/

account.login('fyf','fyf','Linux CDOS',pubKey,keyPair,serverKeyPair,function(msg){
  console.log(JSON.stringify(msg));
});
/*

account.getPubKeysByName('fyf','Linux CDOS','text',keyPair,serverKeyPair,function(msg){
    console.log(JSON.stringify(msg));
});*/