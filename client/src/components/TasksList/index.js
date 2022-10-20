import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Spinner from "../Spinner";
import Error from "../Error";
import { dateToString } from "../../common/usefulFunc";
import * as ActionsTask from "../../actions/taskCreators";
import * as Creators from "../../actions/creators";
import styles from "./TasksList.module.scss";

const TasksList = () => {
  const { tasks, isFetching, error, sumTasks } = useSelector(
    ({ tasks }) => tasks
  );
  const [offset, setOffset] = useState(15);
  const { getAllTasksRequest, cleanTasks } = bindActionCreators(
    ActionsTask,
    useDispatch()
  );
  const { cleanError } = bindActionCreators(Creators, useDispatch());
  const handlerScroll = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        200 &&
      offset <= sumTasks
    ) {
      setOffset(offset + 5);
      getAllTasksRequest({ limit: 5, offset });
    }
  };
  useEffect(() => {
    getAllTasksRequest({ limit: 15, offset: 0 });
    return () => {
      cleanTasks();
      cleanError();
    }; // eslint-disable-next-line
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handlerScroll);
    return () => {
      window.removeEventListener("scroll", handlerScroll);
    }; // eslint-disable-next-line
  }, [offset]);
  return (
    <section className={styles.section}>
      {isFetching && <Spinner />}
      {error && <Error error={error} />}
      <article className={styles.user_card}>
        {tasks.map((task) => (
          <article key={task.id} className={styles.task}>
            <div className={styles.content}>{task.content}</div>
            <div>State: {task.isDone ? "Done" : "Not Done"}</div>
            <div>Deadline: {dateToString(task)}</div>
          </article>
        ))}
      </article>
    </section>
  );
};

export default TasksList;
