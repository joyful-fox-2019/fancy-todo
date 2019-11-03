module.exports = (err, req, res, next) => {
  let messages = []
  console.log(err)
  if(err.name === 'ValidationError') {
    err.status = 400
    for(field in err.errors) {
      messages.push(err.errors[field].message)
    }
  } else if(err.code === 11000) {
    err.status = 400
    let field = Object.keys(err.keyPattern)[0]
    messages.push(`${field.charAt(0).toUpperCase()}${field.substring(1)} is already registered`)
  } else if(err.message === 'invalid signature') {
    err.status = 401
    messages.push(`You're session is expired. Please login.`)
  } else if(err.name === 'CastError') {
    err.status = 404
    messages.push(`Data not found`)
  } else if(err.msg) {
    messages.push(err.msg)
  }
  res.status(err.status || 500).json({messages: messages.length > 0 ? messages : 'Something went wrong in the server'})
}