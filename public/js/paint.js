function Paint(view) {
	
	this.view = view;
	
	this.canvaso = document.getElementById(view.canvas);
    this.contexto = this.canvaso.getContext('2d');
	this.container = this.canvaso.parentNode;
	
	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');
	this.canvas.id = 'imageTemp';
    this.canvas.width  = this.canvaso.width;
    this.canvas.height = this.canvaso.height;
    this.container.appendChild(this.canvas);
    
    this.updateCanvas = function() {
		this.contexto.drawImage(this.canvas, 0, 0);
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	
	this.clearCanvas = function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	
	this.startDraw = function(shape) {
		switch (shape.type) {
			case "pencil": case "rubber":
				this.context.beginPath();
				this.context.moveTo(shape.x0, shape.y0);break;
			default: return;
		}
	}
	
	this.draw = function(shape) {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.lineWidth = shape.lineWidth;
		this.context.shadowColor= "#BBBBBB";
		this.context.shadowBlur = (shape.shadow==1 ? 20 : 0);
		this.context.shadowOffsetX=(shape.shadow==1 ? 5 : 0);
		this.context.shadowOffsetY=(shape.shadow==1 ? 5 : 0);
		this.context.strokeStyle = shape.strokeColor;
		this.context.fillStyle = shape.fillColor;
		switch (shape.type) {
			case "pencil": case "rubber":
				this.context.lineTo(shape.x, shape.y);
				this.context.stroke();break;
			case "rect":
				this.context.strokeRect(shape.x, shape.y, shape.w, shape.h);
				this.context.fillRect(shape.x, shape.y, shape.w, shape.h);break;
			case "line":
				this.context.beginPath();
				this.context.moveTo(shape.x0, shape.y0);
				this.context.lineTo(shape.x, shape.y);
				this.context.stroke();
				this.context.closePath();break;
			case "circle":
				this.context.beginPath();
				this.context.arc(shape.x, shape.y, shape.w, shape.h, Math.PI*2, true); 
				this.context.stroke();
				this.context.fill();
				this.context.closePath();break;
			default: return;
		}
	}
}
