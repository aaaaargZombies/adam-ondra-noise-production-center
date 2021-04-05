import React from "react";
import styles from "./styles.module.css";
class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		let ctx = this.canvasRef.current.getContext("2d");
		ctx.fillStyle = "blue";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		console.log(this.canvasRef.current);
		console.log(this.props);
	}

	render() {
		// console.log(this.props);
		return <canvas className={styles.canvas} ref={this.canvasRef} />;
	}
}

export default Canvas;
