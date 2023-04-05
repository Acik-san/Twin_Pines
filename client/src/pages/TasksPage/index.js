import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/Header';
import TasksList from '../../components/TasksList';
import * as ActionsTask from '../../actions/taskCreators';

const TasksPage = () => {
  const { sumTasks } = useSelector(({ tasks }) => tasks);
  const { getSumTasksRequest } = bindActionCreators(ActionsTask, useDispatch());
  useEffect(() => {
    getSumTasksRequest(); // eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      {sumTasks && <TasksList />}
    </>
  );
};

export default TasksPage;
