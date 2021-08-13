import React from "react";
import styles from "./styles.module.css";

const Btn = (props) => (
	<button onClick={props.handleClick} className={styles.btn}></button>
);

export default Btn;
