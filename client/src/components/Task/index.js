import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { dateToString } from "../../common/usefulFunc";
import * as ActionsTask from "../../actions/taskCreators";
import * as Creators from "../../actions/creators";
import Error from "../Error";
import TaskUpdateForm from "../forms/TaskUpdateForm";
import styles from "./Task.module.scss";

const Task = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { userId, taskId } = useParams();
  const { selectedTask, error } = useSelector(({ tasks }) => tasks);
  const { getTaskRequest } = bindActionCreators(ActionsTask, useDispatch());
  const { cleanError } = bindActionCreators(Creators, useDispatch());
  const editTask = () => {
    setIsEdit(!isEdit);
  };
  useEffect(() => {
    getTaskRequest(userId, taskId);
    return () => {
      if (error) {
        cleanError();
      }
    }; // eslint-disable-next-line
  }, []);
  return (
    <section className={styles.section}>
      {error && <Error error={error} />}
      <div className={styles.task_wrapper}>
        <div className={styles.task_inner}>
          <article className={styles.task}>
            <div>{selectedTask.content}</div>
            <div>State: {selectedTask.isDone ? "Done" : "Not Done"}</div>
            <div>
              Deadline:{" "}
              {selectedTask.deadLine === undefined
                ? selectedTask.deadLine
                : dateToString(selectedTask)}
            </div>
          </article>
          <label htmlFor="edit_task" className={styles.edit_task}>
            <button
              id="edit_task"
              onClick={editTask}
              className={styles.button_none}
            ></button>
          </label>
        </div>
        {isEdit && (
          <TaskUpdateForm props={{ userId, taskId, isEdit, setIsEdit }} />
        )}
      </div>
    </section>
  );
};

export default Task;
