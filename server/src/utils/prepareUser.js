const _ = require('lodash');

module.exports = user => _.omit(user.get(), ['password']);
