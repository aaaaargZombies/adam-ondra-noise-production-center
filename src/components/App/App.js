import React from "react";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import Main from "../Main/Main";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { info: false };
		this.showInfo = this.showInfo.bind(this);
	}

	showInfo() {
		this.setState({ info: !this.state.info });
	}

	render() {
		return (
			<div className={styles.App}>
				<Header info={this.state.info} showInfo={this.showInfo} />
				<Main info={this.state.info} />
			</div>
		);
	}
}

export default App;
