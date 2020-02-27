// Code goes here

var socket = io();

var video = document.getElementById("video");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

let ct = 0;
setInterval(function() {
	console.log(ct);
	ct = 0;
}, 1000);

socket.on("yy", function(yy) {
	var img = new Image;
	img.src = yy;
	context.drawImage(img, 0, 0);
	//console.log("got yy", yy);
	//context.putImageData(yy.data, 0, 0);
});
