let paths = [
	"./audio/moan_01.mp3",
	"./audio/moan_02.mp3",
	"./audio/shreak_03.mp3",
	"./audio/shreak_01.mp3",
	"./audio/weird_03.mp3",
	"./audio/weird_01.mp3",
	"./audio/weird_04.mp3",
	"./audio/weird_02.mp3",
	"./audio/growl_01.mp3",
	"./audio/growl_02.mp3",
	"./audio/shortOoooh_01.mp3",
	"./audio/shortOoooh_03.mp3",
	"./audio/breath_08.mp3",
	"./audio/percusive_02.mp3",
	"./audio/percusive_03.mp3",
	"./audio/percusive_01.mp3"
];

const $ = q => document.querySelector(q);
const $$ = q => document.querySelectorAll(q);

let width = window.innerWidth;
let height = window.innerHeight;
let canvas = $("canvas");
canvas.width = width;
canvas.height = height;
let ctx = canvas.getContext("2d");

$("body").onkeydown = e => {
	if (e.key === " ") {
		e.preventDefault();
		audio.play();
	}
};

let audio = new Audio(paths[0]);

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

let source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);

analyser.fftSize = 256;
let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);

analyser.getByteTimeDomainData(dataArray);

ctx.clearRect(0, 0, width, height);

const line = (dataArray, bufferLength, variance, startPos, canvas, ctx) => {
	ctx.beginPath();
	let sliceWidth = (width * 1.0) / bufferLength;
	let x = 0;
	for (var i = 0; i < bufferLength; i++) {
		var vv = dataArray[i] / 128.0; // value between 0 - 2;
		var v = vv >= 1 ? 1 - (vv - 1) : vv;
		var y = v * variance + startPos - variance;

		// v = height * 0.125 * v;
		// var y = height * 0.0625 * 13 + v;

		if (i === 0) {
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
		}

		x += sliceWidth;
	}
	// finnish off the line here
	// ctx.lineTo(canvas.width, canvas.height / 2);
	ctx.lineTo(canvas.width, y);
	ctx.stroke();
};

const draw = () => {
	requestAnimationFrame(draw);

	analyser.getByteTimeDomainData(dataArray);
	// analyser.getByteFrequencyData(dataArray);

	ctx.fillStyle = "rgb(20, 20, 20)";
	ctx.fillRect(0, 0, width, height);

	ctx.lineWidth = 2;
	ctx.strokeStyle = "rgb(255,255,255)";

	let vertSpace = height / 17;

	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 1, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 2, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 3, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 4, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 5, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 6, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 7, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 8, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 9, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 10, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 11, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 12, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 13, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 14, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 15, canvas, ctx);
	line(dataArray, bufferLength, vertSpace * 4, vertSpace * 16, canvas, ctx);
};

draw();

let a = [0, 0.1, 0.2, 0.3, 0.5, 0.8, 1, 1.1, 1.3, 1.5, 1.6, 1.8, 1.9, 2];
a.map(x => (x >= 1 ? 1 - (x - 1) : x));
