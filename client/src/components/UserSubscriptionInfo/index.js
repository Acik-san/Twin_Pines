import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserSubscriptionInfoPropTypes } from '../../propTypes';
import Button from '../Button';
import * as ActionUser from '../../actions/userCreators';
import styles from './UserSubscriptionInfo.module.scss';
import { useParams } from 'react-router-dom';

const UserSubscriptionInfo = props => {
  const { userData, handleProfileEdit, handleSubscriptionOpen } = props;
  const { user, subscriptionsLimit, subscriptionsOffset } = useSelector(
    ({ users }) => users
  );
  const {
    subscribeUserRequest,
    unsubscribeUserRequest,
    getUserFollowersRequest,
    getUserFollowingRequest,
  } = bindActionCreators(ActionUser, useDispatch());
  const { userName } = useParams();

  return (
    <div className={styles.container}>
      <ul className={styles.subscription_container}>
        <li
          className={styles.subscription_container_item}
          onClick={() => {
            handleSubscriptionOpen();
            getUserFollowersRequest(
              userName,
              subscriptionsLimit,
              subscriptionsOffset
            );
          }}
        >
          <span>{userData.followers}</span>{' '}
          {userData.followers === 1 ? 'follower' : 'followers'}
        </li>
        <li
          className={styles.subscription_container_item}
          onClick={() => {
            handleSubscriptionOpen();
            getUserFollowingRequest(
              userName,
              subscriptionsLimit,
              subscriptionsOffset
            );
          }}
        >
          <span>{userData.following}</span> following
        </li>
      </ul>
      <div className={styles.button_container}>
        {userData.id === user.id ? (
          <Button
            buttonName='Edit profile'
            onClick={handleProfileEdit}
            className={styles.edit_button}
          />
        ) : (
          <>
            {userData.isFollowed ? (
              <Button
                buttonName='Unfollow'
                onClick={() => unsubscribeUserRequest(userData.id)}
                className={styles.subscribe_button}
              />
            ) : (
              <Button
                buttonName='Follow'
                onClick={() => subscribeUserRequest(userData.id)}
                className={styles.subscribe_button}
              />
            )}
            <Button
              buttonName='...'
              onClick={() => {}}
              className={styles.options_button}
            />
          </>
        )}
      </div>
    </div>
  );
};

UserSubscriptionInfo.propTypes = UserSubscriptionInfoPropTypes;

export default UserSubscriptionInfo;
