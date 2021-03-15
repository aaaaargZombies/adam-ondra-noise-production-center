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
		console.log(dataArray);
		e.preventDefault();
		audio.play();
		setTimeout(() => console.log(dataArray), 1000);
	}
};

let audio = new Audio(paths[0]);

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioCtx.createAnalyser();

let source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);

analyser.fftSize = 256;
let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);

analyser.getByteTimeDomainData(dataArray);

ctx.clearRect(0, 0, width, height);

const draw = () => {
	requestAnimationFrame(draw);

	analyser.getByteFrequencyData(dataArray);

	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillRect(0, 0, width, height);

	var barWidth = (width / bufferLength) * 2.5;
	var barHeight;
	var x = 0;

	for (var i = 0; i < bufferLength; i++) {
		barHeight = dataArray[i] / 2;

		ctx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
		ctx.fillRect(x, height - barHeight / 2, barWidth, barHeight);

		x += barWidth + 1;
	}
};

draw();
