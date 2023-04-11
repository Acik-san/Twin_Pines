const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 5000;
const CONSTANTS = {
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
