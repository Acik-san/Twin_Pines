const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 5000;
const CONSTANTS = {
  SIGN_IN_FORM_FIELDS: [
    { id: 1, name: 'email', placeholder: 'Email' },
    { id: 2, type: 'password', name: 'password', placeholder: 'Password' },
  ],
  SIGN_UP_FORM_FIELDS: [
    { id: 1, name: 'email', placeholder: 'Email' },
    { id: 3, name: 'login', placeholder: 'Login' },
    { id: 2, type: 'password', name: 'password', placeholder: 'Password' },
    { id: 4, type: 'password', name: 'confirmPassword', placeholder: 'Confirm Password' },
  ],
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
  STATIC_IMAGES_PATH: '/static/images/',
  ANONYM_IMAGE_PATH: '/static/images/anon.png',
  BASE_URL: `http://${serverIP}:${serverPort}/`,
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  publicURL:
    env === 'production'
      ? `http://${serverIP}:80/images/`
      : `http://${serverIP}:${serverPort}/images/`,
};

export default CONSTANTS;
