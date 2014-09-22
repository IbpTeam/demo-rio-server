var userDAO=require('./UserDAO');

exports.getUserByUserName=function(userName,callback){
  userDAO.getUserByUserName(userName,function(err,rst){
    if(err){
      console.log(err);
       callback(userName,err,null);
      //callback(userName,null);
    }else{ 
      callback(userName,false,rst);
    }
  });
}
exports.saveUser=function(user,callback){
  userDAO.saveUser(user,function(err){
    if(err){
      console.log(err);
      callback(err);
      //callback(userName,null);
    }else{
      callback(false);
    }
  });
}
exports.authUser=function(userName,password,callback){
  userDAO.authUser(userName,password,function(err,rst){
    if(err){
      console.log(err);
      callback(err,null);
      //callback(userName,null);
    }else{
      callback(false,rst);
    }
  });
}

exports.createPubKey=function(userName,UUID,pubKey,callback){
  userDAO.createPubKey(userName,UUID,pubKey,function(err){
    if(err){
      console.log(err);
      callback(err);
      //callback(userName,null);
    }else{
      console.log('createPubKey ok');
      callback(false);
    }
  });    
}
exports.updatePubKey=function(userName,UUID,pubKey,callback){
  userDAO.updatePubKey(userName,UUID,pubKey,function(err){
    if(err){
      console.log(err);
      callback(err);
      //callback(userName,null);
    }else{
      console.log('updatePubKey ok');
      callback(false);
    }
  });   
}
exports.getPubKeyByUserName=function(userName,callback){
  console.log('getPubKeyByUserName:'+userName);
  userDAO.getPubKeyByUserName(userName,function(err,rst){
    if(err){
      console.log(err);
      callback(userName,err,null);
      //callback(userName,null);
    }else{
      console.log('getPubKeyByUserName ok:'+rst.length);
      callback(userName,false,rst);
    }
  });     
}
exports.getPubKeyByNameDevice=function(userName,UUID,callback){

  userDAO.getPubKeyByNameDevice(userName,UUID,function(err,rst){
    if(err){
      console.log(err);
      callback(userName,err,null);
      //callback(userName,null);
    }else{
      console.log('getPubKeyByUserName ok:'+rst);
      callback(userName,false,rst);
    }
  });     
}
exports.deleteUser=function(userName,callback){
  userDAO.deleteUser(userName,function(err){
    if(err){
      console.log(err);
      callback(err);
      //callback(userName,null);
    }else{
      console.log('updatePubKey ok');
      callback(false);
    }
  });   
}