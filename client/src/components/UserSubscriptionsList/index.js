import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { UserSubscriptionsListPropTypes } from '../../propTypes';
import * as ActionUser from '../../actions/userCreators';
import styles from './UserSubscriptionsList.module.scss';
import Avatar from '../Avatar';
import { useClickOutside } from '../../hooks';

const UserSubscriptionsList = props => {
  const { handleSubscriptionOpen } = props;
  const { userName } = useParams();
  const {
    profileSubscriptions,
    subscriptionsLimit,
    subscriptionsOffset,
    haveMoreSubscriptions,
  } = useSelector(({ users }) => users);
  const {
    cleanProfileSubscriptions,
    getUserFollowersRequest,
    getUserFollowingRequest,
  } = bindActionCreators(ActionUser, useDispatch());
  const subscriptionRef = useRef(null);
  const handleSubscriptions = () => {
    handleSubscriptionOpen();
    cleanProfileSubscriptions();
  };
  useClickOutside(subscriptionRef, handleSubscriptions);
  const handleScroll = e => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop === scrollHeight - clientHeight && haveMoreSubscriptions) {
      profileSubscriptions.type === 'Followers'
        ? getUserFollowersRequest(
            userName,
            subscriptionsLimit,
            subscriptionsOffset
          )
        : getUserFollowingRequest(
            userName,
            subscriptionsLimit,
            subscriptionsOffset
          );
    }
  };
  return (
    <div className={styles.profile_subscriptions_wrapper}>
      <article className={styles.subscription} ref={subscriptionRef}>
        <h4>{profileSubscriptions?.type}</h4>
        <ul className={styles.subscription_list} onScroll={handleScroll}>
          {profileSubscriptions?.subscriptions
            ? profileSubscriptions.subscriptions.map(
                ({ id, userName, name, avatar }) => (
                  <Link
                    to={`/profile/${userName}`}
                    key={id}
                    className={styles.subscription_list_item}
                    onClick={handleSubscriptions}
                  >
                    <Avatar
                      userName={userName}
                      avatar={avatar}
                      classes={{
                        photoWrapper: styles.photo_wrapper,
                        photoInner: styles.photo_inner,
                        photoInnerImg: styles.photo_inner_img,
                      }}
                    />
                    <div className={styles.name_container}>
                      <h3 className={styles.subscription_username}>
                        {userName}
                      </h3>
                      <h4 className={styles.subscription_name}>{name}</h4>
                    </div>
                  </Link>
                )
              )
            : null}
        </ul>
      </article>
    </div>
  );
};

UserSubscriptionsList.propTypes = UserSubscriptionsListPropTypes

export default UserSubscriptionsList;
