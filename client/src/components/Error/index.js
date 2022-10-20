import React from "react";
import { useSelector } from "react-redux";
import styles from "./Error.module.scss";

const Error = (props) => {
  const { error } = props;
  return (
    <div className={styles.container}>
      <div className={styles.cross}>X</div>
      <h2>Error!</h2>
      {/* <h3>{error.message}</h3> */}
      <h3>{error.message}</h3>
    </div>
  );
};

export default Error;
