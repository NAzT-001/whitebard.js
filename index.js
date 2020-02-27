const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const pixelUtil = require("pixel-util");
const Canvas = require("canvas");
var sizeOf = require("image-size");
//var dimensions = sizeOf("images/funny-cats.png");

app.use(express.static(__dirname + "/public"));

const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(200, 200);
const ctx = canvas.getContext("2d");
const fs = require("fs");
const path = require("path");
const pify = require("pify");

const imageSizeOfP = pify(sizeOf);

//var buffer = fs.readFileSync("./passedThroughGrayscale.jpg");

const img = new Canvas.Image();
img.src = path.join(__dirname, "images", "passedThroughGrayscale.jpg");

function onConnection(socket) {
	(async () => {
		console.log("welcome");
		var buffer = fs.readFileSync("./y.jpg");
		let a = await imageSizeOfP("./y.jpg");
		//let x = await Canvas.loadImage("./passedThroughGrayscale.jpg");
		let output = { ...a, data: buffer };
		console.log(output);
		socket.emit("pixel", output);
		//console.log(x);
	})();
	//console.log(img.toString("base64"));
	//console.log(imageSize);
	//imageSize.imageSize(img);
	//let i = new Canvas.Image
	//console.log(Canvas.Image);
	//let canvas = new Canvas(150, 150);
	//var image = new Canvas.Image;

	//pixelUtil.createBuffer("https://playground.cmmakerclub.com/wp-content/uploads/2014/07/logo1.png").then(function(buffer) {
	//	console.log(buffer);
	//	//console.log(buffer);
	//	//i.src = buffer;
	//	//console.log(i.toDataA);
	//	socket.emit("pixel", buffer);
	//	//ctx.drawImage(i, 0, 0);
	//	//console.log(canvas);
	//	//canvas.createJPEGStream().pipe(fs.createWriteStream(path.join(__dirname, "passedThroughGrayscale.jpg")));
	//});

	//socket.on("drawing", (data) => socket.broadcast.emit("drawing", data));
	socket.on("hello", function(xx) {
		//console.log(xx);
		console.log("hello");
		socket.broadcast.emit("yy", xx);
	});
}

io.on("connection", onConnection);

http.listen(port, () => console.log("listening on port " + port));
