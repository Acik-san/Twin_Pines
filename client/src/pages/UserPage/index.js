import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import UserProfile from '../../components/UserProfile';

const UserPage = () => {
  const { user } = useSelector(({ auth }) => auth);
  return (
    <>
      <Header />
      {user && <UserProfile />}
    </>
  );
};

export default UserPage;
