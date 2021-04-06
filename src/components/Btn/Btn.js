import React from "react";
import styles from "./styles.module.css";
class Btn extends React.Component {
	render() {
		return (
			<button onClick={this.props.handleClick} className={styles.btn}></button>
		);
	}
}

export default Btn;
