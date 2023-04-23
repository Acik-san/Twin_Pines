import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import * as ActionAuth from '../../actions/authCreators';
import CONSTANTS from '../../constants';
import styles from './Header.module.scss';

const Header = () => {
  const { user } = useSelector(({ users }) => users);
  const { logoutSuccess } = bindActionCreators(ActionAuth, useDispatch());
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutSuccess(window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN));
    navigate('/');
  };
  return (
    <header className={styles.header}>
      <Link to='/'>
        <img
          src={`${__dirname}static/images/todo_logo.png`}
          alt='logo'
          className={styles.logo}
        ></img>
      </Link>
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <NavLink to='/' className={styles.list_item_link}>
            Home
          </NavLink>
        </li>
        {user ? (
          <>
            <li className={styles.list_item}>
              <NavLink to={'/profile'} className={styles.list_item_link}>
                Profile
              </NavLink>
            </li>
            <li className={styles.list_item}>
              <button className={styles.list_item_link} onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={styles.list_item}>
              <NavLink to='/sign-in' className={styles.list_item_link}>
                Sign-in
              </NavLink>
            </li>
            <li className={styles.list_item}>
              <NavLink to='/sign-up' className={styles.list_item_link}>
                Sign-up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
