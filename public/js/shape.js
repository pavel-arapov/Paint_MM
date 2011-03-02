function Shape(data) {
	
	if (data && typeof data == typeof "") {
		try {
			data = $.parseJSON(data);
		} catch (e) {
			throw "INVALID PARAMETER\n" + e;
		}
	} else if (!data || typeof data != typeof {a:0}) {
		throw "Shape constructor error:\n" 
				+ typeof data 
				+ " is not a valid parameter";
	}
	
	this.type = (data.type ? data.type : "pencil");
	this.rubberColor = $("#imageView").css("background-color");
	this.x0 = 0;
	this.y0 = 0;
	
	this.toString = function() {
		return JSON.stringify({type:this.type,
								x0:this.x0,y0:this.y0,
								x:this.x,y:this.y,
								w:this.w,h:this.h,
								lineWidth:this.lineWidth,
								strokeColor:this.strokeColor,
								fillColor:this.fillColor,
								shadow:this.shadow});
	};
	
	this.set = function(data) {
		this.x0 = (data.x0 ? data.x0: this.x0);
		this.y0 = (data.y0 ? data.y0 : this.y0);
		this.x = (data.x ? data.x : 0);
		this.y = (data.y ? data.y : 0); 
		this.w = (data.w ? data.w : 0);
		this.h = (data.h ? data.h : 0);
		this.lineWidth = (data.lineWidth ? data.lineWidth : 1);
		this.strokeColor = (data.strokeColor ? data.strokeColor : "#FFFFFF");
		this.strokeColor = (this.type == "rubber" ? this.rubberColor : data.strokeColor);
		this.fillColor = (data.fillColor ? data.fillColor : "#FFFFFF");
		this.shadow = (data.shadow ? data.shadow : 0);
		this.shadow = (this.type == "rubber" ? 0 : data.shadow);
	};
	
	this.modify = function(ev) {
		switch (this.type) {
			case "circle" : case "rect":
				this.x = Math.min(ev._x,  this.x0);
				this.y = Math.min(ev._y,  this.y0);
				this.w = Math.abs(ev._x - this.x0);
				this.h = Math.abs(ev._y - this.y0);
				break;
			default:
				this.x = ev._x;
				this.y = ev._y;
				break;
		};
	};
	
	this.set(data);
};

var Tool = function(paint) {
	this.tool_select = document.getElementById(paint.view.dtool);
    this.tool_default = 'rect';
    this.paint = paint;
    this.current = null;
    
    this.setCurrentTool = function(type) {
		this.current = null;
		this.current = new Shape({type:(type ? type : "pencil")});
		this.tool_select.value = (type ? type : "pencil");
	}
	
	this.controller = function (tool) {
		tool.tool_select.addEventListener('change', changeTool, false);
		
		function changeTool(ev) {
			tool.setCurrentTool(this.value);
		};
	}(this);
	
	this.setCurrentTool();
}

