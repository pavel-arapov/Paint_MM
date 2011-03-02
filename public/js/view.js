function View() {
	
	this.message = $("#message");
	this.logpanel = $("#log");
	this.sendbtn=$("#sendbtn");
	this.connectbtn=$("#connectbtn");
	this.clearcanvasbtn = $("#clearCanvasBtn");
	this.canvas = "imageView";
	this.dtool = "dtool";
	this.record = $("#recordBtn");
	this.load = $("#loadBtn");
	this.clearBD = $("#clearBD");
	
	this.initView = function(view) {
		this.message.focus();
		$("body").bind("focus", function(){
			this.message.focus();
		});
		$("#paint_options span").bind("click", function(){
			if ($("#paint_options .hidden").is(":hidden")) {
				$("#record_options .hidden").slideUp('fast', function() {
					$("#paint_options .hidden").slideDown('slow');});
			} else {
				$("#paint_options .hidden").slideUp('fast');
			}
		});
		$("#record_options span").bind("click", function(){
			if ($("#record_options .hidden").is(":hidden")) {
				$("#paint_options .hidden").slideUp('fast', function() {
					$("#record_options .hidden").slideDown('slow');});
			} else {
				$("#record_options .hidden").slideUp('fast');
			}
		});
	}(this);
	
	this.getMessage = function() {
		return this.message.val();
	};
	
	this.log = function(message) {
		this.logpanel.append("<p>"+message.content+"</p>");
		this.logpanel.animate({ scrollTop: this.logpanel.attr("scrollHeight") }, 1000);
		this.message.val("");
	};
	
	this.disconnected = function() {
		this.sendbtn.attr("disabled");
		this.connectbtn.val("Connect");
	};
	this.connected = function() {
		this.sendbtn.removeAttr("disabled");
		this.connectbtn.val("Disconnect");
	};
	
	this.getRubberColor = function() {
		return $("#page-left").css("background-color");
	}
}
