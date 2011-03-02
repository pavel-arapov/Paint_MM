var PaintController = function(controller) {
	this.controller = controller;
	this.paint = this.controller.paint;
	this.tool = new Tool(this.paint);
	this.started = false;
	
	this.listeners = function (paintController) {
		paintController.paint.canvas.addEventListener('mousedown', doEvent, false);
		paintController.paint.canvas.addEventListener('mousemove', doEvent, false);
		paintController.paint.canvas.addEventListener('mouseup', doEvent, false);
		
		function doEvent(ev) {
			switch (ev.type) {
				case "mousedown" : paintController.mousedown(ev);break;
				case "mousemove" : paintController.mousemove(ev);break;
				case "mouseup" : paintController.mouseup(ev);break;
				default: return;break;
			}
		}
		
		paintController.controller.view.clearcanvasbtn.bind("click", function(){
			paintController.paint.clearCanvas();
			message = new Message({user:paintController.controller.user_id}, "clearcanvas");
		});
	}(this);
	
	function navigator(ev) {
		if (ev.layerX || ev.layerX == 0) { // Firefox
			ev._x = ev.layerX;
			ev._y = ev.layerY;
		} else if (ev.offsetX || ev.offsetX == 0) { // Opera
			ev._x = ev.offsetX;
			ev._y = ev.offsetY;
		}
	}
	
	this.mousedown = function(ev) {
		navigator(ev);
		this.started = true;
		this.tool.current.set({x0:ev._x, y0:ev._y});
		this.paint.startDraw(this.tool.current);
		message = new Message({content:this.tool.current,user:this.controller.user_id}, "mousedown");
		this.controller.database.insert(JSON.stringify(message));
		this.controller.sendData(JSON.stringify(message));
	};
	
	this.mousemove = function(ev) {
		if (this.started) {
			navigator(ev);
			this.tool.current.set({strokeColor:"#" + document.getElementById("colorChooser").value,
									fillColor:"#" + document.getElementById("colorChooserFill").value,
									lineWidth: document.getElementById("lineWidth").value,
									shadow: (document.getElementById("shadow").value ? 1 : 0)});
			this.tool.current.modify(ev);
			this.paint.draw(this.tool.current);
			message = new Message({content:this.tool.current,user:this.controller.user_id}, "mousemove");
			this.controller.database.insert(JSON.stringify(message));
			this.controller.sendData(JSON.stringify(message));
		}
	};
	
	this.mouseup = function(ev) {
		if (this.started) {
			this.started = false;
			this.paint.updateCanvas();
			message = new Message({user:this.controller.user_id}, "mouseup");
			this.controller.database.insert(JSON.stringify(message));
			this.controller.sendData(JSON.stringify(message));
		}
	};
}

