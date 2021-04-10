import React from "react";
import styles from "./styles.module.css";
class Header extends React.Component {
	render() {
		return (
			<header className={styles.header}>
				<h1 className={styles.title}>A0NPC</h1>
				{/* <h2 className={styles.info}>?</h2> */}
			</header>
		);
	}
}

export default Header;
