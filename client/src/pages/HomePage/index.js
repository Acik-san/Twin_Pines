import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionsUser from "../../actions/userCreators";
import UsersList from "../../components/UsersList";

const HomePage = () => {
  const { sumUsers } = useSelector(({ users }) => users);
  const { getSumUserRequest } = bindActionCreators(ActionsUser, useDispatch());
  useEffect(() => {
    getSumUserRequest(); // eslint-disable-next-line
  }, []);
  return <>{sumUsers && <UsersList />}</>;
};

export default HomePage;
