

var net = require('net');
var NodeRsa = require('node-rsa');
var clientPackHandler = require('./clientPackHandler');

var PORT=8894;
var IP='192.168.160.66';
var TIMEOUT=10000;

function register(userName,password,UUID,pubKey,keyPair,serverKeyPair,rigisterResultCb){
  var client = connectClient();
  clientPackHandler.register(userName,password,UUID,pubKey,function(msg){ 
    sendMsg(client,msg,serverKeyPair);
  });
  clientOnData(client,keyPair,rigisterResultCb);
  clientOnEndOrError(client);
}
exports.register = register;

function login(userName,password,UUID,pubKey,keyPair,serverKeyPair,loginResultCb){
  console.log(userName+'----login');
  var client = connectClient();
  clientPackHandler.login(userName,password,UUID,pubKey,function(msg){
    sendMsg(client,msg,serverKeyPair);
  });
  clientOnData(client,keyPair,loginResultCb);
  clientOnEndOrError(client);
}
exports.login = login;

function getPubKeysByName(userName,UUID,targetName,keyPair,serverKeyPair,getPubKeysByNameResultCb){
  var client = connectClient();
  clientPackHandler.getPubKeysByUserName(userName,UUID,targetName,function(msg){
    sendMsg(client,msg,serverKeyPair);
  });
  clientOnData(client,keyPair,getPubKeysByNameResultCb);
  clientOnEndOrError(client);
}
exports.getPubKeysByName = getPubKeysByName;

function connectClient(){
  var client = new net.Socket();
  client.connect(PORT,IP,function(){
    console.log('client is connected on server-addr :'+IP+":"+PORT);
  });
  client.setTimeout(TIMEOUT,function(){
    console.log('setTimeout');
    client.end();
  });
  return client;
}
function clientOnData(client,keyPair,callback){
  client.on('data',function(data){     
    var decrypteds='';
    var rstObj={};  
    try{     
      decrypteds = keyPair.decrypt(data.toString('utf-8'), 'utf8');
    }catch(err){     
      console.log('getPubKeysByName error!!');
      console.log('server, you don\'t known my pubKey, you know?!');
      client.end();
      return;
    }
    console.log('decrypteds-----'+decrypteds);		
    var msgObj = JSON.parse(decrypteds);		
    if(isInvalid(msgObj)){
	console.log('LEAVE exit');
	client.end();
	return;
      }else{
	callback(msgObj);
	client.end();
      }
  });
} 
function clientOnEndOrError(client){
  client.on('end',function(){
    console.log('client disconnected');
  });
  client.on('error',function(err){
    console.log('something goes wrong! '+err.message);
    client.end();
  });
}

function isInvalid(msgObj){
  if(msgObj.type===undefined||msgObj.option===undefined){
    console.log('invalid true');
    return true;
  }else{
    switch(msgObj.type){
      case 'set':{
	if(msgObj.from===undefined||msgObj.UUID===undefined){
	  console.log('invalid true');
	  return true;
	}else{
	  console.log('invalid false');
	  return false;
	}
      }
      break;
      default:{
	console.log('invalid false');
	return false;
      }
    }
  }
}

function sendMsg(client,msg,serverKeyPair){
  msg = JSON.stringify(msg); 
  var encrypteds = serverKeyPair.encrypt(msg, 'base64');  
  client.write(encrypteds);
} 
