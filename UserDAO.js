var sqlite3 = require('sqlite3');
var SQLSTR = require("./SQLStr.js");
//var config = require("../config");

//连接数据库
function openDB(){
  return new sqlite3.Database('./server.db');
}

//关闭数据库
function closeDB(database){
  database.close();
}

exports.getUserByUserName=function(userName,getUserByUserNameCallback){
   var db = openDB();
   db.get(SQLSTR.FINDUSERBYUSERNAME,[userName],getUserByUserNameCallback);
   closeDB(db);  
}
exports.authUser=function(userName,password,authUserCallback){
   var db = openDB();
   db.get(SQLSTR.FINDUSERBYUSERNAMEPWD,userName,password,authUserCallback);
   closeDB(db);  
}
exports.saveUser=function(user,saveUserCallback){
   var db = openDB();
   db.run(SQLSTR.CREATEUSER,user.userName,user.password,(new Date()).getTime(),(new Date()).getTime(),saveUserCallback);
   closeDB(db);  
}
exports.deleteUser=function(userName,deleteUserCallback){
  var db = openDB();
  db.run(SQLSTR.DELETEUSER,userName,deleteUserCallback);
  closeDB(db);     
}
exports.createPubKey=function(userName,UUID,pubKey,createPubKeyCallback){
  var db = openDB();
  db.run(SQLSTR.CREATEUSERPUBKEY,userName,UUID,pubKey,(new Date()).getTime(),(new Date()).getTime(),createPubKeyCallback);
  closeDB(db);    
}
exports.updatePubKey=function(userName,UUID,pubKey,updatePubKeyCallback){
  var db = openDB();
  db.run(SQLSTR.UPDATEPUBKEY,pubKey,(new Date()).getTime(),userName,UUID,updatePubKeyCallback);
  closeDB(db);      
}
exports.getPubKeyByUserName=function(userName,getPubKeyByUserNameCallback){
  var db = openDB();
  db.all(SQLSTR.FINDPUBKEYSBYNAME,userName,getPubKeyByUserNameCallback);
  closeDB(db);     
}
exports.getPubKeyByNameDevice=function(userName,UUID,getPubKeyByNameDeviceCallback){
  var db = openDB();
  db.get(SQLSTR.FINDPUBKEYBYND,userName,UUID,getPubKeyByNameDeviceCallback);
  closeDB(db);     
}