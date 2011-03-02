function Tools(paint) {
	
    this.tool_select = document.getElementById(paint.view.dtool);
    this.tool_default = 'rect';
    this.tool =function (ev) {};
    this.paint = paint;
    
    if (!this.tool_select) 
		throw 'Error: failed to get the dtool element!';

    this.init = function() {
		this.tool_select = document.getElementById(paint.view.dtool);
		if (this[this.tool_default]) {
		  this.tool = new this[this.tool_default];
		  this.tool_select.value = this.tool_default;
		}
		this.tool_select.addEventListener('change', this.controller(), false);
	};
	
	this.controller = function(ev) {
		if (this[this.value]) {
			tool = new this[this.value];
		}
	};
	
	this.rect = function(ev,paint) {
		this.started = false;
		this.mousedown = function (ev,paint) {
			this.started = true;
			this.x0 = ev._x;
			this.y0 = ev._y;
		};
		this.mousemove = function(ev,paint) {
			if (!this.started)
				return;
			var x = Math.min(ev._x,  this.x0),
				y = Math.min(ev._y,  this.y0),
				w = Math.abs(ev._x - this.x0),
				h = Math.abs(ev._y - this.y0);
			 
			if (!w || !h)
				return;
			shape = new Rectangle({
					x:x, y:y, w:w, h:h,
					strokeColor:"#" + document.getElementById("colorChooser").value,
					fillColor:"#" + document.getElementById("colorChooserFill").value,
					lineWidth: document.getElementById("lineWidth").value,
					shadow: (document.getElementById("shadow").value ? 1 : 0)},
					paint).draw();
		};
		this.mouseup = function (ev,paint) {
			this.started = false;
		};
	};
	
}
