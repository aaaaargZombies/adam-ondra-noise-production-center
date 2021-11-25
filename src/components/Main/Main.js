import React from "react";
import styles from "./styles.module.css";
import Canvas from "../Canvas/Canvas";
import Btn from "../Btn/Btn";
import Info from "../Info/Info";
import file0 from "../../audio/moan-01.mp3";
import file1 from "../../audio/moan-02.mp3";
import file2 from "../../audio/shreak-03.mp3";
import file3 from "../../audio/shreak-01.mp3";
import file4 from "../../audio/weird-03.mp3";
import file5 from "../../audio/weird-01.mp3";
import file6 from "../../audio/weird-04.mp3";
import file7 from "../../audio/weird-02.mp3";
import file8 from "../../audio/growl-01.mp3";
import file9 from "../../audio/growl-02.mp3";
import file10 from "../../audio/shortOoooh-01.mp3";
import file11 from "../../audio/shortOoooh-03.mp3";
import file12 from "../../audio/breath-08.mp3";
import file13 from "../../audio/percusive-02.mp3";
import file14 from "../../audio/percusive-03.mp3";
import file15 from "../../audio/percusive-01.mp3";

const audioFiles = [
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
	new Audio(file15),
];

const handleClick = (file) => {
	// chrome will not play audio unless you trigger this via a user gesture
	audioCtx.resume();
	if (file.paused) {
		file.play();
	} else {
		file.currentTime = 0;
	}
};

const Btns = audioFiles.map((file, i) => (
	<Btn key={i} handleClick={() => handleClick(file)} />
));

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const canvas = <Canvas audioFiles={audioFiles} audioCtx={audioCtx} />;

const Main = (props) => (
	<main className={styles.grid}>
		{canvas}
		{props.info ? <Info /> : Btns}
	</main>
);

export default Main;
