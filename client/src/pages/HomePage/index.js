import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/Header';
import UsersList from '../../components/UsersList';
import * as ActionsUser from '../../actions/userCreators';

const HomePage = () => {
  const { sumUsers } = useSelector(({ users }) => users);
  const { getSumUserRequest } = bindActionCreators(ActionsUser, useDispatch());
  useEffect(() => {
    // getSumUserRequest(); // eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      {sumUsers && <UsersList />}
    </>
  );
};

export default HomePage;
