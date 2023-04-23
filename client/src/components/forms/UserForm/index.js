import React from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionsUser from "../../../actions/userCreators";
import Input from "../Input";
import styles from "./UserForm.module.scss";

const UserForm = (props) => {
  const { createUserRequest } = bindActionCreators(ActionsUser, useDispatch());
  const onSubmit = (values, formikBag) => {
    createUserRequest(values);
    formikBag.resetForm();
  };
  return (
    <section className={styles.wrapper}>
      <article className={styles.user_card}>
        <Formik
          initialValues={{ login: "", password: "", avatar: "" }}
          onSubmit={onSubmit}
          // validationSchema={SCHEMA_USER}
        >
          {(formikProps) => (
            <Form>
              <div className={styles.input_container}>
                <Input
                  name="login"
                  placeholder="Login"
                  className={styles.input}
                />
                <Input
                  name="password"
                  placeholder="Password"
                  type="password"
                  className={styles.input}
                />
              </div>
              <label htmlFor="avatar" className={styles.upload_avatar}>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  onChange={(e) => {
                    return formikProps.setFieldValue(
                      "avatar",
                      e.target.files[0]
                    );
                  }}
                  className={styles.input_none}
                />
              </label>
              <label htmlFor="submit" className={styles.save_settings}>
                <input
                  id="submit"
                  type="submit"
                  value="Send"
                  className={styles.input_none}
                />
              </label>
            </Form>
          )}
        </Formik>
      </article>
    </section>
  );
};

export default UserForm;
