import React from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionsUser from "../../actions/userCreators";

const UserForm = (props) => {
  const { createUserRequest } = bindActionCreators(ActionsUser, useDispatch());
  const onSubmit = (values, formikBag) => {
    createUserRequest(values);
    formikBag.resetForm();
  };
  return (
    <Formik
      initialValues={{ login: "", password: "", avatar: "" }}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <Form>
          <Field name="login" placeholder="login" />
          <Field name="password" placeholder="password" type="password" />
          <input
            name="avatar"
            type="file"
            onChange={(e) => {
              return formikProps.setFieldValue("avatar", e.target.files[0]);
            }}
          />
          <input type="submit" value="Send" />
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
