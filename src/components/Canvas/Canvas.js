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
		let barWidth = 38;
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

		const line = (dataArray, bufferLength, variance, startPos) => {
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

		const drawGrid = barWidth => {
			let spacing = (width - barWidth * 3) / 4;
			ctx.fillRect(spacing * 1 + barWidth * 0, 0, barWidth, height);
			ctx.fillRect(spacing * 2 + barWidth * 1, 0, barWidth, height);
			ctx.fillRect(spacing * 3 + barWidth * 2, 0, barWidth, height);
			ctx.fillRect(0, spacing * 1 + barWidth * 0, width, barWidth);
			ctx.fillRect(0, spacing * 2 + barWidth * 1, width, barWidth);
			ctx.fillRect(0, spacing * 3 + barWidth * 2, width, barWidth);
		};

		const draw = () => {
			requestAnimationFrame(draw);

			// analyser.getByteFrequencyData(dataArray);

			ctx.fillStyle = "rgb(10, 10, 10)";
			ctx.fillRect(0, 0, width, height);

			ctx.lineWidth = 2;
			ctx.strokeStyle = "rgb(255,255,255)";

			analysers.forEach((a, i) => {
				a.analyser.getByteTimeDomainData(a.dataArray);
				let startPos = [height]
					.map(x => x - barWidth * 3) // equally devide visible space.
					.map(x => x / 16.5) // 16 plots + space equal padding from base of canvas.
					.map(x => x * (i + 1)) // move down a step each time the array increments.
					.map(x => x + barWidth * Math.floor(i / 4))[0]; // add to avoid the none visible area formed by the grid.

				line(a.dataArray, a.bufferLength, vertSpace * 4, startPos, canvas, ctx);
				line(
					a.dataArray,
					a.bufferLength,
					vertSpace,
					startPos - vertSpace / 2.3,
					canvas,
					ctx
				);
			});

			drawGrid(barWidth);
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
