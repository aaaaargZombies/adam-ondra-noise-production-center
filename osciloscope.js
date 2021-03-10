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

let width = 300;
let height = 300;
let canvas = $("canvas");
canvas.width = width;
canvas.height = height;
let ctx = canvas.getContext("2d");

$("button").onclick = () => audio.play();

let audio = new Audio(paths[0]);

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioCtx.createAnalyser();

let source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);

analyser.fftSize = 2048;
let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);

analyser.getByteTimeDomainData(dataArray);

ctx.clearRect(0, 0, width, height);

const draw = () => {
	let drawVisual = requestAnimationFrame(draw);

	analyser.getByteTimeDomainData(dataArray);

	ctx.fillStyle = "rgb(200, 200, 200)";
	ctx.fillRect(0, 0, width, height);

	ctx.lineWidth = 2;
	ctx.strokeStyle = "rgb(0, 0, 0)";
	ctx.beginPath();
	let sliceWidth = (width * 1.0) / bufferLength;
	let x = 0;

	for (var i = 0; i < bufferLength; i++) {
		var v = dataArray[i] / 128.0;
		var y = (v * height) / 2;

		if (i === 0) {
			ctx.moveTo(x, y);
		} else {
			ctx.lineTo(x, y);
		}

		x += sliceWidth;
	}

	ctx.lineTo(canvas.width, canvas.height / 2);
	ctx.stroke();
};

draw();
