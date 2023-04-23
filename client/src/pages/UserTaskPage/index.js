import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FixedBackground from '../../components/FixedBackground';
import Header from '../../components/Header';
import Task from '../../components/Task';

const UserTaskPage = () => {
  const { user } = useSelector(({ users }) => users);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   !user && navigate('/', { replace: true });
  // }, [user]);
  return (
    <>
      <FixedBackground />
      <Header />
      {user && <Task />}
    </>
  );
};

export default UserTaskPage;