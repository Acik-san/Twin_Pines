import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Formik, Field } from "formik";
import * as ActionsUser from "../../../actions/userCreators";

const UserUpdateForm = (props) => {
  const {
    selectedUser: { id, avatar },
  } = useSelector(({ users }) => users);
  console.log(avatar);
  const { updateUserRequest } = bindActionCreators(ActionsUser, useDispatch());
  const onSubmit = (values, formikBag) => {
    updateUserRequest(id, values);
    formikBag.resetForm();
  };
  return (
    <Formik
      initialValues={{ login: "", password: "", avatar: avatar }}
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

export default UserUpdateForm;
