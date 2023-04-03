const createError = require("http-errors");
const _ = require("lodash");
const { User } = require("../models");

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    if (req.file) {
      body.avatar = req.file.filename;
    }
    const values = _.pick(body, ["login", "password", "avatar"]);
    const createdUser = await User.create(values);
    if (!createdUser) {
      next(createError(400, "Invalid data"));
    }
    const userPrepare = _.omit(await createdUser.get(), ["password"]);
    res.status(201).send({ data: userPrepare });
  } catch (error) {
    next(error);
  }
};
module.exports.getUsers = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
      ...pagination,
    });
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};
module.exports.getUser = async (req, res, next) => {
  try {
    const { instanceUser } = req;
    const user = await instanceUser.get();
    user.password = undefined;
    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};
module.exports.updateUser = async (req, res, next) => {
  try {
    const { instanceUser, body } = req;
    if (req.file) {
      body.avatar = req.file.filename;
    }
    const values = _.pick(body, ["login", "password", "avatar"]);
    const updatedUser = await instanceUser.update(values);
    const userPrepare = _.omit(await updatedUser.get(), ["password"]);
    res.status(200).send({ data: userPrepare });
  } catch (error) {
    next(error);
  }
};
module.exports.deleteUser = async (req, res, next) => {
  try {
    const { instanceUser } = req;
    await instanceUser.destroy();
    res.status(200).send({ data: instanceUser });
  } catch (error) {
    next(error);
  }
};
module.exports.getSumUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    const sumUsers = users.length;
    res.status(200).send({ data: sumUsers });
  } catch (error) {
    next(error);
  }
};
