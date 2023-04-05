import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { SCHEMA_TASK } from "../../../utils/validateSchemas";
import { dateToString } from "../../../utils/usefulFunctions";
import * as ActionsTask from "../../../actions/taskCreators";
import Input from "../Input";
import styles from "./TaskUpdateForm.module.scss";

const TaskUpdateForm = (props) => {
  const { selectedTask } = useSelector(({ tasks }) => tasks);
  const {
    props: { userId, taskId, isEdit, setIsEdit },
  } = props;
  const { updateTaskRequest, getTaskRequest } = bindActionCreators(
    ActionsTask,
    useDispatch()
  );
  const onSubmit = (values, formikBag) => {
    updateTaskRequest(userId, taskId, values);
    setIsEdit(!isEdit);
    formikBag.resetForm();
  };
  useEffect(() => {
    getTaskRequest(userId, taskId); // eslint-disable-next-line
  }, []);
  return (
    <Formik
      initialValues={{
        content: selectedTask.content,
        isDone: selectedTask.isDone,
        deadLine: dateToString(selectedTask),
      }}
      onSubmit={onSubmit}
      validationSchema={SCHEMA_TASK}
    >
      <Form className={styles.form}>
        <div className={styles.input_container}>
          <Input
            name="content"
            placeholder="Content"
            className={styles.input}
          />
          <Input
            name="deadLine"
            placeholder="Deadline"
            className={styles.input}
          />
        </div>
        <Field
          id="isDone"
          name="isDone"
          type="checkbox"
          className={styles.checkbox}
        />
        <label htmlFor="submit" className={styles.update_task}>
          <input
            id="submit"
            type="submit"
            value="Send"
            className={styles.input_none}
          />
        </label>
      </Form>
    </Formik>
  );
};

export default TaskUpdateForm;
