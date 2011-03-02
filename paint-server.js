var sys = require("sys")
  , http = require("http")
  , fs = require("fs")
  , path = require("path")
  , ws = require('./lib/ws/server')
  , memstore = require('./lib/nws-memstore')
  , mime = require('./lib/mime')
  , userList=new Array()
  , paintListener = require('./paint_server/paint_listener')  
  , lport = 8000;
  
  
var httpServer = http.createServer(function(req, res){
  if(req.method == "GET"){
    if( req.url.indexOf("favicon") > -1 ){
      res.writeHead(200, {'Content-Type': 'image/x-icon', 'Connection': 'close'});
      res.end("");
    } 
     else if (/^\/$/.test(req.url)){
      res.writeHead(200, {'Content-Type': 'text/html', 'Connection': 'close'});
      fs.createReadStream( path.normalize(path.join(__dirname, "public/index.html")), {
        'flags': 'r',
        'encoding': 'binary',
        'mode': 0666,
        'bufferSize': 4 * 1024
      }).addListener("data", function(chunk){
        res.write(chunk, 'binary');
      }).addListener("end",function() {
        res.end();
      });
    } else {
		res.writeHead(200, {'Content-Type': mime.lookup(req.url)});
        fs.createReadStream(__dirname+"/public" + req.url , {
            'flags': 'r',
            'encoding': 'binary',
            'mode': 0666,
            'bufferSize': 4 * 1024
        }).addListener("data", function(chunk) {
            res.write(chunk, 'binary');
        }).addListener("close",function() {
            res.end();
        });
	}
  } else {
    res.writeHead(404);
    res.end();
  }
});

var server = ws.createServer({
  server: httpServer
});

memstore.attachTo(server);

server.addListener("listening", function(){
  sys.log("Listening for connections port "+lport+".");
});

server.addListener("connection", function(conn) {
	paintListener.listenMessages(conn,server,userList);
});

server.addListener("disconnect", function(conn){
	conn.broadcast(JSON.stringify({_m_type:"log",content:"** "+conn.memstore.get("username")+" disconnected"}));
	for (var i in userList){
		if (userList[i].match(conn.memstore.get("username",0))){
			userList.splice(i,i);break;
		}
		if(userList[i] == "user_"+conn.id ){
			userList.splice(i,i);break;
		}
	}	
	conn.memstore.set("username", "");
});

server.listen(lport);
