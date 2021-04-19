import React from "react";
import styles from "./styles.module.css";
class Header extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<header className={styles.header}>
				<h1 className={styles.title}>A0NPC</h1>
				<button className={styles.btn} onClick={() => this.props.showInfo()}>
					{this.props.info ? "x" : "?"}
				</button>
			</header>
		);
	}
}

export default Header;
