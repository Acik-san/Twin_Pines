import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionsTask from "../../actions/taskCreators";
import TasksList from "../../components/TasksList";

const TasksPage = () => {
  const { sumTasks } = useSelector(({ tasks }) => tasks);
  const { getSumTasksRequest } = bindActionCreators(ActionsTask, useDispatch());
  useEffect(() => {
    getSumTasksRequest(); // eslint-disable-next-line
  }, []);
  return <>{sumTasks && <TasksList />}</>;
};

export default TasksPage;
