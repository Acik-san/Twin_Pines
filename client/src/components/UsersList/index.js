import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionsUser from "../../actions/userCreators";

const UsersList = () => {
  const { users, isFetching, error } = useSelector(({ users }) => users);
  const { getUsersRequest } = bindActionCreators(ActionsUser, useDispatch());
  const loadUsers = ({ limit = 5, offset = users.length }) =>
    getUsersRequest({ limit, offset });
  useEffect(() => {
    getUsersRequest({ limit: 5, offset: 0 }); // eslint-disable-next-line
  }, []);
  return (
    <section>
      {users.map((u) => (
        <article key={u.id}>
          <h3>{u.login}</h3>
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
