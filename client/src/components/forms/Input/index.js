import React from "react";
import { ErrorMessage, useField } from "formik";
import cx from "classnames";
import styles from "./InputInLabel.module.scss";

const Input = (props) => {
  const { name, className, ...restProps } = props;
  const [field, meta, helpers] = useField(name);
  const inputClasses = cx(className, {
    [styles.invalid]: meta.error && meta.touched,
  });
  return (
    <label className={styles.label}>
      <input {...field} className={inputClasses} {...restProps} />
      <ErrorMessage name={name} component="span" className={styles.error} />
    </label>
  );
};

export default Input;
