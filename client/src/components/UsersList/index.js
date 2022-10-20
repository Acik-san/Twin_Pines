import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import * as ActionsUser from "../../actions/userCreators";
import * as Creators from "../../actions/creators";
import { getInitials, stringToColour } from "../../common/usefulFunc";
import Spinner from "../Spinner";
import Error from "../Error";
import styles from "./UsersList.module.scss";

const UsersList = () => {
  const { users, isFetching, error, sumUsers } = useSelector(
    ({ users }) => users
  );
  const [offset, setOffset] = useState(15);
  const { getUsersRequest, cleanUsers } = bindActionCreators(
    ActionsUser,
    useDispatch()
  );
  const { cleanError } = bindActionCreators(Creators, useDispatch());

  useEffect(() => {
    getUsersRequest({ limit: 15, offset: 0 });
    return () => {
      cleanUsers();
      cleanError();
    }; // eslint-disable-next-line
  }, []);
  const handlerScroll = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        200 &&
      offset <= sumUsers
    ) {
      setOffset(offset + 6);
      getUsersRequest({ limit: 6, offset });
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handlerScroll);
    return () => {
      window.removeEventListener("scroll", handlerScroll);
    }; // eslint-disable-next-line
  }, [offset]);

  return (
    <section className={styles.section}>
      {error && <Error error={error} />}
      <article className={styles.cards_wrapper}>
        {users.map((u) => (
          <Link to={`/users/${u.id}`} key={u.id}>
            <article className={styles.user_card}>
              <div className={styles.photo_wrapper}>
                <div
                  className={styles.photo_inner}
                  style={{ backgroundColor: stringToColour(u.login) }}
                >
                  {getInitials(u.login)}
                </div>
                {u.avatar && (
                  <img
                    alt="avatar"
                    src={`http://localhost:5000/images/${u.avatar}`}
                    className={styles.photo_inner_img}
                  />
                )}
              </div>
              <h3 className={styles.login}>{u.login}</h3>
            </article>
          </Link>
        ))}
      </article>
      {isFetching && <Spinner />}
    </section>
  );
};

export default UsersList;
