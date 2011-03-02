if(window.addEventListener) {

window.addEventListener('load', function () {


var controller = new Controller("ws://localhost:8000/");

controller.view.initView;

//controller.connectionController;
//controller.messageController;
//controller.paintController;


});}
