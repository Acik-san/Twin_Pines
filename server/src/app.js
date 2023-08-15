const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');
const handlerError = require('./middlewares/handlerErrors.mw');

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('public'));

app.use(router);

app.use(handlerError);

module.exports = app;
