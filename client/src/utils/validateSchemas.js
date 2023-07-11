import * as Yup from 'yup';

const Schems = {
  SignInSchem: Yup.object().shape({
    email: Yup.string().email('check email').required('Email is required'),
    password: Yup.string()
      .test(
        'test-password',
        'min 6 symbols',
        value => value && value.trim().length >= 6
      )
      .required('Password is required'),
  }),
  SignUpSchem: Yup.object().shape({
    email: Yup.string().email('check email').required('Email is required'),
    login: Yup.string().required('Login is required'),
    password: Yup.string()
      .required('Password is required')
      .test(
        'test-password',
        'min 6 symbols',
        value => value && value.trim().length >= 6
      ),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'confirmation pass must match password'),
  }),
  UpdateUserSchem: Yup.object().shape({
    login: Yup.string().required('required'),
    password: Yup.string()
      .test(
        'test-password',
        'min 6 symbols',
        value => value && value.trim().length >= 6
      )
      .required('required'),
  }),
  TaskSchem: Yup.object({
    content: Yup.string('Must be string')
      .matches(/^.{1,255}$/, 'Invalid amount of symbols')
      .required('Must be required'),
    deadLine: Yup.string('Must be string')
      .matches(
        /^(20[2][2-9]|20[3-9]\d|2099)\-(0[1-9]|10|11|12)\-(0[1-9]|1\d|2\d|3[0-1]) (0\d|1\d|2[0-3]):(0\d|[1-5][0-9]):(0\d|[1-5][0-9])$/,
        'Invalid date'
      )
      .required('Must be required'),
  }),
  ChatSchem: Yup.object({
    messageBody: Yup.string('Must be string')
      .matches(/^[\s\S]{1,4096}$/, 'Invalid amount of symbols')
      .test('has-content', 'Invalid amount of symbols', value => {
        if (!value) return false;
        const strippedValue = value.replace(/\n/g, '');
        return strippedValue.length > 0;
      })
      .required('Must be required'),
  }),
};

export default Schems;

// export const SCHEMA_LOGIN = Yup.string('Must be string')
//   .matches(/^\w{4,16}$/, 'Invalid login')
//   .required('Must be required');
// export const SCHEMA_PASSWORD = Yup.string('Must be string')
// .matches(
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/,
//   "Invalid password"
// )
// .matches(/^(?=.*?[a-z]).{6,32}$/, 'Invalid password')
// .required('Must be required');
// export const SCHEMA_CONTENT = Yup.string('Must be string')
//   .matches(/^.{1,255}$/, 'Invalid amount of symbols')
//   .required('Must be required');
// export const SCHEMA_DEADLINE = Yup.string('Must be string').matches(
//   /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/,
//   'Invalid date'
// );Yup.string('Must be string')
// .matches(
//   /^(20[2][2-9]|20[3-9]\d|2099)\-(0[1-9]|10|11|12)\-(0[1-9]|1\d|2\d|3[0-1]) (0\d|1\d|2[0-3]):(0\d|[1-5][0-9]):(0\d|[1-5][0-9])$/,
//   'Invalid date'
// )
// .required('required');

// export const SCHEMA_USER = Yup.object({
//   login: SCHEMA_LOGIN,
//   password: SCHEMA_PASSWORD,
// });
// export const SCHEMA_TASK = Yup.object({
//   content: SCHEMA_CONTENT,
//   deadLine: SCHEMA_DEADLINE,
// });
