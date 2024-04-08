import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import ShadowEffectSvg from '../ShadowEffectSvg';
import * as ActionAuth from '../../actions/authCreators';
import * as ActionChat from '../../actions/chatsCreator';
import * as ActionUser from '../../actions/userCreators';
import * as API from '../../api/webSocket/socketEventController';
import CONSTANTS from '../../constants';
import styles from './Header.module.scss';

const Header = () => {
  const { user } = useSelector(({ users }) => users);
  const { messagesPreview } = useSelector(({ chats }) => chats);
  const { logoutSuccess } = bindActionCreators(ActionAuth, useDispatch());
  const { clearChatsSuccess } = bindActionCreators(ActionChat, useDispatch());
  const { setOnlineStatusRequest } = bindActionCreators(
    ActionUser,
    useDispatch()
  );
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    API.unsubscribeChats({
      userId: user.id,
      conversations: messagesPreview.map(({ _id, interlocutor: { id } }) => ({
        conversationId: _id,
        interlocutorId: id,
      })),
    });
    setOnlineStatusRequest({ userId: user.id, status: 'offline' });
    logoutSuccess(window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN));
    clearChatsSuccess();
    navigate('/');
  };
  return (
    <header className={styles.header}>
      <Link to='/'>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}svg/twin-pines.svg`}
          alt='logo'
          className={styles.logo}
        />
      </Link>
      <nav
        className={classNames(styles.menu, styles.list, {
          [styles['menu-opened']]: isOpen,
        })}
      >
        <label
          className={classNames({
            [styles['menu-open-button']]: !isOpen,
            [styles['menu-open-button-opened']]: isOpen,
          })}
          onClick={() => setIsOpen(!isOpen)}
        >
          {CONSTANTS.HEADER.HAMBURGER_MENU.map(({ id }) => (
            <span
              key={id}
              className={classNames(styles[`hamburger-${id}`], {
                [styles[`hamburger-open-${id}`]]: isOpen,
              })}
            />
          ))}
        </label>
        <NavLink
          to='/'
          className={classNames(styles['menu-item'], styles.list_item_link, {
            [styles['menu-item-opened']]: isOpen,
            [styles['home-button']]: isOpen,
          })}
        >
          Home
        </NavLink>
        {user
          ? CONSTANTS.HEADER.LOGINED_BUTTONS.map(
              ({ id, type, path, text, name }) => {
                return type === 'link' ? (
                  <NavLink
                    key={id}
                    to={name === 'profile' ? `${path}/${user.userName}` : path}
                    className={classNames(
                      styles['menu-item'],
                      styles.list_item_link,
                      {
                        [styles['menu-item-opened']]: isOpen,
                        [styles[`${name}-button`]]: isOpen,
                      }
                    )}
                  >
                    {text}
                  </NavLink>
                ) : (
                  <button
                    key={id}
                    className={classNames(
                      styles['menu-item'],
                      styles.list_item_link,
                      styles.logout,
                      {
                        [styles['menu-item-opened']]: isOpen,
                        [styles[`${name}-button`]]: isOpen,
                      }
                    )}
                    onClick={handleLogout}
                  >
                    {text}
                  </button>
                );
              }
            )
          : CONSTANTS.HEADER.AUTH_BUTTONS.map(
              ({ id, type, path, text, name }) => (
                <NavLink
                  key={id}
                  to={path}
                  className={classNames(
                    styles['menu-item'],
                    styles.list_item_link,
                    {
                      [styles['menu-item-opened']]: isOpen,
                      [styles[`${name}-button`]]: isOpen,
                    }
                  )}
                >
                  {text}
                </NavLink>
              )
            )}
      </nav>
      <ShadowEffectSvg />
    </header>
  );
};

export default Header;
