module.exports = (err, req, res, next) => {
  let code;
  let message;
  switch (err.name) {
    case 'ValidationError':
      code = 400;
      let arr = [];
      for (let i in err.errors) {
        arr.push(err.errors[i].message);
      }
      message = arr;
      break;
    case 'JsonWebTokenError':
      code = 401;
      message = err.message;
      break;
    default:
      code = err.code || 500;
      message = err.message || 'Internal Server Error';
      break;
  }
  res.status(code).json({
    code,
    message
  });
}