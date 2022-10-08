import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionsTask from "../../actions/taskCreators";

const TasksList = () => {
  const { tasks, isFetching, error } = useSelector(({ tasks }) => tasks);
  const { getAllTasksRequest, cleanTasks } = bindActionCreators(
    ActionsTask,
    useDispatch()
  );
  const loadTasks = ({ limit = 5, offset = tasks.length }) =>
    getAllTasksRequest({ limit, offset });
  useEffect(() => {
    getAllTasksRequest({ limit: 5, offset: 0 });
    return () => {
      cleanTasks();
    }; // eslint-disable-next-line
  }, []);
  return (
    <div>
      {tasks.map((task) => (
        <article
          key={task.id}
          style={{
            border: "2px",
            borderStyle: "solid",
            borderColor: "red",
            marginBottom: "1px",
            width: "400px",
          }}
        >
          <div>{task.content}</div>
          <div>{task.isDone.toString()}</div>
          <div>{task.deadLine}</div>
        </article>
      ))}
      <button onClick={loadTasks}>Load more</button>
    </div>
  );
};

export default TasksList;
