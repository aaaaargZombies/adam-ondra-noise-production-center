import React from "react";
import styles from "./styles.module.css";

const Header = (props) => (
	<header className={styles.header}>
		<h1 className={styles.title}>A0NPC</h1>
		<button className={styles.btn} onClick={() => props.showInfo()}>
			{props.info ? "x" : "?"}
		</button>
	</header>
);

export default Header;
