import styles from "./styles.module.css";
import Header from "../Header/Header";
import Main from "../Main/Main";

function App() {
	return (
		<div className={styles.App}>
			<Header />
			<Main />
		</div>
	);
}

export default App;
