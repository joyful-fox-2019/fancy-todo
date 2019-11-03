module.exports = (err, req, res, next) => {
  let number = null
  let message = null
  switch (err.name) {
    case 'emailnotunique':
      number = 400;
      message = err.message;
      break;
    case 'incorrect':
      number = 400;
      message = err.message;
      break;
    case 'jsonwebtoken':
      number = 401;
      message = 'You are not authorized to do this action';
      break;
    case 'unauthorized':
      number = 401;
      message = err.message;
      break;
    case 'tasknotfound':
      number = 404;
      message = err.message;
      break;
    default:
      number = 500
      message = err.message
      break;
  }
  res.status(number).json({message})
}