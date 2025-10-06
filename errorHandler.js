// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Server Error' });
};