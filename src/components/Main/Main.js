import React from "react";
import styles from "./styles.module.css";
import Canvas from "../Canvas/Canvas";
import Btn from "../Btn/Btn";
import Info from "../Info/Info";
import file0 from "../../audio/moan_01.mp3";
import file1 from "../../audio/moan_02.mp3";
import file2 from "../../audio/shreak_03.mp3";
import file3 from "../../audio/shreak_01.mp3";
import file4 from "../../audio/weird_03.mp3";
import file5 from "../../audio/weird_01.mp3";
import file6 from "../../audio/weird_04.mp3";
import file7 from "../../audio/weird_02.mp3";
import file8 from "../../audio/growl_01.mp3";
import file9 from "../../audio/growl_02.mp3";
import file10 from "../../audio/shortOoooh_01.mp3";
import file11 from "../../audio/shortOoooh_03.mp3";
import file12 from "../../audio/breath_08.mp3";
import file13 from "../../audio/percusive_02.mp3";
import file14 from "../../audio/percusive_03.mp3";
import file15 from "../../audio/percusive_01.mp3";

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.audioFiles = [
			new Audio(file0),
			new Audio(file1),
			new Audio(file2),
			new Audio(file3),
			new Audio(file4),
			new Audio(file5),
			new Audio(file6),
			new Audio(file7),
			new Audio(file8),
			new Audio(file9),
			new Audio(file10),
			new Audio(file11),
			new Audio(file12),
			new Audio(file13),
			new Audio(file14),
			new Audio(file15)
		];
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(file) {
		if (file.paused) {
			file.play();
		} else {
			file.currentTime = 0;
		}
	}

	render() {
		return (
			<main className={styles.grid}>
				<Canvas audioFiles={this.audioFiles} />
				{this.props.info ? (
					<Info />
				) : (
					this.audioFiles.map((file, i) => (
						<Btn key={i} handleClick={() => this.handleClick(file)} />
					))
				)}
			</main>
		);
	}
}

export default Main;
