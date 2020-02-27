// Code goes here

var socket = io();

var video = document.getElementById("video");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

function calculateSize(srcSize, dstSize) {
	var srcRatio = srcSize.width / srcSize.height;
	var dstRatio = dstSize.width / dstSize.height;
	if (dstRatio > srcRatio) {
		return {
			width: dstSize.height * srcRatio,
			height: dstSize.height
		};
	} else {
		return {
			width: dstSize.width,
			height: dstSize.width / srcRatio
		};
	}
}

let ct = 0;
setInterval(function() {
	console.log(ct);
	ct = 0;
}, 1000);

function renderFrame() {
	requestAnimationFrame(renderFrame);
	canvas.width = canvas.scrollWidth;
	canvas.height = canvas.scrollHeight;
	if (video.readyState === video.HAVE_ENOUGH_DATA) {
		var videoSize = { width: video.videoWidth, height: video.videoHeight };
		var canvasSize = { width: canvas.width, height: canvas.height };
		var renderSize = calculateSize(videoSize, canvasSize);
		var xOffset = (canvasSize.width - renderSize.width) / 2;
		ct++;
		context.drawImage(video, xOffset, 0, renderSize.width, renderSize.height);
		//let xx = context.getImageData(0, 0, renderSize.width, renderSize.height);
		socket.emit("hello", canvas.toDataURL("image/jpeg", 0.5));
		//console.log(xx);
	}
}

if (navigator.mediaDevices.getUserMedia) {
	var successCallback = function(stream) {
		video.srcObject = stream;
	};
	var errorCallback = function(error) {
		console.log(error);
	};
	navigator.mediaDevices.getUserMedia({
		audio: false,
		video: { facingMode: "environment" }
	}).then(successCallback, errorCallback);
	requestAnimationFrame(renderFrame);
}
