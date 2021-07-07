function errorHandling(err,req,res,next){
  let status = err.status || 500
  let message = err.message || 'internal server error'

  if(err.name === 'ValidationError'){
    let errors = []
    for (let key in err.errors){
      errors.push(err.errors[key].message)
    }
    res.status(400).json({message: 'validation error',errors})
  } else {
    res.status(status).json({message})
  }
}


module.exports = errorHandling