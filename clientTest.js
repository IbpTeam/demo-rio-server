var ursaED = require('./ursaED');
var account = require('./account');
//var keySizeBits = 1024;
var keyPair = ursaED.initSelfRSAKeys('./key/priKey.pem','./key/pubKey.pem');

var pubKey=ursaED.getPubKeyPem(keyPair);

var serverKeyPair= ursaED.loadServerKey('./key/serverKey.pem');

console.log(pubKey);
/*
account.register('fang','fyf','Linux Mint',pubKey,keyPair,serverKeyPair,function(msg){
  console.log(JSON.stringify(msg));
});
*/
for(var i=0;i<500;i++){

console.log(i+':-------------------------------------')/*
account.login('fyf','fyf','Linux Ubuntu',pubKey,keyPair,serverKeyPair,function(msg){
  console.log(JSON.stringify(msg));
});*/
account.getPubKeysByName('fyf','Linux CDOS','fyf',keyPair,serverKeyPair,function(msg){
    console.log(JSON.stringify(msg));
});
console.log('--------------------------')
}
