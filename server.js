var net = require('net');
var fs = require('fs');
var ursa = require('./newUrsa');
var ursaED = require('./ursaED');
var DBDao =require('./DBDao');
var serverRequetHandler =require('./serverRequetHandler');
//var publicEntity=require('./public');
var keySizeBits = 1024;
var size=65537;

var count=0;
var keyPair;
var pubKey;
function startServer(){
  var server = net.createServer(function(c){
    console.log('server connnected');
    c.on('end',function(){
      console.log('server disconntected');
    });
    
    //var keyPair = ursaED.initSelfRSAKeys('./key/serverPriKey.pem','./key/serverPubKey.pem');
    //var pubKey = ursaED.getPubKeyPem(keyPair);
    
    c.on('data',function(data){	  
      console.log('net.js:'+data);
      var decrypteds='';
      var rstObj={};
      try{
	decrypteds = ursaED.decrypt(keyPair,data.toString('utf-8'), keySizeBits/8);    
      }catch(err){
	console.log('error!!!!!');
	rstObj['msg']='client, you don\'t known my pubKey, you know?!';
	console.log('client, you don\'t known my pubKey, you know?!'+err);
	return;
      }
		  
      console.log('decrypteds-----'+decrypteds);		
      var msgObj = JSON.parse(decrypteds);	
      
      if(isInvalid(msgObj)){
	console.log('LEAVE exit');
	return;
      }
      switch(msgObj.type){			
	case 'get': {	 
	  console.log('gert');	 
	  serverRequetHandler.processGetMsg(rstObj,msgObj,function(rstObj){    
	    sendMsg(c,rstObj,msgObj);
	  });	
	}
	break;	
	case 'set': {  
	  console.log('msg set:'+msgObj);  
	  serverRequetHandler.processSetMsg(rstObj,msgObj,function(rstObj){
	    sendMsg(c,rstObj,msgObj);
	  });
	}
	break;	
	case 'Reply': {
	}
	break;
	default: {	
	  console.log("this is in default switch on data");
	}
      }
    });
    c.on('error',function(e){	  
      console.log('something goes wrong! '+e.message);
    });
  });
  server.listen(8894,function(){
    var address = server.address();
    console.log('server bound on %j ',address);
    keyPair = ursaED.initSelfRSAKeys('./key/serverPriKey.pem','./key/serverPubKey.pem');
    pubKey = ursaED.getPubKeyPem(keyPair);
  });
}
exports.startServer=startServer;

function sendMsg(c,rstObj,msgObj){
  var msg='';
  rstObj['option']=msgObj.option;
  if(msgObj.data.pubKey==null){
    DBDao.getPubKeyByNameDevice(msgObj.from,msgObj.UUID,function(err,rst){ 
      if(err){
	rstObj['type']='error';
	rstObj['msg']='get your pubKey from sql ERROR:'+err;
	msg = JSON.stringify(rstObj);
	console.log('processSetMsg encrypt:'+msg);
	//c.write(msg);
      }else{      
	if(rst.length==0){
	  rstObj['type']='error';
	  rstObj['msg']='get your pubKey ERROR: no key on you name and device from sql';
	  msg = JSON.stringify(rstObj);
	}else{
	  var userOnlinePubKey=ursa.createKey(rst[0].pubKey);
	  //rstObj['option']=msgObj.option;
	  msg = JSON.stringify(rstObj);
	  console.log('processSetMsg:'+msg);
	  msg=ursaED.encrypt(userOnlinePubKey,msg, keySizeBits/8);
	  console.log('processSetMsg encrypt:'+msg);	
	  c.write(msg);
	}
// 	console.log('processSetMsg encrypt:'+msg);
// 	c.write(msg);
      }
    });
  }else{
    var userOnlinePubKey=ursa.createKey(msgObj.data.pubKey);	  
    //rstObj['option']=msgObj.option;	  
    msg = JSON.stringify(rstObj);	 
    console.log('processSetMsg:'+msg);	  
    msg=ursaED.encrypt(userOnlinePubKey,msg, keySizeBits/8);
    console.log('processSetMsg encrypt:'+msg);
    c.write(msg);
  }
}
function isInvalid(msgObj){
  if(msgObj.type==null||msgObj.option==null){
    console.log('invalid true');
    return true;
  }else{
    switch(msgObj.type){
      case 'set':{
	if(msgObj.from==null||msgObj.UUID==null){
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