import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import UserUpdateForm from "../forms/UserUpdateForm";
import * as ActionsUser from "../../actions/userCreators";
import * as Creators from "../../actions/creators";
import { getInitials, stringToColour } from "../../utils/usefulFunctions";
import styles from "./UserProfile.module.scss";
import Error from "../Error";

const UserProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { userId } = useParams();
  const { user, error } = useSelector(({ auth }) => auth);
  const editProfile = () => {
    setIsEdit(!isEdit);
  };
  const {  deleteUserRequest } = bindActionCreators(
    ActionsUser,
    useDispatch()
  );
  const { cleanError } = bindActionCreators(Creators, useDispatch());
  const navigate = useNavigate();
  const deleteAndNavigate = (id, path) => {
    deleteUserRequest(id);
    navigate(path);
  };
  useEffect(() => {
    // getUserRequest(userId);
    return () => {
      cleanError();
    }; // eslint-disable-next-line
  }, []);
  return (
    <section className={styles.section}>
      {/* {error && <Error error={error} />} */}
      <article
        className={styles.user_card}
        style={{ height: isEdit && "410px" }}
      >
        <div className={styles.photo_wrapper}>
          <div
            className={styles.photo_inner}
            style={{ backgroundColor: stringToColour(`${user.login}`) }}
          >
            {getInitials([user.login])}
          </div>
          {user.avatar !== 'anon.png' && (
            <img
              alt="avatar"
              src={`http://localhost:5000/images/${user.avatar}`}
              className={styles.photo_inner_img}
            />
          )}
        </div>
        <h3 className={styles.login}>{user.login}</h3>
        <div className={styles.buttons}>
          <label htmlFor="edit_profile" className={styles.edit_profile}>
            <button
              id="edit_profile"
              className={styles.button_none}
              onClick={editProfile}
            ></button>
          </label>
          <label htmlFor="delete_user" className={styles.delete_user}>
            <button
              id="delete_user"
              className={styles.button_none}
              onClick={() => deleteAndNavigate(user.id, "/")}
            ></button>
          </label>
          <label htmlFor="create_task" className={styles.create_task}>
            <button
              id="create_task"
              className={styles.button_none}
              onClick={() => navigate(`/users/${userId}/tasks`)}
            ></button>
          </label>
        </div>
        {isEdit && <UserUpdateForm />}
      </article>
    </section>
  );
};

export default UserProfile;
