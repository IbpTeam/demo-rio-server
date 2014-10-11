/**
 * 使用连接池
 */
var mysql = require('mysql');
var SQLSTR = require("./SQLStr.js");
var options = {
    'host':'127.0.0.1',
    'port': '3306',
    'user': 'root',
    'password': 'ibp2013OS',
    'database': 'server',
    'charset': 'utf8',
    'connectionLimit': 32000,
    'supportBigNumbers': true,
    'acquireTimeout':30000,
    'connectTimeout':30000,
    'bigNumberStrings': true,
    'queueLimit':0,
    'waitForConnections':true,
    'reAddAfterErrorSeconds':true
};
var pool = mysql.createPool(options
  /*{
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'port': '3306',
    'database': 'server'
}
  */
);
//console.log(pool.options.acquireTimeout);
exports.getUserByUserName=function(userName,getUserByUserNameCallback){
  pool.getConnection(function(err, connection){
    if(err){
      console.log('DB-获取数据库连接异常！'+err); 
      getUserByUserNameCallback(true,err);
    }else{
      connection.query(SQLSTR.FINDUSERBYUSERNAME, userName,function(err, result){
	if(err){  
	  connection.rollback(function(){
	    console.log('DB-获取数据异常！'+err);  
	    connection.release();
	    getUserByUserNameCallback(true,err);       	    
	  });
	}else{
	  connection.release();
	  getUserByUserNameCallback(false,result);
	}	
      });  
    }
  });
}
exports.authUser=function(userName,password,authUserCallback){
  pool.getConnection(function(err, connection){
    if(err){
      console.log('DB-获取数据库连接异常！'+err);  
      authUserCallback(true,err);
    }else{
      connection.query(SQLSTR.FINDUSERBYUSERNAMEPWD,[userName,password], function(err, result){
	if(err){  
	  connection.rollback(function(){
	    console.log('DB-获取数据异常！'+err); 
	    connection.release();
	    authUserCallback(true,err);       	    
	  });
	}else{
	  connection.release();
	  authUserCallback(false,result);
	}	
      });  
    }
  });
}
exports.saveUser=function(user,saveUserCallback){
  pool.getConnection(function(err, connection){
    if(err){
      console.log('DB-获取数据库连接异常！'+err); 
      saveUserCallback(true,err);
    }else{
      connection.query(SQLSTR.CREATEUSER,[user.userName,user.password,(new Date()).getTime(),(new Date()).getTime()], function(err, result){
	if(err){  
	  connection.rollback(function(){
	    console.log('DB-获取数据异常！'+err); 
	    connection.release();
	    saveUserCallback(true,err);       	    
	  });
	}else{
	  connection.release();
	  saveUserCallback(false,result);
	}	
      });  
    }
  });
}
exports.deleteUser=function(userName,deleteUserCallback){
 pool.getConnection(function(err, connection){
    if(err){
      console.log('DB-获取数据库连接异常！'+err); 
      deleteUserCallback(true,err);
    }else{
      connection.query(SQLSTR.DELETEUSER,userName, function(err, result){
	if(err){  
	  connection.rollback(function(){
	    console.log('DB-获取数据异常！'+err);  
	    connection.release();
	    deleteUserCallback(true,err);       	    
	  });
	}else{
	  connection.release();
	  deleteUserCallback(false,result);
	}	
      });  
    }
  });
}
exports.createPubKey=function(userName,UUID,pubKey,createPubKeyCallback){
  pool.getConnection(function(err, connection){
    if(err){
      console.log('DB-获取数据库连接异常！'+err);  
      createPubKeyCallback(true,err);
    }else{
      connection.query(SQLSTR.CREATEUSERPUBKEY,[userName,UUID,pubKey,(new Date()).getTime(),(new Date()).getTime()], function(err, result){
	if(err){  
	  connection.rollback(function(){
	    console.log('DB-获取数据异常！'+err);  
	    connection.release();
	    createPubKeyCallback(true,err);       	    
	  });
	}else{
	  connection.release();
	  createPubKeyCallback(false,result);
	}	
      });  
    }
  });
}
exports.updatePubKey=function(userName,UUID,pubKey,updatePubKeyCallback){
  pool.getConnection(function(err, connection){
    if(err){
      console.log('DB-获取数据库连接异常！'+err);  
      updatePubKeyCallback(true,err);
    }else{
      connection.query(SQLSTR.UPDATEPUBKEY,[pubKey,(new Date()).getTime(),userName,UUID],function(err, result){
	if(err){  
	  connection.rollback(function(){
	    console.log('DB-获取数据异常！'+err);  
	    connection.release();
	    updatePubKeyCallback(true,err);       	    
	  });
	}else{
	  connection.release();
	  updatePubKeyCallback(false,result);
	}	
      });  
    }
  }); 
}
exports.getPubKeyByUserName=function(userName,getPubKeyByUserNameCallback){
  pool.getConnection(function(err, connection){
    if(err){
      console.log('DB-获取数据库连接异常！'+err); 
      getPubKeyByUserNameCallback(true,err);
    }else{
      connection.query(SQLSTR.FINDPUBKEYSBYNAME,userName,function(err, result){
	if(err){  
	  connection.rollback(function(){
	    console.log('DB-获取数据异常！'+err);  
	    connection.release();
	    getPubKeyByUserNameCallback(true,err);       	    
	  });
	}else{
	  connection.release();
	  getPubKeyByUserNameCallback(false,result);
	}	
      });  
    }
  }); 
}
exports.getPubKeyByNameDevice=function(userName,UUID,getPubKeyByNameDeviceCallback){
  pool.getConnection(function(err, connection){
    if(err){
      console.log('DB-获取数据库连接异常！'+err); 
      getPubKeyByNameDeviceCallback(true,err);
    }else{
      connection.query(SQLSTR.FINDPUBKEYBYND,[userName,UUID],function(err, result){
	if(err){  
	  connection.rollback(function(){
	    console.log('DB-获取数据异常！'+err); 
	    connection.release();
	    getPubKeyByNameDeviceCallback(true,err);       	    
	  });
	}else{
	  connection.release();
	  getPubKeyByNameDeviceCallback(false,result);
	}	
      });  
    }
  });
}