import React from "react";
import styles from "./styles.module.css";
class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		let canvas = this.canvasRef.current;
		let ctx = canvas.getContext("2d");
		let width = canvas.width;
		let height = canvas.height;
		let vertSpace = height / 17;
		let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		let analysers = this.props.audioFiles.map(file => {
			let analyser = audioCtx.createAnalyser();
			analyser.minDecibels = -90;
			analyser.maxDecibels = -10;
			analyser.smoothingTimeConstant = 0.85;

			let source = audioCtx.createMediaElementSource(file);
			source.connect(analyser);
			source.connect(audioCtx.destination);

			analyser.fftSize = 256;
			let bufferLength = analyser.frequencyBinCount;
			let dataArray = new Uint8Array(bufferLength);

			analyser.getByteTimeDomainData(dataArray);
			return { analyser, bufferLength, dataArray };
		});

		const jitter = n => Math.floor(Math.random() * n);
		const negativeValue = v => (v >= 1 ? 1 - (v - 1) : v);

		const line = (dataArray, bufferLength, variance, startPos, canvas, ctx) => {
			ctx.beginPath();
			let sliceWidth = (width * 1.0) / bufferLength;
			let x = 0;
			for (var i = 0; i < bufferLength; i++) {
				var frequencyVal = dataArray[i] / 128.0; // value between 0 - 2;
				// var v = vv >= 1 ? 1 - (vv - 1) : vv;
				var y =
					negativeValue(frequencyVal) * variance +
					startPos -
					variance +
					jitter(4);

				// v = height * 0.125 * v;
				// var y = height * 0.0625 * 13 + v;

				if (i === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				}
				// t;
				x += sliceWidth;
			}
			// finnish off the line here
			// ctx.lineTo(canvas.width, canvas.height / 2);
			ctx.lineTo(width, y);
			ctx.stroke();
		};

		const draw = () => {
			requestAnimationFrame(draw);

			// analyser.getByteFrequencyData(dataArray);

			ctx.fillStyle = "rgb(20, 20, 20)";
			ctx.fillRect(0, 0, width, height);

			ctx.lineWidth = 4;
			ctx.strokeStyle = "rgb(255,255,255)";

			let vertSpace = height / 17;

			analysers.forEach((a, i) => {
				a.analyser.getByteTimeDomainData(a.dataArray);
				line(
					a.dataArray,
					a.bufferLength,
					vertSpace * 4,
					vertSpace * (i + 1),
					canvas,
					ctx
				);
			});
		};

		ctx.clearRect(0, 0, width, height);
		draw();
	}

	render() {
		// console.log(this.props);
		return (
			<canvas
				className={styles.canvas}
				ref={this.canvasRef}
				width="1000"
				height="1000"
			/>
		);
	}
}

export default Canvas;
