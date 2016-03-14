  var http = require("http");  
//var    uExtract = require('url-extract')();
    var port = 8888;
    http.createServer(function(request, response) {  
        console.log('request received');  
        var child = require('child_process');   
        var exec = child.exec;
        var filename = "img"+new Date().getTime()+".png";
        var cmdStr = 'phantomjs s.js http://www.baidu.com '+'pic/'+filename;
        var rs = child.exec(cmdStr, {killSignal: 'SIGTERM'}, function(err,stdout,stderr){
             console.log(stdout+'\r\n');
            if(err == null) {
                response.write(filename);
            }else{
              response.write("faled");
            }
            response.end(); 
        });	
          
        rs.on('exit', function (code) {
             console.log('code:'+code);
        }); 
       
        response.writeHead(200, {"Content-Type": "text/plain"});  
        //response.write("Hello World");  
        //response.end();  
    }).listen(port);  
    console.log('server started on port '+port+'.');  
