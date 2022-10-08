import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as ActionsTask from "../../actions/taskCreators";
import TaskUpdateForm from "../forms/TaskUpdateForm";

const Task = () => {
  const { userId, taskId } = useParams();
  const { selectedTask } = useSelector(({ tasks }) => tasks);
  const { getTaskRequest } = bindActionCreators(
    ActionsTask,
    useDispatch()
  );
  useEffect(() => {
    getTaskRequest(userId, taskId); // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div>{selectedTask.content}</div>
      <div>{`${selectedTask.isDone}`}</div>
      <div>{selectedTask.deadLine}</div>
      <button onClick={() => {}}>Edit Task</button>
      <TaskUpdateForm props={{ userId, taskId, selectedTask }} />
    </div>
  );
};

export default Task;
