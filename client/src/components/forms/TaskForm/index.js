import React from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionsTask from "../../../actions/taskCreators";

const TaskForm = (props) => {
  const { userId } = props
  const { createTaskRequest } = bindActionCreators(ActionsTask, useDispatch());
  const onSubmit = (values, formikBag) => {
    createTaskRequest(userId, values);
    formikBag.resetForm();
  };
  return (
    <Formik
      initialValues={{ content: "", isDone: false, deadLine: "" }}
      onSubmit={onSubmit}
    >
      <Form>
        <Field name="content" placeholder="content" />
        <Field name="isDone" type="checkbox" />
        <Field name="deadLine" />
        <input type="submit" value="Send" />
      </Form>
    </Formik>
  );
};

export default TaskForm;
