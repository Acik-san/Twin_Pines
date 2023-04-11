import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import TaskForm from "../forms/TaskForm";
import styles from "./UserTasks.module.scss";
import Error from "../Error";
import { dateToString } from "../../utils/usefulFunctions";
import * as ActionsTask from "../../actions/taskCreators";
import * as Creators from "../../actions/creators";

const UserTasks = () => {
  const { tasks, error } = useSelector(({ tasks }) => tasks);
  const { getTasksRequest, cleanTasks, deleteTaskRequest } = bindActionCreators(
    ActionsTask,
    useDispatch()
  );
  const { cleanError } = bindActionCreators(Creators, useDispatch());
  useEffect(() => {
    getTasksRequest();
    return () => {
      cleanTasks();
      // cleanError();
    }; // eslint-disable-next-line
  }, []);
  return (
    <section className={styles.section}>
      {/* {error && <Error error={error} />} */}
      <div className={styles.user_card}>
        <h2>Create task:</h2>
        <TaskForm  />
        <h3>Tasks list: </h3>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={styles.task}>
              <label htmlFor={task.id} className={styles.delete_task}></label>
              <button
                id={task.id}
                onClick={() => {
                  deleteTaskRequest(null,task.id);
                }}
                className={styles.button_none}
              ></button>
              <Link to={`/profile/tasks/${task.id}`}>
                <div className={styles.content}>{task.content}</div>
                <div>State: {task.isDone ? "Done" : "Not Done"}</div>
                <div>Deadline: {dateToString(task)}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default UserTasks;
