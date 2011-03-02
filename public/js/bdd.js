var animation;
var i=0;
var max= 0;
var controller = null;
var results = null;

function Database(controlle) {
	this.controller = controlle;
	controller = this.controller;
	database1 = this;
	this.db;
	this.save = false;
	this.load = false;
	this.animation = null;
	this.i = 0;
	this.results = null;
	
	if (window.openDatabase) {
		this.db = openDatabase("DBTest", "1.0", "HTML5 Database API example", 200000);
	}
	
	this.create = function() {
		this.db.transaction(function(tx) {
			tx.executeSql("CREATE TABLE TablePaint (id  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, text TEXT)", []);
		});
	};
	
	this.drop = function() {
		this.db.transaction(function(tx) {
			tx.executeSql("DROP TABLE TablePaint", []);
		}); 
	};
	
	this.clearBD = function() {
		if (confirm("Erase records definitely ?")) {
			this.drop();
			this.create();
		}
	}
	
	this.startSaving = function() {
		if (this.save == false) {
			if (this.load == false || confirm("Stop loading ?")) {
				this.stopLoading();
				this.save = true;
				this.controller.view.record.val("Stop");
				this.controller.view.load.attr("disabled", true);
				this.controller.view.clearBD.attr("disabled",true);
			}
		} else {
			this.stopSaving();
		}
	}
	this.stopSaving = function() {
		if (this.save == true) {
			this.save = false;
			this.controller.view.record.val("Record");
			this.controller.view.load.removeAttr("disabled");
			this.controller.view.clearBD.removeAttr("disabled");
		}
	}
	this.startLoading = function() {
		if (this.load == false) {
			if (this.save == false || confirm("Stop loading ?")) {
				this.stopSaving();
				this.load = true;
				this.controller.view.load.val("Stop");
				this.controller.view.record.attr("disabled", true);
				this.controller.view.clearBD.attr("disabled",true);
				this.loadData();
			}
		} else {
			this.stopLoading();
		}
	}
	this.stopLoading = function() {
		if (this.load == true) {
			window.clearInterval(animation);
			i=0;
			this.load = false;
			this.controller.view.load.val("Load");
			this.controller.view.record.removeAttr("disabled");
			this.controller.view.clearBD.removeAttr("disabled");
		}
	}
	
	this.insert = function(data) {
		if (this.save && this.load == false) {
			this.db.transaction(function(tx) { 
				tx.executeSql("INSERT INTO TablePaint (id, text) VALUES (?, ?)", [null,data]);
			});
		}
	};
	
	this.loadData = function() {
		var dbc = this;
		this.load = true;
		if (this.save == false) {
			this.db.transaction(
				function(tx) {
					tx.executeSql("SELECT * FROM TablePaint ORDER BY id", [], dbc.doLoad);
				});
		}
	};
	
	this.doLoad = function(tx, result) {
		results = result;
		max = results.rows.length;
		animation = window.setInterval(function() {
				if (i < max) {
					data = JSON.parse(results.rows.item(i)["text"]);
					data.user = controller.user_id;
					controller.doDraw(data);
					controller.sendData(JSON.stringify(data));
				} else {
					alert("Load finished");
					controller.database.stopLoading();return;
				}i++;
			}, 20);
	};
}



