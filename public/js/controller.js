function Controller(url) {
	
	this.conn = new WebSocket(url);
	this.url = url;
	this.view = new View();
	this.paint = new Paint(this.view);
	this.database = new Database(this);
	
	this.user_id = null;
	
	this.connectionController = function(controller) {
		enableConnectionController(controller);
		$("#connectbtn").bind("click", function(e){
			if (this.value == "Connect") {
				controller.conn = new WebSocket(controller.url);
				enableConnectionController(controller);
				this.value = "Disconnect";
			} else if (this.value == "Disconnect") {
				controller.conn.close();
				this.value = "Connect";
			}
		});
	}(this);
	
	function enableConnectionController(controller) {
		controller.conn.onmessage = function(evt) {
			controller.recvData(evt.data);
		};
		controller.conn.onclose = function() {
			message = new Message({content:"<i>** You have been disconnected.</i>"}, "log");
			controller.view.log(message);
			controller.view.disconnected();
		};
		controller.conn.onopen = function() {
			message = new Message({content:"<i>** You have been connected</i>"}, "log");
			controller.view.log(message);
			controller.view.connected();
		};
	}
	
	this.recvData = function(data) {
		if (data && data.match(/^{"_m_type":.*}$/i)) {
			this.do($.parseJSON(data));
		} else {
			throw "Invalid received data";
		} 
	}
	
	this.sendData = function(data) {
		if(this.conn && this.conn.readyState == 1) {
			this.conn.send(data);
		}
	}
	
	this.do = function(data) {
		switch (data._m_type) {
			case "id" : 
				this.user_id = data.content.substring(5);break;
			case "log" : 
				this.view.log(data);break;
			case "mousedown": case "mousemove": case "mouseup": case "clearcanvas":
				if(data.user != this.user_id) {
					this.doDraw(data);
				}break;
			default:
		}
	};
	
	this.doDraw = function(data) {
		switch (data._m_type) {
			case "mousedown": this.paint.startDraw(data.content);break;
			case "mousemove": this.paint.draw(data.content);break;
			case "mouseup": this.paint.updateCanvas();break;
			case "clearcanvas": this.paint.clearCanvas();break;
			default: return;
		}
	}
	
	this.messageController = function(controller) {
		controller.view.message.bind("keydown", function(e){
			if(e.which == 13){
				message = new Message({content:controller.view.getMessage()});
				controller.sendData(JSON.stringify(message))
			}
		});
		controller.view.sendbtn.bind("click", function(){
			message = new Message({content:controller.view.getMessage()});
			controller.sendData(JSON.stringify(message));
		});
	}(this);
	
	this.paintController = function(controller) {
		paintController = new PaintController(controller);
	}(this);
	
	this.databaseController = function (controller) {
		controller.database.create();
		controller.view.record.bind("click", function(e){
			controller.database.startSaving();
		});
		controller.view.load.bind("click", function(e){
			controller.database.startLoading();
		});
		controller.view.clearBD.bind("click", function(e){
			controller.database.clearBD();
		});
		if (controller.database.save == false) {
			controller.view.load.removeAttr("disabled");
		}
	}(this);
	
	
}

function Message(data, type) {
	
	if (data && typeof data == typeof "") {
		try {
			data = $.parseJSON(data);
		} catch (e) {
			throw "INVALID PARAMETER\n" + e;
		}
	} else if (!data || typeof data != typeof {a:0}) {
		throw "Message constructor error:\n" 
				+ typeof data 
				+ " is not a valid parameter";
	}
	
	this._m_type = (data._m_type ? data._m_type : (type ? type : "log"));
	this.content = (data.content ? data.content : "null");
	this.user = (data.user ? data.user : 0);

}
