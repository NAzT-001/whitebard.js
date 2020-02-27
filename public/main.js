"use strict";

(function() {

	var socket = io();
	window.canvas = document.getElementsByClassName("whiteboard")[0];
	window.nat = document.getElementById("nat");
	window.context = canvas.getContext("2d");

	var current = {
		color: "black"
	};
	var drawing = false;

	//socket.on("drawing", onDrawingEvent);
	socket.on("pixel", function(x) {
		let data = x.data;
		console.log("on pixel data", data);
		let img = new Image;
		var arrayBufferView = new Uint8Array(data);
		var blob = new Blob([arrayBufferView], { type: "image/png" });
		var urlCreator = window.URL || window.webkitURL;		//var urlCreator = window.URL || window.webkitURL;
		var imageUrl = urlCreator.createObjectURL(blob);
		//
		console.log(nat);
		//img.src = imageUrl;
		nat.src = imageUrl;
		//consoole.log(urlCreator, da)
		//context.drawImage(img, 0, 0);
		console.log(imageUrl);
		console.log(canvas);
		setTimeout(function() {
			context.drawImage(nat, 0, 0);
		}, 100);
	});

})();
