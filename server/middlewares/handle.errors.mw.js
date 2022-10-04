module.exports = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res
    .status(statusCode)
    .send({ errors: [{ message: err.message || "Server Error!" }] });
};
