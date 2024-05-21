import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useSettingsForUser, useIsFirstRender } from '../../hooks';
import SkeletonProfile from '../SkeletonProfile';
import Profile from '../Profile';
import * as ActionUser from '../../actions/userCreators';
import * as Action from '../../actions/creators';
import 'react-toastify/dist/ReactToastify.css';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const { isEdit, name, value, type, editProfile, handleSetting } =
    useSettingsForUser();
  // const isFirstRender = useIsFirstRender();
  const navigate = useNavigate();

  const { userName } = useParams();

  const { user, isFetchingProfile, userProfile, error } = useSelector(
    ({ users }) => users
  );
  const {
    getUserRequest,
    cleanUserProfile,
    subscribeUserProfileRequest,
    unsubscribeUserProfileRequest,
  } = bindActionCreators(ActionUser, useDispatch());
  const { cleanUserError } = bindActionCreators(Action, useDispatch());

  useEffect(() => {
    if (userName !== user.userName) {
      getUserRequest(userName);
    }
    return () => {
      if (userName !== user.userName) {
        cleanUserProfile();
      }
    };
  }, [userName]);

  useEffect(() => {
    if (error?.status === 404) {
      navigate(`/profile/${user.userName}` /*{ replace: true }*/);
    }
    return () => {
      if (error?.status === 404) {
        cleanUserError();
      }
    };
  }, [error]);

  useEffect(() => {
    if (userProfile) {
      subscribeUserProfileRequest(userProfile.id);
    }
    return () => {
      if (userProfile) {
        unsubscribeUserProfileRequest(userProfile.id);
      }
    };
  }, [userProfile?.id]);

  // useEffect(() => {
  //   if (!isFirstRender && error?.status === 409) {
  //     toast.error(error?.message);
  //   }
  // }, [error]);
  // useEffect(() => {
  //   if (!isFirstRender) {
  //     toast.success(`Your ${name} has changed successfully`);
  //   }
  // }, [user]);
  return (
    <section className={styles.section}>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      {isFetchingProfile ? (
        <SkeletonProfile />
      ) : (
        <Profile
          userData={userProfile ? userProfile : user}
          profileSettings={{
            isEdit,
            name,
            value,
            type,
            editProfile,
            handleSetting,
          }}
        />
      )}
    </section>
  );
};

export default UserProfile;
