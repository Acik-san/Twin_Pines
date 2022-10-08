import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as ActionsTask from "../../actions/taskCreators";
import TaskForm from "../forms/TaskForm";

const UserTasks = () => {
  const { userId } = useParams();
  const { tasks } = useSelector(({ tasks }) => tasks);
  const { getTasksRequest, cleanTasks, deleteTaskRequest } = bindActionCreators(
    ActionsTask,
    useDispatch()
  );

  useEffect(() => {
    getTasksRequest(userId);
    return () => {
      cleanTasks();
    }; // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div>Create task:</div>
      <TaskForm userId={userId} />
      <div>Tasks list:</div>
      <ul>
        {tasks.map((task) => (
          <li
            style={{
              border: "2px",
              borderStyle: "solid",
              borderColor: "red",
              marginBottom: "1px",
              width: "400px",
            }}
            key={task.id}
          >
            <Link to={`/users/${userId}/tasks/${task.id}`}>
              <div>{task.content}</div>
              <div>{task.isDone.toString()}</div>
              <div>{task.deadLine}</div>{" "}
            </Link>
            <button
              onClick={() => {
                deleteTaskRequest(userId, task.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTasks;
