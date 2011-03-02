exports.listenMessages = function(conn,server,userList) {
	conn.memstore.set("username", "user_"+conn.id);
	tmp = "user_" + conn.id;
	userList.push(tmp); 
	conn.send(JSON.stringify({_m_type:"id",content:"user_"+conn.id}));
	conn.send(JSON.stringify({_m_type:"log",content:"** <i>Connected as: user_"+conn.id+"</i>"}));
	conn.send(JSON.stringify({_m_type:"log",content:"** <i>Type `/nick USERNAME` to change your username</i>"}));
	conn.send(JSON.stringify({_m_type:"log",content:"** <i>Type `/who` to see connecting people</i>"}));
	conn.broadcast(JSON.stringify({_m_type:"log",content:"** "+conn.memstore.get("username")+" connected"}));
	
	conn.addListener("message", function(data){
		if (data && data.match(/^{"_m_type":.*}$/i)) {
			data = JSON.parse(data);
			message = data.content;
			if (data._m_type == "log") {
				if(message[0] == "/") {
					// set username
					if((matches = message.match(/^\/nick (\w+)$/i)) && matches[1]) {
						for (var i in userList){
							if(userList[i].match(conn.memstore.get("username",0))){
								userList[i]= matches[1];
								break;
							}
							 if(userList[i] == "user_"+conn.id ){
								 userList[i]= matches[1];
								 break;
							 }
						 }	
						conn.memstore.set("username", matches[1]);
						conn.send(JSON.stringify({_m_type:"log",content:"** You are now known as: <b>"+matches[1]+"</b>"}));
					// get message count
					} else if(/^\/stats/.test(message)) {
						conn.send(JSON.stringify({_m_type:"log",content:"** You have sent "+conn.memstore.get("messages", 0)+" messages."}));
					}
					else if(/^\/who/.test(message)){
						for (var i in userList){
							conn.send(JSON.stringify({_m_type:"log",content: "<b>"+userList[i]+"</b>"}));
						}

					}

					}
				 else {
					conn.memstore.incr("messages");
					server.broadcast(JSON.stringify({_m_type:"log",content:conn.memstore.get("username")+": "+message}));
				}
			} else if (data._m_type != "log") {
				server.broadcast(JSON.stringify(data));
			}
		} else {
			throw "Invalid received data" + data;
		}
	});
};
