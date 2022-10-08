import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import UserUpdateForm from "../forms/UserUpdateForm";
import * as ActionsUser from "../../actions/userCreators";

const UserProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { userId } = useParams();
  const { selectedUser } = useSelector(({ users }) => users);
  const editProfile = () => {
    setIsEdit(!isEdit);
  };
  const { getUserRequest } = bindActionCreators(ActionsUser, useDispatch());
  useEffect(() => {
    getUserRequest(userId); // eslint-disable-next-line
  }, []);
  return (
    <article>
      <h1>{selectedUser.login}</h1>
      <button onClick={editProfile}>Edit profile</button>
      <Link to={`/users/${userId}/tasks`}>Tasks</Link>
      {isEdit && <UserUpdateForm />}
    </article>
  );
};

export default UserProfile;
