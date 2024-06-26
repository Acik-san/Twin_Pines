import * as Yup from 'yup';

const SCHEMA_USERNAME: Yup.StringSchema<string | undefined> = Yup.string()
  .test('type-validation', 'Must be string', (value, context) => {
    if (typeof value !== 'string') {
      return context.createError({
        message: 'Must be string',
        path: 'userName',
        type: 'invalid-type',
      });
    }
    return true;
  })
  .test('length-validation', 'Invalid length', (value, context) => {
    if (value && (value.length < 2 || value.length > 16)) {
      return context.createError({
        message: 'Must contain 2-16 symbols',
        path: 'userName',
        type: 'invalid-length',
      });
    }
    return true;
  })
  .test('username-validation', 'Invalid username', (value, context) => {
    if (!/^[a-zA-Z0-9_\-]{2,16}$/.test(value || '')) {
      return context.createError({
        message: 'Allowed letters(a-z), digits(0-9) and "_-"',
        path: 'userName',
        type: 'invalid-format',
      });
    }
    return true;
  })
  .required('Username is required');
const SCHEMA_NAME: Yup.StringSchema<string | undefined> = Yup.string()
  .test('type-validation', 'Must be string', (value, context) => {
    if (typeof value !== 'string') {
      return context.createError({
        message: 'Must be string',
        path: 'name',
        type: 'invalid-type',
      });
    }
    return true;
  })
  .test('length-validation', 'Invalid length', (value, context) => {
    if (value && (value.length < 1 || value.length > 32)) {
      return context.createError({
        message: 'Must contain 1-32 symbols',
        path: 'name',
        type: 'invalid-length',
      });
    }
    return true;
  })
  .test('name-validation', 'Invalid name', (value, context) => {
    if (!/^[a-zA-Z]{1,32}$/.test(value || '')) {
      return context.createError({
        message: 'Allowed letters(a-z)',
        path: 'name',
        type: 'invalid-format',
      });
    }
    return true;
  });
const SCHEMA_EMAIL: Yup.StringSchema<string | undefined> = Yup.string()
  .matches(
    /^[a-zA-Z0-9.@]+$/,
    'Allowed letters(a-z), digits(0-9) and symbol "."'
  )
  .test('email-validation', 'Only @gmail.com addresses are allowed', value => {
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
const SCHEMA_PASSWORD: Yup.StringSchema<string | undefined> = Yup.string()
  .test('type-validation', 'Must be string', (value, context) => {
    if (typeof value !== 'string') {
      return context.createError({
        message: 'Must be string',
        path: 'password',
        type: 'invalid-type',
      });
    }
    return true;
  })
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
    userName: SCHEMA_USERNAME,
    password: SCHEMA_PASSWORD,
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Confirmation pass must match password'),
  }),
  ChatSchem: Yup.object({
    messageBody: Yup.string()
      .test('type-validation', 'Must be string', (value, context) => {
        if (typeof value !== 'string') {
          return context.createError({
            message: 'Must be string',
            path: 'messageBody',
            type: 'invalid-type',
          });
        }
        return true;
      })
      .matches(/^[\s\S]{1,4096}$/, 'Invalid amount of symbols')
      .test('has-content', 'Invalid amount of symbols', value => {
        if (!value) return false;
        const strippedValue = value.replace(/\n/g, '');
        return strippedValue.length > 0;
      })
      .required('Must be required'),
  }),
  ForwardMessageSchem: Yup.object({
    messageBody: Yup.string()
      .test('type-validation', 'Must be string', (value, context) => {
        if (typeof value !== 'string') {
          return context.createError({
            message: 'Must be string',
            path: 'messageBody',
            type: 'invalid-type',
          });
        }
        return true;
      })
      .matches(/^[\s\S]{0,4096}$/, 'Invalid amount of symbols')
      .test('has-content', 'Invalid amount of symbols', value => {
        if (!value) return true;
        const strippedValue = value?.replace(/\n/g, '');
        return strippedValue?.length > 0;
      }),
  }),
  UsernameUpdateSchem: Yup.object({
    userName: SCHEMA_USERNAME,
  }),
  NameUpdateSchem: Yup.object({
    name: SCHEMA_NAME,
  }),
  EmailUpdateSchem: Yup.object({
    email: SCHEMA_EMAIL,
  }),
  PasswordUpdateSchem: Yup.object({
    password: SCHEMA_PASSWORD,
  }),
};

export default Schems;
