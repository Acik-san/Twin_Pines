import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Schems from '../../../utils/validateSchemas';
import * as ActionsTask from '../../../actions/taskCreators';
import Input from '../Input';
import styles from './TaskForm.module.scss';

const TaskForm = props => {
  const { userId } = props;
  const { createTaskRequest } = bindActionCreators(ActionsTask, useDispatch());
  const onSubmit = (values, formikBag) => {
    createTaskRequest(userId, values);
    formikBag.resetForm();
  };
  return (
    <Formik
      initialValues={{ content: '', deadLine: '2023-01-01 02:00:00' }}
      onSubmit={onSubmit}
      validationSchema={Schems.TaskSchem}
    >
      <Form>
        <div className={styles.input_container}>
          <Input
            name='content'
            placeholder='Content'
            className={styles.input}
          />
          <Input
            name='deadLine'
            placeholder='Deadline'
            className={styles.input}
          />
        </div>
        <label htmlFor='submit' className={styles.create_task}></label>
        <input
          id='submit'
          type='submit'
          value='Send'
          className={styles.input_none}
        />
      </Form>
    </Formik>
  );
};

export default TaskForm;
