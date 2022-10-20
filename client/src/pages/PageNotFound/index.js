import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.scss";

const PageNotFound = () => {
  const navigate = useNavigate();
  setTimeout(() => navigate("/", { replace: true }), 3000);
  return (
    <div className={styles.container}>
      <h1 className={styles}>Page not found: 404</h1>
      <p className={styles}>Now you'll be redirect to Home</p>
    </div>
  );
};

export default PageNotFound;
