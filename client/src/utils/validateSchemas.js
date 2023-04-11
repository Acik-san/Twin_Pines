import * as Yup from 'yup';

export const SCHEMA_LOGIN = Yup.string('Must be string')
  .matches(/^\w{4,16}$/, 'Invalid login')
  .required('Must be required');
export const SCHEMA_PASSWORD = Yup.string('Must be string')
  // .matches(
  //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/,
  //   "Invalid password"
  // )
  .matches(
    /^(?=.*?[a-z]).{6,32}$/,
    'Invalid password'
  )
  .required('Must be required');
export const SCHEMA_CONTENT = Yup.string('Must be string')
  .matches(/^.{1,255}$/, 'Invalid amount of symbols')
  .required('Must be required');
export const SCHEMA_DEADLINE = Yup.string('Must be string').matches(
  /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/,
  'Invalid date'
);

export const SCHEMA_USER = Yup.object({
  login: SCHEMA_LOGIN,
  password: SCHEMA_PASSWORD,
});
export const SCHEMA_TASK = Yup.object({
  content: SCHEMA_CONTENT,
  deadLine: SCHEMA_DEADLINE,
});
