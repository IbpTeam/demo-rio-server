var cluster = require('cluster');
var server = require('./server');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {  
  console.log("master start..."); 
  // Fork workers.   
  for (var i = 0; i < numCPUs; i++) {      
    cluster.fork();      
  }
  cluster.on('listening',function(worker,address){    
    console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);     
  });    
  cluster.on('exit', function(worker, code, signal) {       
    console.log('worker ' + worker.process.pid + ' died');       
  });
}else  if (cluster.isWorker) {   
  server.startServer();
}