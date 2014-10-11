var DBDao=require('./DBDao');
var ursa = require('./newUrsa');

exports.processGetMsg=function(rstObj,msgObj,processGetMsgCallback){
  var dataObj=msgObj.data;
  switch(msgObj.option){			  
    case 0x0100: {	    
      console.log('0x0100');
      DBDao.getPubKeyByUserName(dataObj.userName,function(err,rstPubKey){
	console.log('getUserByUserName 0100');	    
	if(err){
	  rstObj['type']='error';	         
	  rstObj['msg']='getUserByUserName:'+rstPubKey;
	  processGetMsgCallback(rstObj);		  
	}else{ 	
	  rstObj['type']='result';
	  if(rstPubKey.length==0){	              
	    rstObj['state']=0;	  
	    rstObj['msg']='no such a person';	      
	    processGetMsgCallback(rstObj);	    	  
	  }else{	 	
	    rstObj['state']=1;	      
	    rstObj['msg']='details';	      
	    var data={};	      
	    data['userName']=dataObj.userName;	      
	    var detail=[];	      
	    data['detail']=detail;	      
	    rstObj['data']=data;	      
	    rstPubKey.forEach(function (row) {		
	      console.log(row.UUID);		
	      var one={};		
	      one['UUID']=row.UUID;		
	      one['pubKey']=row.pubKey;		
	      detail.push(one);	      	    
	    });	      
	    console.log('processGetMsgCallback:  '+JSON.stringify(rstObj));
	    processGetMsgCallback(rstObj);	    	  
	  }
	  //console.log('processGetMsgCallback:  '+JSON.stringify(rstObj));
	 // processGetMsgCallback(rstObj);	
	}
	//processGetMsgCallback(rstObj);	
      });
    }
    break;				  
    case 1: {				    
      msgObj[0].type='rst';				    
      msgObj[0].from='server';				    
      msgObj[0].to='client';				   
      msgObj[0].date=new Date();				    
      msgObj[0].desc='return rigister';				    
      var result= JSON.stringify(msgObj);					  
      console.log('getPublicKeyPem rst:'+result);					  
      c.write(result);				       
    }
    break;		  
    default: {		  
      console.log("this is in default switch on datammmm:"+ JSON.stringify(rstObj));		
    }		   
  }
}
exports.processSetMsg=function(rstObj,msgObj,processSetMsgCallback){
  var dataObj=msgObj.data;
  //var keyPair=ursa.createKey(dataObj.pubKey);
  switch(msgObj.option){			  
    case 0x0001: {				//登录	  				  
      DBDao.authUser(dataObj.userName,dataObj.password,function(err,rst){
	console.log('authUser');	
	if(err){
	  rstObj['type']='error';	         
	  rstObj['msg']=rst;
	  processSetMsgCallback(rstObj);
	}else{ 
	  if(rst.length==0){					      
	    console.log('none');	
	    rstObj['type']='result';	
	    rstObj['state']=0;	
	    rstObj['msg']='auth failed!!';					       				      
	    console.log('nodenonde:'+JSON.stringify(rstObj));		
	    processSetMsgCallback(rstObj);
	  }else{	     
	    DBDao.getPubKeyByNameDevice(dataObj.userName,msgObj.UUID,function(err,rst){
	      if(err){
		rstObj['type']='error';	         
		rstObj['msg']=rst;
		processSetMsgCallback(rstObj);
	      }else{
		if(rst.length==0){
		  if(dataObj.pubKey==null){
		    rstObj['type']='error';	         
		    rstObj['msg']='no new pubKey provided!';
		    processSetMsgCallback(rstObj);
		    return;
		  }
		  DBDao.createPubKey(dataObj.userName,msgObj.UUID,dataObj.pubKey,function(err,rst){    
		    if(err){      
		      rstObj['type']='error';	         
		      rstObj['msg']=rst;
		      //processGetMsgCallback(rstObj);	        
		    }else{
			console.log('createPubKey ok');
			//var errorMsg={};
			rstObj['type']='result';
			rstObj['state']=1;
			rstObj['msg']='auth succeed';
			//rstObj['msg']=0x0200;
			//sendErrorMsg(errorMsg,processSetMsgCallback);
		      // processSetMsgCallback(rstObj,keyPair);
		      }
		      processSetMsgCallback(rstObj);
		    });
		}else{ 
		  if(dataObj.pubKey==null||dataObj.pubKey==rst[0].pubKey){
		    rstObj['type']='result';			  
		    rstObj['state']=1;			  
		    rstObj['msg']='auth succeed';
		    processSetMsgCallback(rstObj);
		  }else{ 
		    DBDao.updatePubKey(dataObj.userName,msgObj.UUID,dataObj.pubKey,function(err,rst){    
		      if(err){      		
			rstObj['type']='error';	         
			rstObj['msg']=rst;	        
		      }else{			  
			console.log('updatePubKey ok');
			  //var errorMsg={}			  
			rstObj['type']='result';			  
			rstObj['state']=1;			  
			rstObj['msg']='auth succeed';
		      }
		      processSetMsgCallback(rstObj);
		    });
		  }
		}
	      }	      
	    });
	  }
	}
	//var userOnlinePubKeyID=rst.userName+'-'+rst.device;
	//processSetMsgCallback(rstObj,keyPair);					  	
      });					  				        
    }
    break;
				  
    case 0x0000: {//注册
      DBDao.getUserByUserName(dataObj.userName,function(err,rst){	
	if(err){	  
	  rstObj['type']='error';	         	
	  rstObj['msg']=rst;
	  processSetMsgCallback(rstObj);
	}else{	  	
	  if(rst.length==0){				   	  
	    console.log('none');				       	  
	    DBDao.saveUser(dataObj,function(err,rst){					 
	      console.log('saveUser');						 
	      if(err){
		rstObj['type']='error';
		rstObj['msg']=rst;
		processSetMsgCallback(rstObj);
	      }else{		
		DBDao.createPubKey(dataObj.userName,msgObj.UUID,dataObj.pubKey,function(err,rst){    		
		  if(err){      		      
		    rstObj['type']='error';	           
		    rstObj['msg']=rst;
		    DBDao.deleteUser(dataObj.userName,function(err,rst){
		      if(err){           
			rstObj['msg']+='  '+err;
		      }
		      processSetMsgCallback(rstObj);
		    });
		  }else{					    
		    console.log('createPubKey ok');	
		    rstObj['type']='result';			
		    rstObj['state']=1;			
		    rstObj['msg']='register succeed';  
		    processSetMsgCallback(rstObj);
		  }		  					      	    
		});
	      }		    	  
	    });				
	  }else{
	    rstObj['type']='result';			
	    rstObj['state']=0;			
	    rstObj['msg']='account existed';   
	    processSetMsgCallback(rstObj);		
	  }
	} 	
      });									     
    }
    break;		   
    case 'Reply': {

    }
    break;		  
    default: {		 
      console.log("this is in default switch on datannnnnn:"+ JSON.stringify(rstObj));
					  //console.log(data);				  
    }				   
  } 
}