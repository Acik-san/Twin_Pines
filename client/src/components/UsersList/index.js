import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import * as ActionsUser from "../../actions/userCreators";
import Spinner from "../Spinner";
import Error from "../Error";

const UsersList = () => {
  const { users, isFetching, error } = useSelector(({ users }) => users);
  const { getUsersRequest, deleteUserRequest, cleanUsers } = bindActionCreators(
    ActionsUser,
    useDispatch()
  );
  const loadUsers = ({ limit = 5, offset = users.length }) =>
    getUsersRequest({ limit, offset });
  useEffect(() => {
    getUsersRequest({ limit: 5, offset: 0 }); // eslint-disable-next-line
    return () => {
      cleanUsers();
    };
  }, []);
  return (
    <section>
      {isFetching && <Spinner />}
      {error && <Error />}
      {users.map((u) => (
        <article key={u.id}>
          <Link style={{ display: "inline-block" }} to={`/users/${u.id}`}>
            <h3>{u.login}</h3>
          </Link>
          <button
            style={{ display: "inline-block", marginLeft: "10px" }}
            onClick={() => {
              deleteUserRequest(u.id);
            }}
          >
            X
          </button>
          {u.avatar && (
            <img
              alt="avatar"
              src={`http://localhost:5000/images/${u.avatar}`}
            />
          )}
        </article>
      ))}
      <button onClick={loadUsers}>Load more</button>
    </section>
  );
};

export default UsersList;
