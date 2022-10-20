import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  console.log();
  return (
    <div className={styles.header}>
      <Link to="/">
        <img
          src={`${__dirname}static/images/todo_logo.png`}
          alt="logo"
          className={styles.logo}
        ></img>
      </Link>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <NavLink to="/" className={styles.list_item_link}>
            Home
          </NavLink>
        </li>
        <li className={styles.list_item}>
          <NavLink to="/tasks" className={styles.list_item_link}>
            Tasks
          </NavLink>
        </li>
        <li className={styles.list_item}>
          <NavLink to="/create-user" className={styles.list_item_link}>
            Create user
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
