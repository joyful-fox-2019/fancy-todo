module.exports = (err, req, res, next) => {
  let status = err.status || 500
  let message = err.message || 'Internal server error'

  console.log(err)
  if(err.name === 'ValidationError') {
    const errors = []
    for(let key in err.errors){
      console.log(err.errors[key].message);
      errors.push(err.errors[key].message)
    }
    status = 400
    message  = {message: 'Validation Error', errors}
  } else if(err.message === 'jwt malformed') {
    message = 'You have to login first'
  }

  res.status(status).json({ message })
}