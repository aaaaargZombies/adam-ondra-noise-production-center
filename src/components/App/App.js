import React, { useState } from "react";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import Main from "../Main/Main";

const App = () => {
	const [info, setInfo] = useState(false);
	const showInfo = () => {
		setInfo(!info);
	};
	return (
		<div className={styles.App}>
			<Header info={info} showInfo={showInfo} />
			<Main info={info} />
		</div>
	);
};

export default App;
