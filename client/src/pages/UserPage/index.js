import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FixedBackground from '../../components/FixedBackground';
import Header from '../../components/Header';
import UserProfile from '../../components/UserProfile';

const UserPage = () => {
  const { user } = useSelector(({ users }) => users);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   !user && navigate('/', { replace: true });
  // }, [user]);
  return (
    <>
      <FixedBackground />
      <Header />
      {user && <UserProfile />}
    </>
  );
};

export default UserPage;
