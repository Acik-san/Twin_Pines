import * as Yup from 'yup';

const SCHEMA_LOGIN = Yup.string('Must be string')
  .test('length-validation', 'Invalid length', (value, context) => {
    if (value && (value.length < 2 || value.length > 16)) {
      return context.createError({
        message: 'Must contain 2-16 symbols',
        path: 'login',
        type: 'invalid-length',
      });
    }
    return true;
  })
  .test('login-validation', 'Invalid login', (value, context) => {
    if (!/^[a-zA-Z0-9_]{2,16}$/.test(value)) {
      return context.createError({
        message: 'Allowed letters(a-z), digits(0-9) and symbol "_"',
        path: 'login',
        type: 'invalid-format',
      });
    }
    return true;
  })
  .required('Login is required');
const SCHEMA_EMAIL = Yup.string()
  .matches(
    /^[a-zA-Z0-9.@]+$/,
    'Allowed letters(a-z), digits(0-9) and symbol "."'
  )
  .test('email-validation', 'Only gmail.com addresses are allowed', value => {
    if (value) {
      return value.endsWith('@gmail.com');
    }
    return true;
  })
  .test('length-validation', 'Invalid length', (value, context) => {
    if (value && (value.length < 16 || value.length > 40)) {
      return context.createError({
        message: 'Must contain 6-30 symbols',
        path: 'email',
        type: 'invalid-length',
      });
    }
    return true;
  })
  .email('Invalid email format')
  .required('Email is required');
const SCHEMA_PASSWORD = Yup.string('Must be string')
  .matches(
    /^[A-Za-z0-9#?!@$%^&*_\-]+$/,
    'Allowed letters(a-z), digits(0-9) and "#?!@$%^&*_-"'
  )
  .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Must contain at least one lowercase letter')
  .matches(/\d/, 'Must contain at least one digit')
  .matches(/[#?!@$%^&*_\-]/, 'Must contain at least one of "#?!@$%^&*_-"')
  .test('length-validation', 'Invalid length', (value, context) => {
    if (value && (value.length < 8 || value.length > 16)) {
      return context.createError({
        message: 'Must contain 8-16 symbols',
        path: 'password',
        type: 'invalid-length',
      });
    }
    return true;
  })
  .required('Password is required');

const Schems = {
  SignInSchem: Yup.object().shape({
    email: SCHEMA_EMAIL,
    password: SCHEMA_PASSWORD,
  }),
  SignUpSchem: Yup.object().shape({
    email: SCHEMA_EMAIL,
    login: SCHEMA_LOGIN,
    password: SCHEMA_PASSWORD,
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Confirmation pass must match password'),
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
  LoginUpdateSchem: Yup.object({
    login: SCHEMA_LOGIN,
  }),
  EmailUpdateSchem: Yup.object({
    email: SCHEMA_EMAIL,
  }),
  PasswordUpdateSchem: Yup.object({
    password: SCHEMA_PASSWORD,
  }),
};

export default Schems;
