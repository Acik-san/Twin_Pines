import React from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionsTask from "../../../actions/taskCreators";

const TaskUpdateForm = (props) => {
  const {
    props: { userId, taskId, selectedTask },
  } = props;
  const { updateTaskRequest } = bindActionCreators(ActionsTask, useDispatch());
  const onSubmit = (values, formikBag) => {
    updateTaskRequest(userId, taskId, values);
    formikBag.resetForm();
  };
  return (
    <Formik
      initialValues={{
        content: selectedTask.content,
        isDone: selectedTask.false,
        deadLine: selectedTask.deadLine,
      }}
      onSubmit={onSubmit}
    >
      <Form>
        <Field name="content" placeholder="content" />
        <Field name="isDone" type="checkbox" />
        <Field name="deadLine" placeholder="deadLine" />
        <input type="submit" value="Send" />
      </Form>
    </Formik>
  );
};

export default TaskUpdateForm;
